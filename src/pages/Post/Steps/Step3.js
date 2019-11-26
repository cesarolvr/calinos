import React from "react";

import getGeolocation from "../../../utils/geolocation";

// State
import { useStateValue } from "../../../state";

// Firebase
import firebase from "firebase/app";

const Step3 = ({ prevStep, nextStep, formValue, setFormValue }) => {
  const [{ isLoading }, dispatch] = useStateValue();
  const { photos = [] } = formValue;
  const userId = firebase.auth().currentUser.uid;

  // Todo: refatorar isso passando para o state
  let newPhoto = [];

  const readFile = e => {
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

  const createPost = () => {
    dispatch({
      type: "setIsLoading",
      isLoading: true
    });
    const db = firebase.firestore();
    const postId = `${Math.floor(Math.random() * 1000000000)}`;
    getGeolocation().then(location => {
      db.collection("posts")
        .add({
          ...formValue,
          local: {
            ...formValue.local,
            pin: {
              lat: location.lat,
              lng: location.lng
            }
          },
          authorId: userId,
          photos: [...newPhoto],
          id: postId
        })
        .then(() => {
          dispatch({
            type: "setPostUploaded",
            postUploaded: postId
          });
          db.collection("chats")
            .doc(postId)
            .set({
              messages: []
            });
          nextStep();
          dispatch({
            type: "setIsLoading",
            isLoading: false
          });
        })
        .catch(() => {
          dispatch({
            type: "setIsLoading",
            isLoading: false
          });
        });
    });
  };

  const uploadFile = () => {
    dispatch({
      type: "setIsLoading",
      isLoading: true
    });
    const storageRef = firebase.storage().ref();
    if (photos.length === 0) return;
    for (let i = 0; i < photos.length; i++) {
      const fileName = `pic-${Math.floor(Math.random() * 1000000000)}`;
      const file = photos[i].file;
      const uploadTask = storageRef
        .child(`images/${userId}/${fileName}.jpg`)
        .put(file);

      uploadTask.on(
        "state_changed",
        progress => console.log(progress),
        err => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(url => {
              newPhoto.push(url);
              if (i === photos.length - 1) {
                createPost();
              }
            })
            .catch(() => {
              dispatch({
                type: "setIsLoading",
                isLoading: false
              });
            });
        }
      );
    }
  };

  const removePhoto = photo => {
    const currentPhotos = [...photos];
    const newPhotos = currentPhotos.filter((item, index) => {
      if (index !== photo) return item;
      return null;
    });
    setFormValue({
      ...formValue,
      photos: [...newPhotos]
    });
  };

  return (
    <div className="panel post -photo">
      <div className="content">
        <h1 className="title">Adicione fotos do seu bichinho</h1>
        <div className="gallery">
          {photos.map(({ blob }, index) => {
            return (
              <div className="photo-item" key={index}>
                <div
                  className="delete-photo"
                  onClick={() => removePhoto(index)}
                ></div>
                <div className="image-wrapper">
                  <img src={blob} alt="" className="image" />;
                </div>
              </div>
            );
          })}
          <div className="photo-item add">
            <input
              type="file"
              name="animalImage"
              accept="image/*"
              onChange={readFile}
            />
          </div>
        </div>

        <div className="step-control">
          <button
            type="button"
            className="button -secondary prev"
            onClick={prevStep}
          >
            Voltar
          </button>
          <button className="button next" onClick={uploadFile}>
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
