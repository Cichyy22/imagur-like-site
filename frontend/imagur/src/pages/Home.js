import PageContent from '../components/PageContent';
import { useState, useEffect } from 'react';
import Image from '../components/Image';
import classes from  './Home.module.css';

function HomePage() {
    const [imageFetch, setImage] = useState([]);
    

    useEffect(() => {
    // Fetch the Payroll Data related to the logged in User
    fetch('http://127.0.0.1:8000/posts', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      });
      
  }, []);

    console.log(imageFetch);

  return (
    <PageContent >
      <ul className={classes.grid_container}>
         {imageFetch.map((movie) => (
           <li key={movie.pk}><Image pk={movie.pk} image={movie.image} title={movie.title}  className={classes.grid_item} /></li>
         ))}
       </ul>
    </PageContent>
  );
}

export default HomePage;
