import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// Consts
import { mapsConfig } from "../../consts";

// Utils
import getGeolocation from "../../utils/geolocation";

// // Firebase
// import firebase from "firebase/app";

const MapContainer = props => {
  const [coords, setCoords] = useState({
    lat: 20,
    lng: 20
  });
  useEffect(() => {
    getGeolocation().then(res => {
      setCoords(res);
    });
  }, []);
  return (
    <div>
      Mapa
      <Map
        google={props.google}
        zoom={15}
        style={{
          width: "100%",
          height: "100%"
        }}
        center={coords}
      >
        <Marker title={"Me"} name={"Eu"} position={coords} />
      </Map>
      {JSON.stringify(coords)}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: mapsConfig.apiKey
})(MapContainer);
