import { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Contact } from "./AboutContact";
import { ContactTwo } from "./ContactTwo";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalSelectedContent({
  selectedContent,
  setSelectedContent,
  title,
}) {
  const [showContent, setShowContent] = useState(false);
  const [secondSection, setSecondSection] = useState(false);
  const [scrollStatus, setScrollStatus] = useState("");
  const [imgSrc, setimgSrc] = useState(false);
  const wrapperRef = useRef(null);
  const closeBtnRef = useRef(null);
  const imgRef = useRef(null);
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
      { xPercent: -350 },
      {
        xPercent: 200,
        duration: 2.5,

        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
          // toggleActions: "play none none none",
          onUpdate: (self) => {
            // Calculate the scroll progress as a percentage
            const scrollProgress = self.progress * 100;

            // Set the scroll position by percentage
            // self.scrollLeft =
            //   (scrollProgress / 100) *
            //   (midSectionRef.current.scrollWidth -
            //     midSectionRef.current.clientWidth);
          },
        },
      }
    );
    gsap.fromTo(
      [textRightRef.current, textRightRefTwo.current],
      { xPercent: 350 },
      {
        xPercent: -200,
        duration: 2.5,
        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      [textLeftRefThree.current, textLeftRefFour.current],
      { xPercent: -350 },
      {
        xPercent: 300,
        duration: 5.5,
        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 1,
        },
      }
    );
    gsap.fromTo(
      [textRightRefThree.current, textRightRefFour.current],
      { xPercent: 350 },
      {
        xPercent: -300,
        duration: 5.5,
        scrollTrigger: {
          trigger: midSectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 1,
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
      end: "bottom 50.5%",
      once: true,
      scrub: 1,
      // markers: true,
      // toggleClass: { targets: midImg.current, className: "get-fixed" },
      onEnter: () => {
        setScrollStatus(1);
        console.log("ON ENTER");
        gsap.to(midImg.current, {
          opacity: 0,
          duration: 0.1,

          onComplete: () => {
            gsap.fromTo(
              midImg.current,
              { opacity: 0, duration: 0.2 },
              { opacity: 1, duration: 0.2 }
            );
          },
        });
      },
      onLeave: () => {
        setScrollStatus(2);
        console.log("ON LEAVE");
      },
      onLeaveBack: () => {
        setScrollStatus(2);
        console.log("ON LEAVE BACK");
      },
      onEnterBack: () => {
        setScrollStatus(1);
        console.log("ON ENTER BACK");
      },
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
              { opacity: 0, duration: 0.2 },
              { opacity: 1, duration: 0.2 }
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
              { opacity: 0, duration: 0.2 },
              { opacity: 1, duration: 0.2 }
            );
          },
        });
      },
    });
  }, []);

  const sectionStyle = {
    // width: "100%",W
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
        <div className="h-selection-one-left">
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
            background: "white",
            width: "100%",
            height: "100%",
            zIndex: -1,
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
              }}
            >
              Here is another headline
            </div>
            <div
              ref={textRightRef}
              style={{
                position: "absolute",
                left: "50%",
                top: "10%",
                fontSize: "2.5em",
              }}
            >
              A headline!
            </div>

            <div
              ref={textLeftRefTwo}
              style={{
                position: "absolute",
                right: "50%",
                fontSize: "2.5em",
                top: "40%",
              }}
            >
              Here is another headline
            </div>
            <div
              ref={textRightRefTwo}
              style={{
                position: "absolute",
                left: "50%",
                top: "30%",
                fontSize: "2.5em",
              }}
            >
              A headline!
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
              Here is another Low headline
            </div>
            <div
              ref={textRightRefThree}
              style={{
                position: "absolute",
                left: "50%",
                top: "60%",
                fontSize: "2.5em",
              }}
            >
              A Lower down headline!
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            backgroundSize: "contain",
            borderRadius: "10px",
            zIndex: 1,
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
          className="section-three"
          ref={wrapperRef}
        >
          <div
            className={`mid-img-test ${
              scrollStatus ? getScrollStyles[scrollStatus] : ""
            }`}
            ref={midImg}
          >
            <img
              // ref={midImg}
              alt="category image"
              src={imgSrc == 1 ? "/where-is-ai-used.jpg" : "/security-vr.avif"}
              className="mid-img-test-two" //${
              //   scrollStatus ? getScrollStyles[scrollStatus] : ""
              //   }`} //${imgSrc ? "img-opacity-change" : ""}
            />
          </div>
          {/* <img
            ref={midImg}
            alt="secoin 2-3 img"
            src={imgSrc == 1 ? "/where-is-ai-used.jpg" : "/security-vr.avif"}
            className={`mid-img-test ${
              scrollStatus ? getScrollStyles[scrollStatus] : ""
            } `} //${imgSrc ? "img-opacity-change" : ""}
            style={{
              // width: "50%",
              height: "400px",
              // position: "relative",
              // top: 0,
            }}
          /> */}
        </div>
      </div>
      <div
        style={{
          height: "70vh",
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
