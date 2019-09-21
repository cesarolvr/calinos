import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// Consts
import { mapsConfig } from "../../consts";

// Utils
import getGeolocation from "../../utils/geolocation";

// Api
import { isUserInDatabase } from "../../api/database";

const MapContainer = props => {
  const [markers, setMarkers] = useState([]);
  const [initialCoords, setInitialCoords] = useState({
    lat: 20,
    lng: 20
  });

  useEffect(() => {
    getGeolocation().then(res => setInitialCoords(res));
    isUserInDatabase().then(res => {
      const receivedMarkers = res.markers;
      setMarkers([...markers, ...receivedMarkers]);
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
        center={initialCoords}
      >
        <Marker title={"Me"} name={"Eu"} position={initialCoords} />
        {markers.map((marker, index) => {
          return (
            <Marker
              title={"Me"}
              key={index}
              name={"Eu"}
              position={{
                lat: marker.lat,
                lng: marker.lng
              }}
            />
          );
        })}
      </Map>
      {JSON.stringify(initialCoords)}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: mapsConfig.apiKey
})(MapContainer);
