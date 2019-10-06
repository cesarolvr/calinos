import React from "react";
import * as R from "ramda";
import classNames from "classnames";

import "./MapPanel.scss";

const MapPanel = ({ activeMarker }) => {
  const active = !R.isEmpty(activeMarker);
  return (
    <div
      className={classNames("map-panel", {
        "-active": active
      })}
    >
      {JSON.stringify(activeMarker)}
    </div>
  );
};

export default MapPanel;
