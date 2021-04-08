import { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import JSONP from "jsonp";

// Custom components
import PhotoList from "./components/PhotoList/PhotoList";
import TagFilter from "./components/TagFilter/TagFilter";
import Header from "./components/Header/Header";

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
  const [ready, setReady] = useState(false);
  const [tags, setTags] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Define context
  const context = {
    tags,
    setTags,
    isDarkTheme,
    setIsDarkTheme,
  };

  const fetchPhotos = () => {
    JSONP(url, HEADERS, (err, data) => {
      if (err) {
        console.log(`ERROR occured fetching url =${BASE_URL}. Error =`);
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
    <AppContext.Provider value={context}>
      <Header />
      {ready && (
        <>
          <TagFilter />
          <PhotoList photos={photos} />
        </>
      )}
      {!ready && <div>Loading...</div>}
    </AppContext.Provider>
  );
}

export default App;
