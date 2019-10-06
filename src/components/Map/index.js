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

import pin from '../../assets/images/pin.svg'
import pinMe from '../../assets/images/pinMe.svg';

const MapContainer = props => {
  const [markers, setMarkers] = useState([]);
  const [ activeMarker, setActiveMarker ] = useState({})
  const [initialCoords, setInitialCoords] = useState({ lat: 20, lng: 20 });

  useEffect(() => {
    getGeolocation().then(res => setInitialCoords(res));
    getPosts().then(posts => {
      setMarkers([...markers, ...posts]);
    });
  }, []);

  const openMarker = marker => {
    console.log('click', marker)
  }

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
      <Marker title={"Me"} name={"Eu"} icon={pinMe} position={initialCoords} />
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
  );
};

export default GoogleApiWrapper({
  apiKey: mapsConfig.apiKey
})(MapContainer);
