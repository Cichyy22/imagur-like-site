function Image(props) {
    return (
      <div >
        <img src={`data:image/png;base64, ${props.image}`} alt={props.title} />
      </div>
    );
  }
  
  export default Image;