import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

// Consts
import { mapsConfig } from "../../consts";

// Utils
import getGeolocation from "../../utils/geolocation";

const MapContainer = props => {
  const [coords, setCoords] = useState({
    lat: 20,
    lng: 20
  });
  useEffect(() => {
    getGeolocation().then(res => {
      setCoords(res);
    });
  }, [])
  return (
    <div>
      Mapa
      <Map
        google={props.google}
        zoom={5}
        style={{
          width: "100%",
          height: "100%"
        }}
        initialCenter={{ lat: coords.lat, lng: coords.lng }}
      />
      {coords.lat}
      {coords.lng}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: mapsConfig.apiKey
})(MapContainer);
