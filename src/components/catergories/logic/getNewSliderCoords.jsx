export function getNewSliderCoords(name, tl, slider, i = 0, numberOfSliders) {
  if (!tl.current) return;
  const position0 = { x: -3.8, y: -3.8, z: -2.5 };

  const position1 = { x: 3, y: -1.5, z: 0 };

  const position2 = { x: 0, y: 0, z: 0.8 };

  const position3 = { x: -5.1, y: 3.5, z: -3.6 };

  const position4 = { x: 2.8, y: 4.5, z: -2 };

  // here is functional code:

  function recursiveScroll(numberInOffScreenPosition) {
    if (numberInOffScreenPosition == 0) {
      return;
    }
    tl.current.to(
      slider.current.position,
      { x: -3.8, y: -3.8, z: -2.5 },
      ">" + 1
    );
    numberInOffScreenPosition = numberInOffScreenPosition - 1;
    recursiveScroll(numberInOffScreenPosition);
  }
  const duration = 1;

  if (Number(name) < 0) {
    tl.current
      .to(slider.current.position, { x: -3.8, y: -6.8, z: -2.5 }, ">")
      .to(slider.current.material, { visible: false, opacity: 0 }, ">");

    let numberInOffScreenPosition = Number(name * -1 - 1);
    recursiveScroll(numberInOffScreenPosition);

    // i = i - 100;
    tl.current
      .from(
        slider.current.material,
        { duration: 1, visible: false, opacity: 0 },
        ">"
      )

      .to(slider.current.position, { x: -3.8, y: -3.8, z: -2.5 }, ">")
      .to(slider.current.rotation, { y: 0, z: -0.2 }, "<")
      .to(slider.current.position, { x: 3, y: -1.5, z: 0 }, ">")
      .to(slider.current.rotation, { y: -1.5, z: Math.PI * 5 }, "<")
      .to(slider.current.position, { x: 0, y: 0, z: 0.8 }, ">")
      .to(slider.current.rotation, { y: 0, z: 0 }, "<")
      .to(slider.current.position, { x: -5.1, y: 3.5, z: -3.6 }, ">")
      .to(slider.current.rotation, { y: Math.PI * 1.2 * -1, z: -0.3 }, "<")
      .to(slider.current.material, { opacity: 0.3 }, "<")
      .to(slider.current.position, { x: 3.8, y: 3.5, z: -2 }, ">")
      .to(slider.current.rotation, { y: Math.PI / 1.6, z: -0.5 }, "<")
      .to(slider.current.position, { x: 1, y: 4, z: -0.2 }, ">")
      .to(slider.current.rotation, { y: Math.PI / 4, z: -0.5 }, "<")
      .to(slider.current.position, { x: -3, y: 6 }, ">");
  }

  if (name == 0) {
    console.log("0 baby");

    tl.current
      .to(slider.current.position, { x: 3, y: -1.5, z: 0 }, 2)
      .to(slider.current.rotation, { y: -1.5, z: Math.PI * 5 }, "<")
      .to(slider.current.position, { x: 0, y: 0, z: 0.8 }, ">")
      .to(slider.current.rotation, { y: 0, z: 0 }, "<")
      .to(slider.current.position, { x: -5.1, y: 3.5, z: -3.6 }, ">")
      .to(slider.current.rotation, { y: Math.PI * 1.2 * -1, z: -0.3 }, "<")
      .to(slider.current.material, { opacity: 0.3 }, "<")
      .to(slider.current.position, { x: 3.8, y: 3.5, z: -2 }, ">")
      .to(slider.current.rotation, { y: Math.PI / 1.6, z: -0.5 }, "<")
      .to(slider.current.position, { x: 1, y: 4, z: -0.2 }, ">")
      .to(slider.current.rotation, { y: Math.PI / 4, z: -0.5 }, "<")
      .to(slider.current.position, { x: -3, y: 6 }, ">");
  }
  if (name == 1) {
    console.log("1 baby");

    tl.current
      .to(slider.current.position, { x: 0, y: 0, z: 0.8 }, 2)
      .to(slider.current.rotation, { y: 0, z: 0 }, "<")
      .to(slider.current.position, { x: -5.1, y: 3.5, z: -3.6 }, ">")
      .to(slider.current.rotation, { y: Math.PI * 1.2 * -1, z: -0.3 }, "<")
      .to(slider.current.material, { opacity: 0.3 }, "<")
      .to(slider.current.position, { x: 3.8, y: 3.5, z: -2 }, ">")
      .to(slider.current.rotation, { y: Math.PI / 1.6, z: -0.5 }, "<")
      .to(slider.current.position, { x: 1, y: 4, z: -0.2 }, ">")
      .to(slider.current.rotation, { y: Math.PI / 4, z: -0.5 }, "<")
      .to(slider.current.position, { x: -3, y: 6 }, ">");
  }
  if (name == 2) {
    console.log("2 baby");
    tl.current
      .to(slider.current.position, { x: -5.1, y: 3.5, z: -3.6 }, 2)
      .to(slider.current.rotation, { y: Math.PI * 1.2 * -1, z: -0.3 }, "<")
      .to(slider.current.material, { opacity: 0.3 }, "<")
      .to(slider.current.position, { x: 3.8, y: 3.5, z: -2 }, ">")
      .to(slider.current.rotation, { y: Math.PI / 1.6, z: -0.5 }, "<")
      .to(slider.current.position, { x: 1, y: 4, z: -0.2 }, ">")
      .to(slider.current.rotation, { y: Math.PI / 4, z: -0.5 }, "<")
      .to(slider.current.position, { x: -3, y: 6 }, ">");
  }
}

// const position0 = () => {};

// const position1 = () => {};

// const position2 = () => {};

// const position3 = () => {};

// const position4 = () => {};
