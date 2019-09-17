import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

// Consts
import { mapsConfig } from '../../consts'

const MapContainer = props => {
  return (
    <div>
      Mapa
      <Map
        google={props.google}
        zoom={12}
        style={{
          width: "100%",
          height: "100%"
        }}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: mapsConfig.apiKey
})(MapContainer);
