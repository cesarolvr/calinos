import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useStateValue } from "../../state";
import firebase from "firebase/app";

// Components
import MapPanel from "./MapPanel";

// Consts
import { mapsConfig } from "../../consts";

// Utils
import getGeolocation from "../../utils/geolocation";
import styleMap from "./styleMap.json";

// Styles
import "./Map.scss";

// Api
import { getPosts } from "../../api/database";

// Assets
import pin from "../../assets/images/pin.svg";
import pinMe from "../../assets/images/pinMe.svg";

const MapContainer = ({ google }) => {
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState({});
  const [initialCoords, setInitialCoords] = useState({ lat: 20, lng: 20 });
  const currentUser = firebase.auth().currentUser;
  const databaseInstance = firebase.firestore();
  const [{ chatId, receiverId }, dispatch] = useStateValue();

  useEffect(() => {
    getGeolocation().then(res => setInitialCoords(res));
    getPosts().then(posts => {
      setMarkers([...markers, ...posts]);
    });
  }, []);

  const openMarker = marker => {
    setActiveMarker(marker);

    dispatch({
      type: "setPinOpened",
      pinOpened: marker
    });

    dispatch({
      type: "setReceiverId",
      receiverId: marker.authorId
    });

    const ownId = currentUser.uid;
    const newChatId = `${currentUser.uid}${marker.authorId}`;

    databaseInstance
      .collection("users")
      .where("id", "==", marker.authorId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        querySnapshot.forEach(snapshot => {
          if (snapshot.data()) {
            databaseInstance
              .collection("users")
              .doc(snapshot.id)
              .set(
                {
                  messages: firebase.firestore.FieldValue.arrayUnion({
                    email: currentUser.email,
                    id: currentUser.uid,
                    chatId,
                    name: currentUser.name || ""
                  })
                },
                { merge: true }
              );
          }
        });
      })
      .catch(console.log);

    databaseInstance
      .collection("users")
      .where("id", "==", currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        querySnapshot.forEach(snapshot => {
          if (snapshot.data()) {
            databaseInstance
              .collection("users")
              .doc(snapshot.id)
              .set(
                {
                  messages: firebase.firestore.FieldValue.arrayUnion({
                    email: "",
                    id: marker.authorId,
                    chatId,
                    name: ""
                  })
                },
                { merge: true }
              );
          }
        });
      })
      .catch(console.log);

    databaseInstance
      .collection("users")
      .where("id", "==", ownId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return false;
        querySnapshot.forEach(snapshot => {
          if (snapshot.data()) {
            const { messages } = snapshot.data();
            const chatsExistents = messages.filter(item => {
              return item.id === marker.authorId;
            });
            if (chatsExistents.length > 1) {
              dispatch({
                type: "setChatId",
                chatId: chatsExistents[0].chatId
              });
            } else {
              databaseInstance
                .collection("chats")
                .doc(newChatId)
                .set({ messages: [] });

              dispatch({
                type: "setChatId",
                chatId: newChatId
              });
            }
          }
        });
      })
      .catch(console.log);
  };

  return (
    <>
      <MapPanel {...activeMarker} />
      <div className="button-back"></div>
      <Map
        google={google}
        zoom={25}
        style={{
          width: "100%",
          height: "100%"
        }}
        styles={styleMap}
        center={initialCoords}
      >
        <Marker
          title={"Me"}
          name={"Eu"}
          icon={pinMe}
          position={initialCoords}
        />
        {markers.map((marker, index) => {
          const { local } = marker;
          if (!local.pin) return null;
          return (
            <Marker
              title={"Me"}
              key={index}
              name={"Eu"}
              onClick={() => openMarker(marker)}
              icon={pin}
              position={{
                lat: local.pin.lat,
                lng: local.pin.lng
              }}
            />
          );
        })}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: mapsConfig.apiKey
})(MapContainer);
