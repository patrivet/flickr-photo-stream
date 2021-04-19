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

  const showingFavs = window.location.pathname.indexOf("favourites") !== -1;
  const linkTo = showingFavs ? "/" : "/favourites";
  const buttonText = showingFavs ? "Hide Favourites" : "Show Favourites";

  return (
    <>
      <div className="header">
        <img src="/Flickr-logo.svg" alt="flickr-logo" className="header__img" />
        <h1>Flickr public photos feed</h1>
      </div>
      <div className="header__icons" onClick={toggleTheme}>
        <Link to={linkTo}>
          <button>{buttonText}</button>
        </Link>
        <img
          src={`${isDarkTheme ? "light" : "dark"}Theme.svg`}
          alt="theme-icon"
        />
      </div>
    </>
  );
};

export default Header;
