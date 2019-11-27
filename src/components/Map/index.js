import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Icon } from "antd";
import FsLightbox from "fslightbox-react";
import { useStateValue } from "../../state";

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
import pinLost from "../../assets/images/pin-lost.svg";
import pinAbandoned from "../../assets/images/pin-abandoned.svg";
import pinMe from "../../assets/images/pinMe.svg";

const MapContainer = ({ google }) => {
  const [markers, setMarkers] = useState([]);
  const [toggler, setToggler] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [initialCoords, setInitialCoords] = useState({ lat: 20, lng: 20 });
  const [_, dispatch] = useStateValue();
  const { photos = [""] } = activeMarker;

  const toggleLightbox = () => {
    setToggler(!toggler);
  };

  const getLocation = () => {
    dispatch({
      type: "setIsLoading",
      isLoading: true
    });
    return getGeolocation().then(res => {
      setInitialCoords(res);
    });
  };

  const getPublications = () => {
    return getPosts().then(posts => {
      setMarkers([...markers, ...posts]);
    });
  };

  useEffect(() => {
    dispatch({
      type: "setPinOpened",
      pinOpened: false
    });

    setActiveMarker(false);
    getLocation();
    getPublications();
  }, []);

  const openMarker = marker => {
    setActiveMarker(marker);
    dispatch({
      type: "setPinOpened",
      pinOpened: marker
    });
  };

  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={photos}
        type="image"
        // onClose={toggleLightbox}
      />
      <MapPanel {...activeMarker} toggleLightbox={toggleLightbox} />
      <div className="button-back" onClick={() => openMarker(false)}>
        <Icon type="close" />
      </div>
      <Map
        google={google}
        zoom={15}
        disableDefaultUI={true}
        onIdle={() => {
          dispatch({
            type: "setIsLoading",
            isLoading: false
          });
        }}
        style={{
          width: "100%",
          height: "100%"
        }}
        styles={styleMap}
        center={initialCoords}
      >
        <Marker
          title={"Eu"}
          name={"Eu"}
          icon={pinMe}
          position={initialCoords}
        />
        {markers.map((marker, index) => {
          const local = marker.local;
          const postType = marker.postType;
          const animal = marker.animal;
          if (!local.pin) return null;
          return (
            <Marker
              title={"Me"}
              key={index}
              name={animal.name}
              onClick={() => openMarker(marker)}
              icon={postType === "lost" ? pinLost : pinAbandoned}
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
