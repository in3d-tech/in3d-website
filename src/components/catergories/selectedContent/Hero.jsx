import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactPlayer from "react-player";

gsap.registerPlugin(ScrollTrigger);

const VideoBG = () => (
  // <div className="player-wrapper">
  <ReactPlayer
    className="react-player-bg"
    url="/assets/video/darluke.mp4"
    // width="100%"
    height="100%"
    style={{ border: "2px solid yellow", borderRadius: "50%" }}
    // width="100%"
    controls={false}
    playing={true}
    volume={0}
    loop={true}
    // style={{
    //   position: "absolute",
    //   top: "0",
    //   right: "0",
    //   // right: 0,
    //   // height: "50%",
    //   borderRadius: "10px",
    //   zIndex: -1,
    //   // border: "2px solid red",
    // }}
    // config={{ file
  />
);

function Hero({ setSelectedContent, title }) {
  const [isColoured, setIsColoured] = useState();
  const titleRef = useRef();
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const midSectionRef = useRef(null);
  const vidRef = useRef(null);

  useEffect(() => {
    // Create a GSAP timeline for the initial falling animation
    const tl = gsap.timeline();

    // tl.fromTo(
    //   titleRef.current,
    //   { y: "-50%" }, // Start from the top (-100%)
    //   { y: "80%", ease: "power2.out", duration: 0 } // End at the original position
    // );

    // // Add a scroll-triggered animation that moves the title upward
    // gsap.to(titleRef.current, {
    //   y: "30%", // Adjust this value to control how far upwards the title moves
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: titleRef.current,
    //     start: "top bottom", // The animation starts when the top of the title hits the bottom of the viewport
    //     end: "+=100vh", // The animation ends when the scroll has moved down 100vh
    //     scrub: true, // Allow the title to move down with the page
    //   },
    // });

    gsap.fromTo(
      titleRef.current,
      { yPercent: -1 },
      {
        yPercent: 80,
        duration: 2.5,

        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          // once: true,
          // toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      vidRef.current,
      { yPercent: -1 },
      {
        yPercent: 80,
        duration: 2.5,

        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          // once: true,
          // toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      textLeftRef.current,
      { yPercent: -150 },
      {
        yPercent: 5,
        duration: 2.5,

        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          // once: true,
          // toggleActions: "play none none none",
        },
      }
    );
    gsap.fromTo(
      textRightRef.current,
      { yPercent: 150 },
      {
        yPercent: -5,
        duration: 2.5,
        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          // once: true,
        },
      }
    );
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: 'url("/another-med.jpg") no-repeat center',
        backgroundSize: "cover",
        filter: `grayscale(${isColoured ? "0%" : "0%"})`,
        animation: "fadeInHalf 1s",
        transition: "filter 1s ease",
      }}
      onMouseOver={() => setIsColoured(true)}
      onMouseOut={() => setIsColoured(false)}
      ref={midSectionRef}
    >
      <div
        style={{
          height: "50%",
          position: "absolute",
          top: "20%",
          right: 0,
        }}
        // className="falling-title"
        ref={vidRef}
      >
        <VideoBG />
      </div>
      <div
        ref={textLeftRef}
        style={{
          position: "absolute",
          right: "76%",
          fontSize: "2.5em",
          top: "80%",
          fontFamily: "gotham-bold",
          color: "white",
        }}
      >
        Simply Expanded
      </div>
      <div
        ref={textRightRef}
        style={{
          position: "absolute",
          left: "5%",
          top: "70%",
          fontSize: "2.5em",
          fontFamily: "gotham-bold",
          color: "white",
        }}
      >
        in3D Tech
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          // top: "20%",
        }}
        className="falling-title" // Add a class name to target the title element\
        ref={titleRef}
      >
        {title}
      </div>
      <header className="hero__header">
        {/* <h1 className="falling-title">John Doe</h1>
        <h2>Frontend Developer</h2> */}
        {/* <MyComponentMorph /> */}
      </header>
    </div>
  );
}

export default Hero;
