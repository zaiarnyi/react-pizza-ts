import React from "react";
import ContentLoader from "react-content-loader";

interface IIsLoadPizzaProp {}

export const IsLoadPizza: React.FC<IIsLoadPizzaProp> = (props) => {
  return (
    <ContentLoader
      speed={4}
      width={272}
      height={462}
      viewBox="0 0 272 462"
      backgroundColor="#fdfdfd"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="141" cy="125" r="120" />
      <rect x="1" y="261" rx="0" ry="0" width="270" height="25" />
      <rect x="1" y="308" rx="0" ry="0" width="271" height="83" />
      <rect x="3" y="415" rx="0" ry="0" width="271" height="43" />
    </ContentLoader>
  );
};
