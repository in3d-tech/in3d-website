export function SideText({ title, textSection }) {
  const text1 = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
  fringilla metus. Pellentesque egestas ut nisl vel auctor. Pellentesque
  habitant morbi tristique senectus et netus et malesuada fames ac turpis
  egestas. Pellentesque posuere augue massa, semper mattis mi ullamcorper
  non. Pellentesque commodo ex nisl, ac bibendum augue rutrum quis.`;
  const text2 = ` Aenean
  odio arcu, efficitur non scelerisque ut, porttitor ut neque. Nulla
  tortor purus, aliquam eget leo non, dignissim fringilla ex. Praesent
  fringilla imperdiet sollicitudin. Ut at sem vel diam blandit vulputate.
  Praesent quis arcu urna. Sed auctor mi nulla, ullamcorper iaculis orci
  accumsan eget. Maecenas pretium vestibulum elementum. Nam dictum diam
  vel sapien placerat tincidunt.`;
  const text3 = `Nullam vitae arcu orci. Pellentesque
  fermentum a quam eu ultricies. Phasellus ultrices facilisis orci, et
  consequat dolor lacinia accumsan. Sed mollis nisi vel elit interdum, ac
  tempor ex tincidunt.`;

  const getText = () => {
    console.log(textSection);
    switch (textSection) {
      case "scrollSection2":
        return text1;
      case "scrollSection3":
        return text2;
      case "scrollSection4":
        return text3;
      default:
        return "";
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "30%",
        position: "fixed",
        background: "black", //"rgb(52, 52, 49)",
        zIndex: 5000000,
        opacity: textSection == "unset" ? 0 : 1,
        animation: textSection == "unset" ? "fadeOut 0.5s" : "fadeIn 0.5s",
        display: "flex",
        // justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", top: "2em" }}>
        <h2
          className="h-scroll-text-section"
          style={{ fontSize: "5em", color: "white", fontFamily: "Gotham" }}
        >
          {textSection ? title : ""}
        </h2>
      </div>
      <div>
        <div
          style={{
            color: "white",
            padding: "20px",
            textAlign: "center",
            textJustify: "inter-word",
            fontSize: "2em",
            marginTop: "5em",
          }}
        >
          {textSection ? getText() : ""}
        </div>
      </div>
    </div>
  );
}
