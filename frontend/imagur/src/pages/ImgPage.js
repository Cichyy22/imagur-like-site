import PageContent from '../components/PageContent';
import { useState, useEffect } from 'react';
import './Home.css';

function ImgPage() {
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
       <img src={imageFetch.image} alt={imageFetch.title} />
    </PageContent>
  );
}

export default ImgPage;
