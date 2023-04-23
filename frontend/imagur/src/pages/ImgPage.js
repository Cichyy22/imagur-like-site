import PageContent from '../components/PageContent';
import { useState, useEffect } from 'react';
import './Home.css';
import { useParams} from "react-router-dom";

function ImgPage() {
    const [imageFetch, setImage] = useState([]);
    const params = useParams()
    useEffect(() => {
    fetch('http://127.0.0.1:8000/posts/' + params.imgId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      });
  }, [params]);


  return (
    <PageContent >
       <img src={imageFetch.image} alt={imageFetch.title} />
    </PageContent>
  );
}

export default ImgPage;
