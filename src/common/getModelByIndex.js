export const getModelByIndex = {
  0: "platform",
  1: "medicine",
  2: "taasia",
  3: "ai",
  4: "microsoft",
  5: "military",
  6: "customize",
  7: "security",
};

export const getLettersByModel = (modelIdx) => {
  if (!modelIdx || typeof modelIdx !== "number" || modelIdx == 0) {
    console.log("why we in here", typeof modelIdx);
    return;
  }
  //   console.log({ modelIdx });
  const modelByIndex = {
    0: "platform",
    1: "MEDICINE",
    2: "INDUSTRY",
    3: "ARTIFICAL INTELLIGENCE",
    4: "MICROSOFT",
    5: "MILITARY",
    6: "CUSTOMIZATION",
    7: "SECURITY",
  };

  return modelByIndex[modelIdx].split("");
};
