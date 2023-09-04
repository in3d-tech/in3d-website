export function SideText({ title, textSection }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "30%",
        position: "fixed",
        background: "rgb(52, 52, 49)",
        zIndex: 5000000,
        opacity: textSection == "unset" ? 0 : 1,
        animation: textSection == "unset" ? "fadeOut 0.5s" : "fadeIn 0.5s",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontSize: "4em", color: "white", fontFamily: "Gotham" }}>
        {title}
      </h2>

      <div
        style={{
          color: "white",
          padding: "20px",
          textAlign: "justify",
          textJustify: "inter-word",
          fontSize: "1.3em",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
        fringilla metus. Pellentesque egestas ut nisl vel auctor. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Pellentesque posuere augue massa, semper mattis mi ullamcorper
        non. Pellentesque commodo ex nisl, ac bibendum augue rutrum quis. Aenean
        odio arcu, efficitur non scelerisque ut, porttitor ut neque. Nulla
        tortor purus, aliquam eget leo non, dignissim fringilla ex. Praesent
        fringilla imperdiet sollicitudin. Ut at sem vel diam blandit vulputate.
        Praesent quis arcu urna. Sed auctor mi nulla, ullamcorper iaculis orci
        accumsan eget. Maecenas pretium vestibulum elementum. Nam dictum diam
        vel sapien placerat tincidunt. Nullam vitae arcu orci. Pellentesque
        fermentum a quam eu ultricies. Phasellus ultrices facilisis orci, et
        consequat dolor lacinia accumsan. Sed mollis nisi vel elit interdum, ac
        tempor ex tincidunt.
      </div>
    </div>
  );
}
