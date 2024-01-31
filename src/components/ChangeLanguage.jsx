export function ChangeLanguage({
  setCurrentLanguage,
  changeLanguage,
  currentLanguage,
}) {
  const handleChangeLanguage = () => {
    console.log("inside handle-change");
    const newLanguage = currentLanguage === "en" ? "he" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
    setTimeout(
      () => console.log("OUR CURRENT LANFGUAGE: ", currentLanguage),
      5000
    );
  };
  return (
    <div
      style={{
        // width: "300px",
        height: "200px",
        position: "absolute",
        bottom: 0,
        zIndex: 5,
      }}
    >
      <img
        className="language-flag"
        alt="can"
        onClick={handleChangeLanguage}
        src="/assets/images/flag-canada.webp"
        style={{
          width: "40px",
          height: "40px",
          opacity: currentLanguage == "en" ? 1 : 0.4,
        }}
      />
      <img
        className="language-flag"
        alt="he"
        onClick={handleChangeLanguage}
        src="/assets/images/israel-flag.webp"
        style={{
          width: "40px",
          height: "40px",
          marginLeft: "10px",
          opacity: currentLanguage == "he" ? 1 : 0.4,
        }}
      />
    </div>
  );
}
