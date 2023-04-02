
import { NavLink } from 'react-router-dom';
import classes from './Image.module.css';
function Image(props) {
    return (
      <div >
        <NavLink
              to={`/post/${props.pk}`}
            ><img src={props.image} alt={props.title} /></NavLink>
      </div>
    );
  }
  
  export default Image;