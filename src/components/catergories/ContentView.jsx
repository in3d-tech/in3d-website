import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const videoz = [
  "9vA8qX_p11w",
  "enJ6be4qLMs",
  "Bj6KLv7kv2Q",
  "rVzJDgDnKLI",
  "mAEM5q5YFtg",
];

export function ContentView({ scrollRef, videoIds }) {
  const [videos, setVideos] = useState([...videoz]);
  const graphicSlides = [1, 2];

  useEffect(() => {
    if (!videos.length) {
      setVideos([...videoIds]);
    }
  }, []);

  useEffect(() => {
    console.log("annnnd a re-render", videos[0]);
  }, [videos]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };

  console.log("vids", videos);

  const onReadyFunct = (e) => {
    if (e.target) e.target.pauseVideo();
  };

  const contentPlaceholder = videoIds.map((slide, idx) => (
    <>
      <BottomSelection
        slide={slide}
        idx={idx}
        vidIds={videos}
        setVideos={setVideos}
      />
    </>
  ));

  return (
    <div className="category-graphics-view">
      <div className="selected-content-container">
        <div className="selected-content-slider">
          <YouTube
            videoId={videos[0]}
            opts={opts}
            onReady={(e) => onReadyFunct(e)}
            style={{ height: "100%" }}
          />
        </div>
        {/* <img
          className="slide-content"
          src={"/in3dlogo.png"}
          // style={{
          //   backgroundImage:
          //     "linear-gradient(to right, rgba(255,255,255,0) 50%, rgba(0,0,0,0.65) 50%)",
          // }}
        /> */}
      </div>
      <div className="grid-container" ref={scrollRef}>
        {contentPlaceholder}
      </div>
    </div>
  );
}

const BottomSelection = ({ slide, idx, vidIds, setVideos }) => {
  const [showVid, setShowVid] = useState(false);
  const [hovered, setHovered] = useState(false);

  const opts2 = {
    height: "100%",
    width: "100%",
    borderRadius: "5px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };

  return (
    <div key={idx} className="cardz">
      <div
        className="curved-border"
        onMouseEnter={(e) => setHovered(true)}
        onMouseLeave={(e) => setHovered(false)}
        style={{ opacity: hovered ? 1 : 0.2 }}
        onClick={() => {
          console.log(vidIds);
          const arrayCopy = [...vidIds];
          const elementToMove = arrayCopy.splice(idx, 1)[0];
          arrayCopy.unshift(elementToMove);
          setVideos(arrayCopy);
          console.log(arrayCopy);
        }}
      >
        <div
          // onMouseEnter={(e) => setHovered(true)}
          // onMouseLeave={(e) => setHovered(false)}
          className="overlay"
        ></div>
        <YouTube
          videoId={slide}
          opts={opts2}
          onReady={(e) => onReadyFunct(e)}
          style={{
            height: "100%",
            borderRadius: "10px",
            zIndex: -1,
            pointerEvents: "none",
          }}
          onPlay={() => console.log("CCCCCCCCCCCCCCC")}
        />
      </div>
    </div>
  );
};
