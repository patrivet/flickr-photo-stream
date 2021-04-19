import "./Photo.css";
import { useState } from "react";
import { useAppContext } from "../../App";

const FLICKR_BASE_URL = "https://www.flickr.com/photos"; // fix me - move to config file.

const Photo = ({ photo }) => {
  const authorUrl = `${FLICKR_BASE_URL}/${photo.author_id}`;
  const authorName = photo.author.split('"')[1];
  const { setFavPhotos } = useAppContext();
  const [isFav, setIsFav] = useState();

  const addAsFav = (photo) => {
    photo.favourite = true;
    setIsFav(true);
    setFavPhotos((existingFavs) => {
      return [...existingFavs, photo];
    });
  };

  const removeAsFav = (photo) => {
    photo.favourite = false;
    setIsFav(false);
    setFavPhotos((existingFavs) => {
      const copy = existingFavs;
      const photoIndex = copy.findIndex(
        (photoMember) => photoMember.link === photo.link
      );
      if (photoIndex < 0) {
        console.log(existingFavs);
        return existingFavs;
      }
      copy.splice(photoIndex, 1);
      return copy;
    });
  };

  return (
    <div className="photo">
      <a href={photo.link}>
        <img
          className="photo__img"
          loading="lazy"
          alt={photo.title}
          src={photo.media.m}
        />
      </a>
      <div>
        <a className="photo__title" href={photo.link}>
          {photo.title}
        </a>{" "}
        by{" "}
        <a className="photo__author" href={authorUrl}>
          {authorName}
        </a>
      </div>
      <p className="photo__description">Description: {photo.title}</p>
      <p className="photo__tags">Tags: {photo.tags.split(" ").join(", ")}</p>
      {isFav ? (
        <button
          onClick={() => {
            removeAsFav(photo);
          }}
        >
          Remove as Favourite
        </button>
      ) : (
        <button
          onClick={() => {
            addAsFav(photo);
          }}
        >
          Add as Favourite
        </button>
      )}
    </div>
  );
};

export default Photo;
