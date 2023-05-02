import PageContent from '../components/PageContent';
import { useState, useEffect } from 'react';
import Image from '../components/Image';
import classes from  './Home.module.css';

function FavPage() {
    const [fetchData, setFetchData] = useState([]);

    
 
    useEffect(() => {
      async function fetchData() {
    // Fetch the Payroll Data related to the logged in User
      const response = await fetch('http://127.0.0.1:8000/favorite?owner__username=' + localStorage.getItem('owner'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      const json = await response.json();
      const urlsToFetch = json.map(item => item.post_id);
      const additionalDataPromises = urlsToFetch.map(url => fetch(url).then(res => res.json()));
      const additionalData = await Promise.all(additionalDataPromises); // poczekaj na pobranie wszystkich danych
      setFetchData(additionalData);
      
  }
  fetchData()
  }, []);
  console.log(fetchData)
  
  return (
    <PageContent >
      <ul className={classes.grid_container}>
         {fetchData.map((movie) => (
           <li key={movie.pk}><Image pk={movie.pk} image={movie.image} title={movie.title}  className={classes.grid_item} /></li>
         ))}
       </ul>
    </PageContent>
  );
}

export default FavPage;