import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TroubleshootOutlined } from "@mui/icons-material";
import YouTube from "react-youtube";
import ReactPlayer from "react-player/youtube";

function ScrollSection({ setSelectedContent, setTextSection, textSection }) {
  const [section4Status, setSection4Status] = useState(null);
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollSection2 = useRef(null);
  const scrollSection3 = useRef(null);
  const scrollSection4 = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);

  const videoIds = [
    "9vA8qX_p11w",
    "enJ6be4qLMs",
    "Bj6KLv7kv2Q",
    "rVzJDgDnKLI",
    "mAEM5q5YFtg",
  ];

  const contentWrapperRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const options = {
      root: null, // relative to document viewport
      rootMargin: "0px", // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.5, // visible amount of item shown in relation to root
    };

    // observer for section 2
    const observer2 = new IntersectionObserver(([entry]) => {
      // if section 2 is visible in viewport
      if (entry.isIntersecting) {
        console.log("is 2");
        setTextSection("scrollSection2");
      }
    }, options);
    observer2.observe(scrollSection2.current);

    // observer for section 3
    const observer3 = new IntersectionObserver(([entry]) => {
      // if section 3 is visible in viewport
      if (entry.isIntersecting) {
        console.log("is 3");
        setTextSection("scrollSection3");
      }
    }, options);
    observer3.observe(scrollSection3.current);

    // observer for section 4
    const observer4 = new IntersectionObserver(([entry]) => {
      // if section 4 is visible in viewport
      if (entry.isIntersecting) {
        console.log("first TEST");

        if (!section4Status) {
          console.log("secont TEST");

          // setTextSection("scrollSection4");
        }
        setSection4Status(true);

        console.log({ section4Status });
        console.log(" THIRD TEST");
      }
    }, options);
    observer4.observe(scrollSection4.current);

    return () => {
      // cleanup - disconnect the observers when the component unmounts
      observer2.disconnect();
      observer3.disconnect();
      observer4.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   const animation = gsap.timeline();

  //   if (textSection === "scrollSection3") {
  //     // If in scrollSection3, animate the text to the middle of the page
  //     gsap.fromTo(
  //       textRef.current,
  //       { yPercent: 600, xPercent: -100 },
  //       {
  //         yPercent: -200,
  //         xPercent: 150,
  //         duration: 5,

  //         scrollTrigger: {
  //           // scrub: true,
  //           once: true,
  //         },

  //         // duration: 1,
  //         // scrollTrigger: {
  //         //   trigger: midSectionRef.current,
  //         //   start: "top bottom",
  //         //   end: "bottom center",
  //         //   scrub: 1,
  //         //   once: true,
  //         // },
  //       }
  //     );
  //   } else {
  //     // If not in scrollSection3, reset the text's position and opacity
  //     animation.to(textRef.current, { y: "-50%", opacity: 1, duration: 1 });
  //   }

  //   // Start the animation
  //   animation.play();
  // }, [textSection]);

  // useEffect(() => {
  //   const pin = gsap.fromTo(
  //     sectionRef.current,
  //     {
  //       translateX: 0,
  //     },
  //     {
  //       translateX: "-300vw",
  //       ease: "none",
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: triggerRef.current,
  //         start: "top top",
  //         end: "2000 top",
  //         scrub: 0.6,
  //         pin: true,
  //         onEnter: () => {
  //           console.log("entered");
  //           setTextSection(true);
  //         },
  //         onLeaveBack: () => setTextSection("unset"),
  //         onLeave: () => setTextSection("unset"),
  //         onEnterBack: () => setTextSection(true),
  //       },
  //     }
  //   );
  //   return () => {
  //     {
  //       /* A return function for killing the animation on component unmount */
  //     }
  //     // ScrollTrigger.getById("scrollSection2").kill();
  //     // ScrollTrigger.getById("scrollSection3").kill();
  //     // ScrollTrigger.getById("scrollSection4").kill();
  //     pin.kill();
  //   };
  // }, []);

  useEffect(() => {
    let isAnimated = false; // Add a flag
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          onEnter: () => {
            console.log("entered");
            setTextSection(true);
            if (!isAnimated) {
              // Only do the animation here if it's not done yet
              gsap.fromTo(
                textRef.current,
                { yPercent: 600, xPercent: -100 },
                { yPercent: -200, xPercent: 150, duration: 5 }
              );
              gsap.fromTo(
                textRef2.current,
                { yPercent: -200, xPercent: 100 },
                { yPercent: 400, xPercent: -150, duration: 4 }
              );
              isAnimated = true; // Set the flag to true after animating
            }
          },
          onLeaveBack: () => setTextSection("unset"),
          onLeave: () => {
            setSection4Status(true);
            setTextSection("unset");
            console.log("jsut left the thing ya");
          },
          onEnterBack: () => {
            // setSection4Status(null);
            setTextSection("scrollSection4");
            console.log("just entered back into the thing!");
            if (!isAnimated) {
              // Only do the animation here if it's not done yet
              gsap.fromTo(
                textRef.current,
                { yPercent: 600, xPercent: -100 },
                { yPercent: -200, xPercent: 150, duration: 5 }
              );
              isAnimated = true; // Set the flag to true after animating
            }
          },
        },
      }
    );

    return () => {
      // A return function for killing the animation on component unmount
      pin.kill();
    };
  }, []);

  const contentPlaceholder = videoIds.map((slide, idx) => (
    <>
      <BottomSelection
        slide={slide}
        idx={idx}
        // vidIds={videos}
        // setVideos={setVideos}
      />
    </>
  ));

  return (
    <section className="scroll-section-outer">
      {/* The section up act just as a wrapper. If the trigger (below) is the
      first jsx element in the component, you get an error on route change */}

      {/* The div below act just as a trigger. As the doc suggests, the trigger and 
      the animation should alway be two separated refs */}
      <div ref={triggerRef}>
        <div ref={sectionRef} className="scroll-section-inner">
          <div
            className="scroll-section"
            style={{
              display: "flex",
              // border: "3px solid yellow",
              flexDirection: "row",
              justifyContent: "flex-start",
              // background: 'url("/med-temp-img.png")',
            }}
          >
            {/* <h3>Section 1</h3> */}
            <div
              style={{
                // border: "2px solid black",
                height: "100%",
                width: "600px",
                left: 0,
                // background: "white",
                position: "relative",
                border: "2px solid red",
              }}
              ref={innerRef}
            ></div>
            <div
              style={{
                height: "100%",
                width: "600px",
                border: "2px solid yellow",
              }}
            ></div>
            {/* <img className="scroll-image" src="/med-temp-img.png" /> */}
          </div>
          <div
            className="scroll-section"
            // style={{ background: 'url("/microsoft-ar.png")' }}
            ref={scrollSection2}
            style={{ border: "2px solid pink" }}
          >
            {/* <h3>Section 2</h3> */}
            <div
              style={{
                border: "1px solid black",
                width: "90%",
                height: "50%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <img className="scroll-image" src="/microsoft-ar.png" />
              <img className="scroll-image" src="/microsoft-ar.png" />
              <img className="scroll-image" src="/microsoft-ar.png" />
            </div>
            {/* // <img className="scroll-image" src="/microsoft-ar.png" /> */}
          </div>
          <div
            className="scroll-section"
            // style={{ background: 'url("/security_two.jpg")' }}
            ref={scrollSection3}
            style={{ border: "4px solid blue" }}
          >
            {/* <h3>Section 3</h3> */}
            <div
              ref={textRef}
              style={{ fontSize: "3.5em" }}
              className="your-text-class"
            >
              Random text here here
            </div>
            {textSection == "scrollSection3" && (
              <div className="animated-text">
                middle text that should appear to do something.
              </div>
            )}
            <div
              ref={textRef2}
              style={{ fontSize: "3.5em" }}
              className="your-text-class"
            >
              Second text here here
            </div>
            {/* <img className="scroll-image" src="/security_two.jpg" /> */}
          </div>
          <div
            className="scroll-section"
            // style={{ background: 'url("/another-med.jpg")' }}
            ref={scrollSection4}
          >
            {/* <h3>Section 4</h3> */}
            <div
              style={{ border: "1px solid black", width: "90%", height: "90%" }}
            >
              {<contentPlaceholder />}
            </div>
            {/* <ContentView videoIds={videoIds} /> */}
            {/* <img className="scroll-image" src="/another-med.jpg" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScrollSection;

const ContentView = ({ videoIds }) => {
  return (
    <div
      className="grid-container"
      style={{ border: "1px solid red", width: "90%", height: "60%" }}
    >
      <div className="grid-item">1</div>
      <div className="grid-item">2</div>
      <div className="grid-item">3</div>
    </div>
  );
};

const BottomSelection = ({ slide, idx, vidIds, setVideos }) => {
  const [showVid, setShowVid] = useState(false);
  const [hovered, setHovered] = useState(false);

  console.log(idx);

  const opts2 = {
    height: "100%",
    width: "100%",
    borderRadius: "5px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };

  const onReadyFunct = (e) => {
    if (e.target) e.target.pauseVideo();
  };

  return (
    <div key={idx} className="cardz">
      <div
        className="curved-border"
        onMouseEnter={(e) => setHovered(true)}
        onMouseLeave={(e) => setHovered(false)}
        style={{ opacity: hovered ? 1 : 0.2 }}
        // onClick={() => {
        //   const arrayCopy = [...vidIds];
        //   const elementToMove = arrayCopy.splice(idx, 1)[0];
        //   arrayCopy.unshift(elementToMove);
        //   setVideos(arrayCopy);
        // }}
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
