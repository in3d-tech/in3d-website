import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ScrollSection({ setSelectedContent, setTextSection }) {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollSection2 = useRef(null);
  const scrollSection3 = useRef(null);
  const scrollSection4 = useRef(null);

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
        console.log("is 4");

        setTextSection("scrollSection4");
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

  useEffect(() => {
    // ScrollTrigger.create({
    //   trigger: scrollSection4.current,
    //   start: "top top",
    //   end: "bottom bottom",
    //   onEnter: () => console.log("we enterrrrred!!!!"),
    // });

    // Create GSAP animation instance for section 2
    ScrollTrigger.create({
      trigger: scrollSection2.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        console.log("Entered section 2");
        setTextSection("scrollSection2");
      },
      onLeave: () => {
        console.log("Leaved section 2");
        setTextSection("unset");
      },
    });

    // Create GSAP animation instance for section 3
    ScrollTrigger.create({
      trigger: scrollSection3.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        console.log("Entered section 3");
        setTextSection("scrollSection3");
      },
      onLeave: () => {
        console.log("Leaved section 3");
        setTextSection("unset");
      },
    });

    // Create GSAP animation instance for section 4
    ScrollTrigger.create({
      trigger: scrollSection4.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        console.log("Entered section 4");
        setTextSection("scrollSection4");
      },
      onLeave: () => {
        console.log("Leaved section 4");
        setTextSection("unset");
      },
    });

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
      // ScrollTrigger.getById("scrollSection2").kill();
      // ScrollTrigger.getById("scrollSection3").kill();
      // ScrollTrigger.getById("scrollSection4").kill();
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
              background: 'url("/med-temp-img.png")',
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
            ref={scrollSection2}
          >
            {/* <h3>Section 2</h3> */}
            <img className="scroll-image" src="/microsoft-ar.png" />
          </div>
          <div
            className="scroll-section"
            style={{ background: 'url("/security_two.jpg")' }}
            ref={scrollSection3}
          >
            {/* <h3>Section 3</h3> */}
            <img className="scroll-image" src="/security_two.jpg" />
          </div>
          <div
            className="scroll-section"
            style={{ background: 'url("/another-med.jpg")' }}
            ref={scrollSection4}
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
