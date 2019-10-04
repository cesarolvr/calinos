import React from "react";

import { getCurrentUser } from "../../../api/auth/login";
import getGeolocation from "../../../utils/geolocation";

// Firebase
import firebase from "firebase/app";

const Step3 = ({ prevStep, nextStep, formValue, setFormValue }) => {
  const { photos = [] } = formValue;
  const readURL = e => {
    e.preventDefault();
    const input = e.target;
    const fileExists = input.files && input.files[0];
    if (fileExists) {
      let newPhotos = [];
      var reader = new FileReader();
      reader.onload = () => {
        const photo = {
          file: input.files[0],
          blob: reader.result
        };
        newPhotos.push(photo);
        setFormValue({
          ...formValue,
          photos: [...photos, ...newPhotos]
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  return (
    <div className="panel post">
      <h1>Adicione fotos do seu bichinho</h1>
      <input
        type="file"
        name="animalImage"
        accept="image/*"
        onChange={readURL}
      />
      {photos.map(({ blob }, index) => {
        return <img src={blob} alt="" key={index} className="preview" />;
      })}

      <button type="button" className="button -secondary" onClick={prevStep}>
        Voltar
      </button>
      <button
        className="button"
        onClick={() => {
          const user = getCurrentUser();
          const db = firebase.firestore();
          const storageRef = firebase.storage().ref();
          const userId = firebase.auth().currentUser.uid;
          const fileName = `pic-${Math.floor(Math.random() * 1000000000)}`;
          let newPhoto = [];
          console.log("Click ===>", photos);
          if (photos.length === 0) return;
          for (let i = 0; i < photos.length; i++) {
            storageRef
              .child(`images/${userId}/${fileName}.jpg`)
              .put(photos[i].file)
              .then(({ state, metadata }) => {
                if (state !== "success") return;
                newPhoto.push(metadata.fullPath);
                if (i === photos.length - 1) {
                  getGeolocation().then(l => {
                    db.collection("posts")
                      .doc()
                      .set({
                        ...formValue,
                        local: {
                          ...formValue.local,
                          pin: {
                            lat: l.lat,
                            lng: l.lng
                          }
                        },
                        authorId: user.uid,
                        photos: [ ...newPhoto ]
                      })
                      .then(nextStep);
                  });
                }
              });
          }
        }}
      >
        Próximo
      </button>
    </div>
  );
};

export default Step3;
