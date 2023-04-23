import PageContent from '../components/PageContent';
import { useState, useEffect, useCallback } from 'react';
import Image from '../components/Image';
import './Home.css';

function FavPage() {
    const [fetchData, setFetchData] = useState([]);
    const [imageFetch, setImage] = useState([]);

    
 
    useEffect(() => {
    // Fetch the Payroll Data related to the logged in User
    fetch('http://127.0.0.1:8000/favorite?owner_username=Ad', {
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
  // const fav = fetchData.filter( fav => fav.owner === localStorage.getItem('owner'))
  // const urls = fav.map(a => a.post_id);
  console.log(fetchData)
  return (
    <PageContent >
      {/* <div className="grid-container"> */}
      {/* <ul className="grid-container">
         {imageFetch.map((movie) => (
           <li key={movie.pk}><Image image={movie.image} title={movie.title}  className="grid-item" /></li>
         ))}
       </ul> */}
       {/* </div> */}
    </PageContent>
  );
}

export default FavPage;