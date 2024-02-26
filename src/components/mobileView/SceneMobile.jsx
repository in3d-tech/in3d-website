import { useState, Suspense, lazy, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  OrbitControls,
  Preload,
  Stats,
  useProgress,
} from "@react-three/drei";
// import { HomePage } from "./HomePage";
// import { ContentView } from "./catergories/ContentView";
// import { Loader } from "./Loading";
// import { HorizontalNav } from "./nav/HorizontalNav";
import { HomePageMobile } from "./HomePageMobile";
import { CameraControls } from "../../common/CameraControls";
import { getLettersByModel } from "../../common/getModelByIndex";

// const LazyHomepage = lazy(() => import("./HomePage"));

const SelectedCategory = ({ selectedCategory }) => {
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

      <div className="text-test-mobile">
        {letters.map((letter, index) => (
          <div className="wrapper-test" key={index}>
            <div className="letter">{letter}</div>
            <div className="shadow" style={shadowColor[0]}>
              {letter}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

function SceneMobile({ isLanding }) {
  const [categorySelected, setCategorySelected] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 300 }); //{ x: 0, y: 10, z: 278 }); // y: 80, z: 150 });
  const [target, setTarget] = useState({ x: 0, y: 60, z: 0 });
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [animation, setAnimation] = useState("static");
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <div className={`animated-sky`}></div>
      <div className={`static-water`}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Header
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
        />
        {/* <div style={{ flex: 1 }}> */}
        {/* <SelectedCategory /> */}
        {/* </div> */}

        <div style={{ flex: 1 }} className="mobile-canvas-container">
          <SelectedCategory />

          <Canvas
            frameloop="demand"
            camera={{
              fov: 24,
            }}
          >
            <Stats />
            <CameraControls position={position} target={target} />
            <OrbitControls />
            <Suspense fallback={null}>
              <HomePageMobile
                position={position}
                target={target}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </Suspense>
            <Preload all />
            <AdaptiveDpr pixelated />
          </Canvas>
        </div>
        <div
          style={{
            flex: 1,
            zIndex: 1,
            background: "rgb(0,0,0, 0.6)",
          }}
        >
          <AnimatedText isNavOpen={isNavOpen} />
        </div>
      </div>
    </>
  );
}

export default SceneMobile;

const Header = ({
  setSelectedCategory,
  selectedCategory,
  isNavOpen,
  setIsNavOpen,
}) => {
  // const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  console.log({ selectedCategory });

  const topics = [
    { key: 0, title: "Medicine" },
    { key: 1, title: "Customization" },
    { key: 2, title: "Artifical Intelligence" },
    { key: 3, title: "Military" },
    { key: 4, title: "Industry" },
    { key: 5, title: "Security" },
  ];

  return (
    <header>
      <div className="hamburger-icon" id="icon" onClick={toggleNav}>
        <div className={isNavOpen ? "icon-1 a" : "icon-1"}></div>
        <div className={isNavOpen ? "icon-2 c" : "icon-2"}></div>
        <div className={isNavOpen ? "icon-3 b" : "icon-3"}></div>
        <div className="clear"></div>
      </div>

      <nav id="nav" className={isNavOpen ? "show" : ""}>
        <ul>
          {topics.map((topic) => (
            <li
              key={topic.key}
              className="mobile-nav-list-item"
              onClick={() => {
                setIsNavOpen(false);
                setTimeout(() => setSelectedCategory(topic.key), 500);
              }}
              // onClick={setSelectedCategory(topic.key)}
              style={selectedCategory == topic.key ? { color: "black" } : null}
            >
              {topic.title}
            </li>
          ))}
        </ul>
      </nav>

      <div className="dark-blue" id="blue"></div>

      {/* <section className="content">
        <h1>Hello We are animated!</h1>
        <p className="small">Lorem ipsum dolor sit amet</p>
      </section> */}
    </header>
  );
};

const AnimatedText = ({ isNavOpen }) => {
  const text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."; //"Artificial Intelligence something";
  const text2 = "Vestibulum ullamcorper nisl id arcu pulvinar,"; //"- some points";
  const text3 = "eget condimentum"; //- more basic information dsfsdf";
  const text4 = "neque ultricies."; //"- Specialties fdsdfsd";
  const text5 = "In et ligula ex."; //- This is a sentence about something cool";
  // const text6 = "She sells sea shells by the sea shore";
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
            fontSize: "1.5em",
            // marginInlineStart: "2.9em",
          }}
        >
          {isNavOpen ? null : word}
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
      {/* {splitText(text6)} */}
    </div>
  );
};
