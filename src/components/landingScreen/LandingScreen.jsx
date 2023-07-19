import { NavOpen } from "../NavbarOld";

export function LandingComponent({
  setIsLanding,
  setSelectedNav,
  setCategorySelected,
}) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [newClass, setNewClass] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const btnRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 5000); // Adjust the duration as needed

    return () => clearTimeout(timeout);
  }, []);

  const toggleNavbar = () => {
    console.log({ newClass });
    setNewClass((prevState) => !prevState);

    setTimeout(
      () => setNavOpen((prevState) => !prevState),
      navOpen ? 100 : 800
    );
  };

  const handleNavClick = (ref, label) => {
    setSelectedNav(label);
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    setCategorySelected(label);
  };

  return navOpen ? (
    <NavOpen handleNavClick={handleNavClick} toggleNavbar={toggleNavbar} />
  ) : (
    <div className="landing-screen-wrapper">
      <div
        className={
          newClass ? "landing-screen-nav-open" : "landing-screen-nav-btn"
        }
        onClick={() => {
          // setNewClass((prevState) => !prevState);

          toggleNavbar();
        }}
      >
        Quick Explore
      </div>
      <div
        onClick={() => startTransition(() => setIsLanding(false))}
        className={`enter-btn`}
      >
        <img src="../img/in3dlogo.png" />
        {/* <div className="landing-screen-enter-btn">
            <a className="link-btn" href="#" ref={btnRef}>
              <i className="link-smtng"></i>
              <i className="link-smtng"></i>
              <span className="link-span">Explore</span>
            </a>
          </div> */}
      </div>
      <div className="animation-container">
        <span className="animation-letter">I</span>
        <span className="animation-letter">n</span>
        <span className="animation-letter">3</span>
        <span className="animation-letter">D</span>
        <span className="animation-letter">-</span>
        <span className="animation-letter">T</span>
        <span className="animation-letter">e</span>
        <span className="animation-letter">c</span>
        <span className="animation-letter">h</span>
      </div>
    </div>
  );
}
