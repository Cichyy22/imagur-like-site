
import classes from './Image.module.css';
function Image(props) {
    return (
      <div >
        <img src={props.image} alt={props.title} />
      </div>
    );
  }
  
  export default Image;