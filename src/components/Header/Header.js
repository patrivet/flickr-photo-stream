import "./Header.css";
import { Link } from "react-router-dom";

// Custom components
import { useAppContext } from "../../App";

const Header = () => {
  const { isDarkTheme, setIsDarkTheme } = useAppContext();

  const toggleTheme = () => {
    document.querySelector("body").classList.toggle("light-theme");
    setIsDarkTheme((currentTheme) => !currentTheme);
  };

  return (
    <>
      <div className="App__header">
        <img
          src="/Flickr-logo.svg"
          alt="flickr-logo"
          className="App__headerImg"
        />
        <h1>Flickr public photos feed</h1>
      </div>
      <Link to="/favourites">
        <button>Favs</button>
      </Link>
      <div className="App__themeMode" onClick={toggleTheme}>
        <img
          src={`${isDarkTheme ? "light" : "dark"}Theme.svg`}
          alt="theme-icon"
        />
      </div>
    </>
  );
};

export default Header;
