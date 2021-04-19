import { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import JSONP from "jsonp";

// Custom components
import PhotoList from "./components/PhotoList/PhotoList";
import TagFilter from "./components/TagFilter/TagFilter";
import Header from "./components/Header/Header";
import Spinner from "./components/Spinner/Spinner";

const BASE_URL =
  "https://api.flickr.com/services/feeds/photos_public.gne?&format=json";
const HEADERS = {
  param: "jsoncallback",
};
let url = BASE_URL;

// App Context setup
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

function App() {
  const [photos, setPhotos] = useState([]);
  const [favPhotos, setFavPhotos] = useState([]);
  const [ready, setReady] = useState(false);
  const [tags, setTags] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Define context
  const context = {
    tags,
    setTags,
    isDarkTheme,
    setIsDarkTheme,
    setFavPhotos,
    favPhotos,
  };

  const fetchPhotos = () => {
    JSONP(url, HEADERS, (err, data) => {
      if (err) {
        console.log(`ERROR occured fetching url =${url}. Error =`);
        console.log(err);
      } else {
        setPhotos(data.items);
        setReady(true);
      }
    });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    // Update flickr url & fetch
    url = BASE_URL;
    if (tags) {
      url += `&tags=${tags.toString()}`;
    }
    fetchPhotos();
  }, [tags]);

  return (
    <BrowserRouter>
      <AppContext.Provider value={context}>
      <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                {ready && (
                  <>
                    <TagFilter />
                    <PhotoList photos={photos} />
                  </>
                )}
                {!ready && <Spinner />}
              </>
            )}
          />
          <Route
            path="/favourites"
            render={() => (
              <>
                <PhotoList photos={favPhotos} />
              </>
            )}
          />
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
