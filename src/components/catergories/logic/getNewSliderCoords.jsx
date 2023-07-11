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
      .to(slider.current.position, { x: 0, y: 0, z: 2.5 }, 0)
      .to(slider.current.rotation, { y: 0, z: 0 }, "<")
      .to(slider.current.position, { x: -4, y: 1.5, z: -0.5 }, ">")
      .to(slider.current.rotation, { y: Math.PI * 1.2 * -1, z: -0.3 }, "<")
      .to(slider.current.material, { opacity: 0.3 }, "<")
      .to(slider.current.position, { x: -5, y: 3.7, z: -4 }, ">")
      .to(slider.current.rotation, { y: Math.PI / 1.6, z: -0.5 }, "<")
      .to(slider.current.position, { x: -1, y: 4.4, z: -5.2 }, ">")
      .to(slider.current.rotation, { y: Math.PI / 4, z: -0.5 }, "<")
      .to(slider.current.position, { x: 2.8, y: 5, z: -2.5 }, ">")
      .to(slider.current.position, { x: 1, y: 6, z: -0.2 }, ">")
      .to(slider.current.position, { x: -2, y: 8, z: -0.2 }, ">");
  }
  if (name == 2) {
    console.log("2 baby");
    tl.current

      .to(slider.current.position, { x: -1.5, y: 0.5, z: 1.7 }, ">")
      .to(slider.current.position, { x: -2.8, y: 1, z: 0.8 }, ">")

      // 1
      .to(slider.current.position, { x: -4, y: 1.5, z: -0.5 }, ">")
      // .to(slider.current.rotation, { y: Math.PI * 1.2 * -1, z: -0.3 }, "<")
      .to(slider.current.material, { opacity: 0.3 }, "<")

      .to(slider.current.position, { x: -4.6, y: 2.2, z: -1.7 }, ">")
      .to(slider.current.position, { x: -5.2, y: 2.9, z: -2.9 }, ">")

      // 2
      .to(slider.current.position, { x: -5, y: 3.7, z: -5 }, ">")
      // .to(slider.current.rotation, { y: Math.PI / 1.6, z: -0.5 }, "<")

      .to(slider.current.position, { x: -3.7, y: 3.9, z: -4.5 }, ">")
      .to(slider.current.position, { x: -2.4, y: 4.1, z: -4.95 }, ">")

      //3
      .to(slider.current.position, { x: -1, y: 4.4, z: -5.2 }, ">")
      // .to(slider.current.rotation, { y: Math.PI / 4, z: -0.5 }, "<")

      .to(slider.current.position, { x: 0.6, y: 4.7, z: -4.8 }, ">")
      .to(slider.current.position, { x: 1.8, y: 4.8, z: -3.8 }, ">")

      //4
      .to(slider.current.position, { x: 2.8, y: 5, z: -2.5 }, ">")

      .to(slider.current.position, { x: 2.2, y: 6.3, z: 0.2 }, ">")
      .to(slider.current.position, { x: 1.6, y: 6.6, z: 0.2 }, ">")

      //5
      .to(slider.current.position, { x: 1, y: 6, z: -0.2 }, ">")
      //6
      .to(slider.current.position, { x: -2, y: 8, z: -0.2 }, ">");
    // .to(slider.current.position, { x: 2, y: 9, z: -2.5 }, ">"); // jump upwards
  }
}

// const position0 = () => {};

// const position1 = () => {};

// const position2 = () => {};

// const position3 = () => {};

// const position4 = () => {};
