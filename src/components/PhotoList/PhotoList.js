import './PhotoList.css'
import Photo from '../Photo/Photo';

const PhotoList = ({photos}) => {
  return (
    <div className="photoList">
      {photos.map( (photo) => {
        return <Photo photo={photo} key={photo.link}/>
      })}
    </div>
  )
}

export default PhotoList;
