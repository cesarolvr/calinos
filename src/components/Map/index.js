import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// Consts
import { mapsConfig } from "../../consts";

// Utils
import getGeolocation from "../../utils/geolocation";
import styleMap from "./styleMap.json";

import "./Map.scss";

// Api
import { getPosts } from "../../api/database";

const MapContainer = props => {
  const [markers, setMarkers] = useState([]);
  const [initialCoords, setInitialCoords] = useState({ lat: 20, lng: 20 });

  useEffect(() => {
    getGeolocation().then(res => setInitialCoords(res));
    getPosts().then(posts => {
      setMarkers([...markers, ...posts]);
    });
  }, []);

  return (
    <Map
      google={props.google}
      zoom={17}
      style={{
        width: "100%",
        height: "100%"
      }}
      styles={styleMap}
      center={initialCoords}
    >
      <Marker title={"Me"} name={"Eu"} position={initialCoords} />
      {markers.map(({ pin }, index) => {
        return (
          <Marker
            title={"Me"}
            key={index}
            name={"Eu"}
            position={{
              lat: pin.lat,
              lng: pin.lng
            }}
          />
        );
      })}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: mapsConfig.apiKey
})(MapContainer);
