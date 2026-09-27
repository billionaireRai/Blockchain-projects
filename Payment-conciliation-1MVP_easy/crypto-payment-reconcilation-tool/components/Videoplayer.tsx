// src/components/ReactPlayerVideo.js

import ReactPlayer from "react-player";

export const Videoplayer = ({ videourl }:{ videourl:string }) => {
  return (
    <div className="flex items-center justify-center">
      <ReactPlayer
        oEmbedUrl={videourl}
        playing
        loop
        muted
      />
    </div>
  );
};

export default Videoplayer ;
