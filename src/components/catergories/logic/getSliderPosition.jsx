export const intervalSliderPositions = [
  [-2.35, -3.3, -3.3],
  [-1.1, -2.8, -3.18],

  [1.5, -2, -2.3],
  [3.3, -1.8, -1.2],

  [3.2, -1, 1],
  [1.5, -0.5, 1.8], // then 0

  [-1.5, 0.5, 1.7],
  [-2.8, 1, 0.8],

  [-4.6, 2.2, -1.7],
  [-5.2, 2.9, -2.9],

  [-3.7, 3.9, -4.5],
  [-2.4, 4.1, -4.95],

  [0.6, 4.6, -4.8],
  [1.8, 4.8, -3.8],

  [2.2, 5.33, -1.3],
  [1.6, 5.66, -0.63],

  [-0.3, 6.3, -0.2],
  [-1.8, 6.6, -0.2],
];

export const getSliderPosition = (idx, numberOfSliders) => {
  // console.log(idx);
  const sliderPositions = {
    // 9: [-3.8, -3.8, -3.2],
    2: [0, -2.3, -3], // position -2 (8 in order)
    1: [5, -1.5, 0], // [position -1 (7 in order)]
    0: [0, 0, 2.5], // position 0 (6 in order)
    // 5: [-4, 1.5, -0.5],
    // 4: [-5, 3.7, -4],
    // 3: [-1, 4.4, -5.2],
    // 2: [2.8, 5, -2.5],
    // 1: [1, 6, -0.2],
    // 0: [-3, 7, -0.2],
  };

  return sliderPositions[idx] || [-3.8, -7 - idx, -2.5];

  return (
    {
      position: sliderPositions[idx],
      prevPosition: sliderPositions[idx - 1] || sliderPositions[0],
    } || { position: [-3.8, -7 - idx, -2.5] }
  );
};
