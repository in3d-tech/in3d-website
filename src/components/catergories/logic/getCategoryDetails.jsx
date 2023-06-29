export function getCategoryDetails(name) {
  const details = {
    רפואה: { color: "green" },
    "תעשייה ביטחונית": { color: "white" },
    תעשייה: { color: "black" },
    מייקרוסופט: { color: "red" },
    "גופי ביטחון": { color: "blue" },
    Customize: { color: "#FFA500" },
  };

  return details[name];
}
