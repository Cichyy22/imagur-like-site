import PageContent from '../components/PageContent';
import { useState, useEffect } from 'react';
import Image from '../components/Image';
import './Home.css';

function FavPage() {
    const [fetchData, setFetchData] = useState([]);
    // const [imageFetch, setImage] = useState([]);

    useEffect(() => {
    // Fetch the Payroll Data related to the logged in User
    fetch('http://127.0.0.1:8000/favorite', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFetchData(data);
      });
      
  }, []);
    const data = fetchData.filter( fav => fav.owner === localStorage.getItem('owner'))
    console.log(data);
    
    
  return (
    <PageContent >
      {/* <div className="grid-container"> */}
      <ul className="grid-container">
         {fetchData.map((movie) => (
           <li key={movie.pk}><Image image={movie.image} title={movie.title}  className="grid-item" /></li>
         ))}
       </ul>
       {/* </div> */}
    </PageContent>
  );
}

export default FavPage;