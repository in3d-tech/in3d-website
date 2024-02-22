import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { getLettersByModel } from "../../common/getModelByIndex";
import { t } from "../../common/t";
import { getCategoryDetails } from "./logic/getCategoryDetails";
// import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
// import ReactPlayer from "react-player/youtube";

const videoz = [
  "9vA8qX_p11w",
  "enJ6be4qLMs",
  "Bj6KLv7kv2Q",
  "rVzJDgDnKLI",
  "mAEM5q5YFtg",
];

const Text = ({ selectedCategory }) => {
  // console.log({ selectedModel });
  const letters = getLettersByModel(selectedCategory);

  if (!letters) return null;
  //       color: #af3737; medicine red?
  const shadowColor = {
    1: { color: "#af3737" },
    2: { color: "#999" },
    3: { color: "#999" },
    4: { color: "#00A4EF" },
    5: { color: "#2B5317" },
    6: { color: "#999" },
    7: { color: "#999" },
  };
  return (
    <>
      <div className="overlay-test"></div>

      <div className="text-test">
        {letters.map((letter, index) => (
          <div className="wrapper-test" key={index}>
            <div className="letter">{letter}</div>
            <div className="shadow" style={shadowColor[selectedCategory]}>
              {letter}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

function ContentView({ videoIds, setShowFloat, selectedCategory }) {
  // return null;
  const [videos, setVideos] = useState([...videoz]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const graphicSlides = [1, 2];
  const [isButtonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    setButtonClicked((prevState) => !prevState);
  };

  useEffect(() => {
    if (!videos.length) {
      setVideos([...videoIds]);
    }
  }, []);

  // useEffect(() => {
  //   console.log("annnnd a re-render");
  // }, [videos]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };

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
        onReadyFunct={onReadyFunct}
      />
    </>
  ));

  const categoryDetails = getCategoryDetails(selectedCategory);

  const bgStyles = {
    1: "rgb(175, 55, 55, 0.6)",
    2: "#999",
    3: "rgba(99, 204, 218, 0.6)",
    4: "#00A4EF",
    5: "rgba(	43,	83,	23, 0.6)",
    6: "#999",
    7: "#999",
  };

  return (
    <div
      className="content-something"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        zIndex: 2,
      }}
    >
      <Text selectedCategory={selectedCategory} />
      <div
        // className="content-left"
        // onClick={handleClick}
        className={`content-left ${isButtonClicked ? "button-clicked" : ""}`}
        style={{
          // background: "rgb(0, 0, 0, 0.8)",
          flex: 1,
          opacity: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div></div>
        <div
          className="selected-content-option-container"
          style={{ backgroundColor: bgStyles[selectedCategory] }}
        >
          <div
            // onClick={() => setSelectedTopic(true)}
            onClick={() => setShowFloat(true)}
            className="selected-content-option"
          >
            Chat with ChatGPT
          </div>
          <div
            // onClick={() => setSelectedTopic(true)}
            className="selected-content-option"
          >
            Adapting to the new AI world
          </div>
          <div
            // onClick={() => setSelectedTopic(true)}
            className="selected-content-option"
          >
            Another topic
          </div>
          {isButtonClicked ? <AnimatedText /> : null}
        </div>
        <div className="content-placeholder-container">
          {/* {contentPlaceholder} */}
        </div>
      </div>
      <div style={{ flex: 1 }}></div>
      <div
        className="content-right"
        style={{
          flex: 1,
        }}
      >
        <div className="selected-content-info">
          <h3>{categoryDetails.title}</h3>
          <ul>
            {categoryDetails.texts?.map((detail, idx) => (
              <li className="selected-content-list" key={idx}>
                {t(detail)}
              </li>
            ))}
            {/* <li>{t("remoteSupportMedicine")}</li>
            <li>{t("tutorials")}</li>
            <li>{t("supportForPerformingAnalysis")}</li> */}
          </ul>
        </div>
        {/* <div>
          <div className="selected-content-info num2"></div>
          <div className="selected-content-info num2"></div>
        </div> */}
      </div>
    </div>
  );
}

const AnimatedText = () => {
  const text1 = "Artificial Intelligence something";
  const text2 = "some points";
  const text3 = "more basic information dsfsdf";
  const text4 = "Specialties fdsdfsd";
  const text5 = "This is a sentence about something cool";
  const text6 = "She sells sea shells by the sea shore";
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  const splitText = (text) => {
    return text.split(/\s+/).map((word, index) => (
      <>
        <span
          className="selected-content-span"
          key={"word" + index}
          style={{
            animationDelay: `${(index + 23) * 0.04}s`,
            fontSize: "2em",
            marginInlineStart: "2.9em",
          }}
        >
          {word}
        </span>
        <span key={"space" + index}>&nbsp;</span>
      </>
    ));
  };

  return (
    <div className={animationStarted ? "selected-content-header animated" : ""}>
      {splitText(text1)}
      <br />
      {splitText(text2)}
      <br />
      {splitText(text3)}
      <br />
      {splitText(text4)}
      <br />
      {splitText(text5)}
      <br />
      {splitText(text6)}
    </div>
  );
};

const BottomSelection = ({ slide, idx, vidIds, setVideos, onReadyFunct }) => {
  // return null;
  const [showVid, setShowVid] = useState(false);
  const [hovered, setHovered] = useState(false);

  const opts2 = {
    height: "74px",
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
          const arrayCopy = [...vidIds];
          const elementToMove = arrayCopy.splice(idx, 1)[0];
          arrayCopy.unshift(elementToMove);
          setVideos(arrayCopy);
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
          onPlay={() => console.log("onPlay")}
        />
      </div>
    </div>
  );
};

export default ContentView;
