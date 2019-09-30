import React from "react";

import { getCurrentUser } from "../../../api/auth/login";
import getGeolocation from "../../../utils/geolocation";

// Firebase
import firebase from "firebase/app";

const Step3 = ({ prevStep, nextStep, formValue }) => (
  <div className="panel post">
    <h1>Adicione fotos do seu bichinho</h1>
    <button type="button" className="button -secondary" onClick={prevStep}>
      Voltar
    </button>
    <button
      className="button"
      onClick={() => {
        const user = getCurrentUser();
        const db = firebase.firestore();
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
              authorId: user.uid
            })
            .then(nextStep);
        });
      }}
    >
      Próximo
    </button>
  </div>
);

export default Step3;
