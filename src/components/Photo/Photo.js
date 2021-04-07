import './Photo.css'
const FLICKR_BASE_URL = 'https://www.flickr.com/photos'; // fix me - move to config file.
// const { htmlToText } = require("html-to-text");

const Photo = ({photo}) => {
  const authorUrl = `${FLICKR_BASE_URL}/${photo.author_id}`;
  const authorName = photo.author.split('"')[1];

  return (
    <div className="photo">
      <a href={photo.link}><img className="photo__img" alt={photo.title} src={photo.media.m}/></a>
      <p className="photo__title photo--link"><a href={photo.link}>{photo.title}</a> by <a href={authorUrl}>{authorName}</a></p>
      <p className="photo__description">Description: {photo.title}</p>
      <p className="photo__tags">Tags: {photo.tags.split(' ').join(", ")}</p>
    </div>
  )
}

export default Photo;
