import React from "react";
import ContentLoader from "react-content-loader";

// Components
import Bar from "../../components/Bar";
import PageTitle from "../../components/PageTitle";

import "./Store.scss";

const Store = () => {
  return (
    <div className="store">
      <PageTitle title="Loja" />
      <div className="loader">
        <ContentLoader
          height={600}
          viewBox="0 0 360 800"
        >
          {/* Only SVG shapes */}
          <rect
            id="Rectangle-Copy-4"
            x="0"
            y="453"
            width="93"
            height="93"
            rx="22"
          ></rect>
          <rect
            id="Rectangle-Copy-10"
            x="0"
            y="579"
            width="93"
            height="93"
            rx="22"
          ></rect>
          <rect
            id="Rectangle"
            x="0"
            y="94"
            width="138"
            height="214"
            rx="22"
          ></rect>
          <rect
            id="Rectangle-Copy"
            x="162"
            y="94"
            width="138"
            height="214"
            rx="22"
          ></rect>
          <rect
            id="Rectangle-Copy-3"
            x="324"
            y="94"
            width="138"
            height="214"
            rx="22"
          ></rect>
          <rect
            id="Rectangle"
            x="0"
            y="51"
            width="276"
            height="16"
            rx="7"
          ></rect>
          <rect
            id="Rectangle-Copy-5"
            x="0"
            y="404"
            width="276"
            height="16"
            rx="7"
          ></rect>
          <rect
            id="Rectangle-Copy-7"
            x="117"
            y="500"
            width="214"
            height="16"
            rx="7"
          ></rect>
          <rect
            id="Rectangle-Copy-11"
            x="117"
            y="626"
            width="214"
            height="16"
            rx="7"
          ></rect>
          <rect
            id="Rectangle-Copy-9"
            x="117"
            y="525"
            width="214"
            height="16"
            rx="7"
          ></rect>
          <rect
            id="Rectangle-Copy-12"
            x="117"
            y="651"
            width="214"
            height="16"
            rx="7"
          ></rect>
          <rect
            id="Rectangle-Copy-6"
            x="0"
            y="357"
            width="151"
            height="33"
            rx="7"
          ></rect>
          <rect
            id="Rectangle-Copy-8"
            x="117"
            y="453"
            width="151"
            height="33"
            rx="7"
          ></rect>
          <rect
            id="Rectangle-Copy-13"
            x="117"
            y="579"
            width="151"
            height="33"
            rx="7"
          ></rect>
          <rect
            id="Rectangle"
            x="293"
            y="0"
            width="31"
            height="26"
            rx="7"
          ></rect>
        </ContentLoader>
      </div>
      <Bar />
    </div>
  );
};

export default Store;
