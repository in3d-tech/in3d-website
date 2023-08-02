import { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalSelectedContent({
  selectedContent,
  setSelectedContent,
  title,
}) {
  const [showContent, setShowContent] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!showContent) setShowContent("active");
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    gsap.fromTo(
      el,
      { x: 0 },
      {
        x: 400,
        duration: 4,
        scrollTrigger: {
          trigger: el,
          start: "top center",
        },
      }
    );
  });

  const sectionStyle = {
    // width: "100%",
    height: "100vh",
  };

  // const tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".square-scroll",
  //   },
  // });
  // tl.to(".square-scroll", {
  //   x: 500,
  //   duration: 2,
  //   // scrollTrigger: {
  //   //   trigger: ".square-scroll",
  //   //   start: "top center",
  //   //   toggleActions: "restart none none none",
  //   // },
  // })
  //   .to(".square-scroll", {
  //     y: 300,
  //     duration: 3,
  //   })
  //   .to(".square-scroll", { x: 0, duration: 2 });

  // ScrollTrigger.create({
  //   trigger: ".square-scroll",
  //   start: "top center",
  //   toggleClass: "square-yellow",
  // });

  // ScrollTrigger.create({
  //   trigger: ".m-wrapper",
  //   start: "top center",
  //   toggleClass: "very-visible",
  // });

  return (
    <div
      className={`h-selected-nav ${showContent == "active" ? "active" : ""}`}
    >
      <div>
        <CloseIcon
          className="nav-close-icon"
          sx={{
            color: "black",
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
      {/* <h1 onClick={() => setSelectedContent(false)}>HEllo world!@</h1> */}
      {/* <div style={{ height: "300vh", overflow: "hidden", width: "90vw" }}> */}
      <div
        name="section1"
        style={{ ...sectionStyle, backgroundColor: "red", opacity: 0.8 }}
      >
        <div style={{ color: "white", fontSize: "3em" }}>{title}</div>
      </div>

      <div
        name="section2"
        style={{ ...sectionStyle, backgroundColor: "green", opacity: 0.8 }}
      >
        <div>Section Two</div>
        <div className="square-scroll"></div>

        <div className="text-with-animation">Hello world!</div>
        <div ref={wrapperRef} className="m-wrapper">
          <div className="wrapper four">
            <div className="type">
              <h3 className="typing">TYPING EFFECT????</h3>
            </div>
          </div>
        </div>
      </div>

      <div
        name="section3"
        style={{ ...sectionStyle, backgroundColor: "blue", opacity: 0.8 }}
      >
        <div>Section Three</div>
      </div>
      {/* </div> */}
    </div>
  );
}
