import { getModelByIndex } from "../../../common/getModelByIndex";

export function getCategoryDetails(modelIdx) {
  const seletedContent = getModelByIndex[modelIdx];

  const details = {
    medicine: {
      title: "Medicine",
      texts: [
        "remoteSupportMedicine",
        "tutorials",
        "supportForPerformingAnalysis",
        "leaningPracticeExamination",
        "simulatorsMedicine",
        "digitalTwinsMedicine",
        "safetyMedicine",
        "aidInSurgeryPrep",
      ],
    },
    taasia: {
      title: "Industry",
      texts: [
        "remoteSupportIntel",
        "remoteTraining",
        "implementationSupport",
        "fortificationPlanningAndSupport",
        "engineeringControl",
        "learningPracticeExamination",
        "simulators",
        "environemtn",
        "maintenanceSupportsExecution",
        "digitalTwinsSmartWarehous",
        "safety",
        "logisticsManagment",
      ],
    },
    ai: {
      title: "Artifical Intelligence",
      texts: [
        "remoteSupportMedicine",
        "tutorials",
        "supportForPerformingAnalysis",
        "leaningPracticeExamination",
        "simulatorsMedicine",
        "digitalTwinsMedicine",
        "safetyMedicine",
        "aidInSurgeryPrep",
      ],
    },
    microsoft: {},
    military: {},
    customize: {},
    security: {},
  };

  // const details = {
  //   רפואה: { color: "green" },
  //   "תעשייה ביטחונית": { color: "white" },
  //   תעשייה: { color: "black" },
  //   מייקרוסופט: { color: "red" },
  //   "גופי ביטחון": { color: "blue" },
  //   Customize: { color: "#FFA500" },
  // };

  return details[seletedContent];
}
