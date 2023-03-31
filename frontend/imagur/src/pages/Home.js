import PageContent from '../components/PageContent';
import { useState, useEffect } from 'react';
import Image from '../components/Image';
import './Home.css';

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
      {/* <div className="grid-container"> */}
      <ul className="grid-container">
         {imageFetch.map((movie) => (
           <li key={movie.pk}><Image image={movie.image} title={movie.title}  className="grid-item" /></li>
         ))}
       </ul>
       {/* </div> */}
    </PageContent>
  );
}

export default HomePage;
