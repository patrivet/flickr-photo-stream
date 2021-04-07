import { useState, useEffect } from 'react';
import './App.css';
import JSONP from "jsonp";

// Custom components
import PhotoList from './components/PhotoList/PhotoList';

const BASE_URL = 'https://api.flickr.com/services/feeds/photos_public.gne?&format=json&lang=en-us&tags=safe';
const HEADERS = {
  "param": "jsoncallback"
}

function App() {
  const [photos, setPhotos] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    JSONP(BASE_URL, HEADERS, (err, data) => {
      if (err) {
        console.log(`ERROR occured fetching url =${BASE_URL}. Error =`);
        console.log(err);
      } else {
        setPhotos(data.items);
        setReady(true);
      }
    });

  }, []);

  return (
    <div className="App">
      {ready && <PhotoList photos={photos}/>}
      {!ready && <div>Loading...</div>}
    </div>
  );
}

export default App;
