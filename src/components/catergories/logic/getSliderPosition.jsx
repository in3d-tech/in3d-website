export const getSliderPosition = (idx, numberOfSliders) => {
  const sliderPositions = {
    // [numberOfSliders - 5]: [-3.8, -3.8, -2.5],
    // [numberOfSliders - 4]: [3, -1.5, 0],
    [2]: [-3.8, -3.8, -2.5],
    [1]: [3, -1.5, 0],
    [0]: [0, 0, 0.8],
  };

  return sliderPositions[idx] || [-3.8, -7 - idx, -2.5];
};

// const sliderPositions = {
//   [numberOfSliders - 5]: [-3.8, -3.8, -2.5],
//   [numberOfSliders - 4]: [3, -1.5, 0],
//   [numberOfSliders - 3]: [0, 0, 0.8],
//   [numberOfSliders - 2]: [-5.1, 3.5, -3.6],
//   [numberOfSliders - 1]: [2.8, 4.5, -2],
// };
