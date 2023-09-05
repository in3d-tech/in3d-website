import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ScrollSection({ setSelectedContent, setTextSection }) {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
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
          },
          onLeaveBack: () => setTextSection("unset"),
          onLeave: () => setTextSection("unset"),
          onEnterBack: () => setTextSection(true),
        },
      }
    );
    return () => {
      {
        /* A return function for killing the animation on component unmount */
      }
      pin.kill();
    };
  }, []);

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
              }}
              ref={innerRef}
            ></div>
            <div
              style={{
                height: "100%",
                width: "600px",
                border: "2px solid green",
              }}
            ></div>
            <img className="scroll-image" src="/med-temp-img.png" />
          </div>
          <div
            className="scroll-section"
            style={{ background: 'url("/microsoft-ar.png")' }}
          >
            {/* <h3>Section 2</h3> */}
            <img className="scroll-image" src="/microsoft-ar.png" />
          </div>
          <div
            className="scroll-section"
            style={{ background: 'url("/security_two.jpg")' }}
          >
            {/* <h3>Section 3</h3> */}
            <img className="scroll-image" src="/security_two.jpg" />
          </div>
          <div
            className="scroll-section"
            style={{ background: 'url("/another-med.jpg")' }}
          >
            {/* <h3>Section 4</h3> */}
            <img className="scroll-image" src="/another-med.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScrollSection;
