import "./Photo.css";
const FLICKR_BASE_URL = "https://www.flickr.com/photos"; // fix me - move to config file.
// const { htmlToText } = require("html-to-text");

const Photo = ({ photo }) => {
  const authorUrl = `${FLICKR_BASE_URL}/${photo.author_id}`;
  const authorName = photo.author.split('"')[1];

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
    </div>
  );
};

export default Photo;
