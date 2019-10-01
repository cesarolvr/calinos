import React from "react";

import { getCurrentUser } from "../../../api/auth/login";
import getGeolocation from "../../../utils/geolocation";

// Firebase
import firebase from "firebase/app";

const Step3 = ({ prevStep, nextStep, formValue, setFormValue }) => {
  const { photos = [] } = formValue;
  const readURL = e => {
    // e.preventDefault();
    const input = e.target;
    const fileExists = input.files && input.files[0];
    if (fileExists) {
      let photos = [];
      var reader = new FileReader();
      reader.onload = () => {
        // const blob = new Blob([e.target.result], { type: "image/jpeg" });
        var blob = new Blob([reader.result], { type: "image/jpeg" });
        console.log(blob);
        
        photos.push(blob);
        setFormValue({
          ...formValue,
          photos
        });
      };
    }
    reader.readAsDataURL(input.files[0]);
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
      {photos.map((photo, index) => (
        <img src={photo} alt="" key={index} className="preview" />
      ))}

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
          if (photos.length === 0) return;
          console.log(photos[0]);

          storageRef
            .child(`images/${userId}/${fileName}.jpg`)
            .put(photos[0])
            .then(({ state, metadata }) => {
              if (state !== "success") return;
              let newPhoto = [];
              newPhoto.push(metadata.fullPath);
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
                    photos: newPhoto
                  })
                  .then(nextStep);
              });
            });
        }}
      >
        Próximo
      </button>
    </div>
  );
};

export default Step3;
