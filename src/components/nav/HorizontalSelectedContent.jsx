import { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactTwo } from "./ContactTwo";
import ReactPlayer from "react-player";

const VideoPlayer = () => (
  <div className="player-wrapper">
    <ReactPlayer
      className="react-player"
      url="/assets/video/short-vid.mp4"
      width="100%"
      height="100%"
      controls={false}
      playing={true}
      loop={true}
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        borderRadius: "10px",
        // border: "2px solid red",
      }}
      // config={{ file: { attributes: { style: "object-fit: cover;" } } }}
    />
  </div>
);

const VideoBG = () => (
  // <div className="player-wrapper">
  <ReactPlayer
    className="react-player-bg"
    url="/assets/video/darluke.mp4"
    // width="100%"
    height="100%"
    controls={false}
    playing={true}
    volume={0}
    loop={true}
    style={{
      position: "absolute",
      top: "0",
      left: "0",
      // right: 0,
      borderRadius: "10px",
      zIndex: -1,
      // border: "2px solid red",
    }}
    // config={{ file: { attributes: { style: "object-fit: cover;" } } }}
  />
  // </div>
);
gsap.registerPlugin(ScrollTrigger);

export function HorizontalSelectedContent({ setSelectedContent, title }) {
  const [showContent, setShowContent] = useState(false);
  const [scrollStatus, setScrollStatus] = useState("");
  const [imgSrc, setimgSrc] = useState(false);
  const wrapperRef = useRef(null);
  const closeBtnRef = useRef(null);
  const midSectionRef = useRef(null);
  const titleRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const textLeftRefTwo = useRef(null);
  const textRightRefTwo = useRef(null);
  const textLeftRefThree = useRef(null);
  const textRightRefThree = useRef(null);
  const textLeftRefFour = useRef(null);
  const textRightRefFour = useRef(null);
  const textLeftRefFive = useRef(null);
  const textLeftRefSix = useRef(null);
  const textRightRefFive = useRef(null);
  const textRightRefSix = useRef(null);
  const bgImageRef = useRef(null);
  const midImg = useRef(null);
  const sectionThreeRef = useRef(null);

  useEffect(() => {
    if (!showContent) setShowContent("active");
  }, []);

  const getBgImage = () => {
    let url;

    switch (title) {
      case "Customization":
        url = "/customization-img.png";
        break;
      case "Artifical Intelligence":
        url = "/where-is-ai-used.jpg";
        break;
      case "Microsoft":
        url = "/microsoft-ar.png";
        break;
      case "Military":
        url = "/military-ar.jpg";
        break;
      case "Security":
        url = "/security-vr.avif";
        break;
      default:
        url = "/another-med.jpg";
        break;
    }
    return {
      background: `url(${url}) no-repeat center`,
      backgroundSize: "contain",
    };
  };

  useEffect(() => {
    // close btn
    ScrollTrigger.create({
      trigger: ".section-twoo",
      start: "top 10%",
      end: "bottom 20%",
      toggleClass: { targets: closeBtnRef.current, className: "white-exit" },
    });

    // title
    gsap.fromTo(
      titleRef.current,
      { y: -500, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3 }
    );
    // img
    // gsap.to(imgRef.current, {
    //   y: 1300,
    //   duration: 10,
    //   scrollTrigger: {
    //     trigger: midSectionRef.current,
    //     start: "top 80%",
    //     end: "top 30%",
    //     scrub: 4,
    //   },
    // });

    //first two sections
    gsap.fromTo(
      [textLeftRef.current, textLeftRefTwo.current],
      { xPercent: -150 },
      {
        xPercent: 80,
        duration: 2.5,

        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
          once: true,
          // toggleActions: "play none none none",
        },
      }
    );
    gsap.fromTo(
      [textRightRef.current, textRightRefTwo.current],
      { xPercent: 150 },
      {
        xPercent: -140,
        duration: 2.5,
        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
          once: true,
        },
      }
    );

    gsap.fromTo(
      [textLeftRefThree.current, textLeftRefFour.current],
      { xPercent: -350 },
      {
        xPercent: 80,
        duration: 7.5,
        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 4,
          once: true,
        },
      }
    );
    gsap.fromTo(
      [textRightRefThree.current, textRightRefFour.current],
      { xPercent: 350 },
      {
        xPercent: -90,
        duration: 7.5,
        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 4,
          once: true,
        },
      }
    );

    gsap.fromTo(
      [textLeftRefFive.current, textLeftRefSix.current],
      { xPercent: -350 },
      {
        xPercent: 80,
        duration: 7.5,
        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 4,
          once: true,
        },
      }
    );
    gsap.fromTo(
      [textRightRefFive.current, textRightRefSix.current],
      { xPercent: 350 },
      {
        xPercent: -80,
        duration: 7.5,
        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 4,
          once: true,
        },
      }
    );

    gsap.to(bgImageRef.current, {
      backgroundPosition: "0% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: bgImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // once: true,
      },
    });

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom center",
      toggleClass: { targets: closeBtnRef.current, className: "white-exit" },
    });

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "center center",
      // end: "bottom bottom",
      toggleClass: {
        targets: wrapperRef.current,
        className: "section-three-bg-two",
      },
    });

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom 50.5%",
      once: true,
      scrub: 1,
      // markers: true,
      // toggleClass: { targets: midImg.current, className: "get-fixed" },
      onEnter: () => {
        setScrollStatus(1);
        gsap.to(midImg.current, {
          opacity: 0,
          duration: 0.1,

          onComplete: () => {
            gsap.fromTo(
              midImg.current,
              { opacity: 0, duration: 0.2 },
              { opacity: 0.6, duration: 0.2 }
            );
          },
        });
      },
      onLeave: () => {
        setScrollStatus(2);
      },
      onLeaveBack: () => {
        setScrollStatus(2);
      },
      onEnterBack: () => {
        setScrollStatus(1);
      },
    });

    ScrollTrigger.create({
      trigger: ".section-twoo",
      start: "top 10%",
      end: "bottom 20%",
      toggleClass: { targets: closeBtnRef.current, className: "white-exit" },
    });

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "center 30%",
      onEnter: () => {
        gsap.to(midImg.current, {
          // opacity: 0,
          // duration: 0.1,
          onComplete: () => {
            setimgSrc(1);
            gsap.fromTo(
              midImg.current,
              { opacity: 0, duration: 0 },
              { opacity: 0.6, duration: 0 }
            );
          },
        });
      },
      onLeaveBack: () => {
        gsap.to(midImg.current, {
          // opacity: 0,
          // duration: 0.1,
          onComplete: () => {
            setimgSrc(0);
            gsap.fromTo(
              midImg.current,
              { opacity: 0, duration: 0 },
              { opacity: 0.6, duration: 0 }
            );
          },
        });
      },
    });
  }, []);

  const sectionStyle = {
    height: "100vh",
  };

  const getScrollStyles = {
    1: "start-scroll",
    2: "bottom-scroll",
    3: "",
    4: "",
  };

  return (
    <div
      className={`h-selected-nav ${showContent == "active" ? "active" : ""}`}
    >
      <div>
        <CloseIcon
          ref={closeBtnRef}
          className="nav-close-icon"
          sx={{
            // color: "black",
            fontSize: 60,
            position: "fixed",
            top: "1em",
            right: "1em",
            zIndex: 1,
          }}
          onClick={() => {
            setSelectedContent(false);
          }}
        />
      </div>

      <div
        name="section1"
        style={{
          ...sectionStyle,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
        }}
        className="h-selection-one"
      >
        <div className="h-selection-one-left" style={{ ...getBgColor(title) }}>
          <div ref={titleRef} className="h-selected-title">
            {title}
          </div>
          <h1 className="selection-appear-text" style={{ marginTop: "5em" }}>
            This is a few more lines about what it is this page is trying to
            display or represent
          </h1>
          <div className="circle">
            <div className="quarter"></div>

            <div className="quarter"></div>
            <div className="quarter"></div>
            <div className="quarter"></div>
          </div>
        </div>
        <div ref={sectionThreeRef} className="h-selection-one-right">
          <section
            ref={bgImageRef}
            className="h-content-right-section"
            style={getBgImage()}
          ></section>
        </div>
      </div>

      {/* section 2 */}
      <div className="h-selected-content-mid-section" ref={midSectionRef}>
        <div
          style={{
            // background: "white",

            width: "100%",
            height: "100%",
            zIndex: -1,
            borderRadius: "0px 0px 30px 0px",
          }}
          className="section-twoo"
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              height: "100%",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <div
              ref={textLeftRef}
              style={{
                position: "absolute",
                right: "50%",
                fontSize: "2.5em",
                top: "20%",
                fontFamily: "gotham-bold",
              }}
            >
              "Here is another headline"
            </div>
            <div
              ref={textRightRef}
              style={{
                position: "absolute",
                left: "50%",
                top: "10%",
                fontSize: "2.5em",
                fontFamily: "gotham-bold",
              }}
            >
              "A headline!"
            </div>

            <div
              ref={textLeftRefTwo}
              style={{
                position: "absolute",
                right: "50%",
                fontSize: "2.5em",
                top: "40%",
                fontFamily: "gotham-bold",
              }}
            >
              "Here is another headline"
            </div>
            <div
              ref={textRightRefTwo}
              style={{
                position: "absolute",
                left: "50%",
                top: "30%",
                fontSize: "2.5em",
                fontFamily: "gotham-bold",
              }}
            >
              "A headline!"
            </div>

            <div
              ref={textLeftRefThree}
              style={{
                position: "absolute",
                right: "50%",
                fontSize: "2.5em",
                top: "70%",
              }}
            >
              "Here is another Low headline"
            </div>
            <div
              ref={textRightRefThree}
              style={{
                position: "absolute",
                left: "50%",
                top: "60%",
                fontSize: "2.5em",
                fontFamily: "gotham-bold",
              }}
            >
              "A Lower down headline!"
            </div>

            <div
              ref={textLeftRefFive}
              style={{
                position: "absolute",
                right: "50%",
                fontSize: "2.5em",
                top: "90%",
              }}
            >
              "Here is another Low headline Again"
            </div>
            <div
              ref={textRightRefFive}
              style={{
                position: "absolute",
                left: "50%",
                top: "80%",
                fontSize: "2.5em",
                fontFamily: "gotham-bold",
              }}
            >
              "A Lower down headline again!"
            </div>
          </div>
        </div>

        <div
          style={{
            // background: "white",
            backgroundSize: "contain",
            // borderRadius: "10px",
            zIndex: 1,
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
          className="section-three"
          ref={wrapperRef}
        >
          {title == "Medicine" && <VideoBG />}

          {title != "Medicine" && (
            <div
              className={`mid-img-test ${
                scrollStatus ? getScrollStyles[scrollStatus] : ""
              }`}
              ref={midImg}
            >
              {imgSrc == 1 ? (
                <VideoPlayer />
              ) : (
                <img
                  // ref={midImg}
                  alt="category image"
                  src={imgSrc == 1 ? "/where-is-ai-used.jpg" : "/temp-3d.avif"}
                  className="mid-img-test-two"
                />
              )}
              {/* <VideoPlayer />
            <img
              // ref={midImg}
              alt="category image"
              src={imgSrc == 1 ? "/where-is-ai-used.jpg" : "/security-vr.avif"}
              className="mid-img-test-two"
            /> */}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          height: "60vh",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="contact-us-wrapper">
          <ContactTwo />
        </div>
      </div>
    </div>
  );
}

const getBgColor = (title) => {
  const bgColors = {
    Customization: {
      background:
        "linear-gradient(rgba(0, 48, 42, 0.9), rgba(155, 127, 127, 0.3))",
    },
    "Artifical Intelligence": {
      background:
        "linear-gradient(rgba(0, 68, 99, 0.9), rgba(155, 127, 127, 0.3))",
    },
    Microsoft: {
      background:
        "linear-gradient(rgba(255, 115, 0, 0.9),rgba(155, 127, 127, 0.3))",
    },
    Security: {
      background:
        "linear-gradient(rgba(24, 0, 8, 0.4),rgba(155, 127, 127, 0.3))",
    },
    Medicine: {
      background:
        "linear-gradient(rgba(109, 54, 54, 0.9), rgba(155, 127, 127, 0.3))",
    },
    Military: {
      background:
        "linear-gradient(rgba(0, 56, 13, 0.3), rgba(155, 127, 127, 0.3))",
    },
  };
  return bgColors[title] || { background: "rgba(0, 56, 13, 0.3)" };
};

// background: linear-gradient(rgba(155, 127, 127, 0.3), rgb(237, 250, 250));
