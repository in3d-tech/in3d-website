import YouTube from "react-youtube";

export function ContentView({ scrollRef }) {
  const graphicSlides = [1, 2, 3, 4, 5, 6];

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReadyFunct = (e) => {
    if (e.target) e.target.pauseVideo();
  };

  const contentPlaceholder = graphicSlides.map((slide, idx) => {
    // if (idx == 0) {
    //   return <div className="slide-two" key={idx}></div>;
    // }
    return (
      <div key={idx} className="cardz">
        {/* className="slide"> */}

        <img
          className="slide-content"
          src={"/in3dlogo.png"}
          // style={{
          //   backgroundImage:
          //     "linear-gradient(to right, rgba(255,255,255,0) 50%, rgba(0,0,0,0.65) 50%)",
          // }}
        />
      </div>
    );
  });

  return (
    <div className="category-graphics-view">
      <div className="selected-content-container">
        {/* <div className="selected-content-slider">
          <YouTube
            videoId="9vA8qX_p11w"
            opts={opts}
            onReady={(e) => onReadyFunct(e)}
          />
        </div> */}
        <img
          className="slide-content"
          src={"/in3dlogo.png"}
          // style={{
          //   backgroundImage:
          //     "linear-gradient(to right, rgba(255,255,255,0) 50%, rgba(0,0,0,0.65) 50%)",
          // }}
        />
      </div>
      <div className="grid-container" ref={scrollRef}>
        {contentPlaceholder}
      </div>
    </div>
  );
}
