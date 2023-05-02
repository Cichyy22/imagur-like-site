import PageContent from '../components/PageContent';
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom"
import classes from './ImgPage.module.css'
import { json, useLoaderData } from 'react-router-dom';
import Cookies from 'js-cookie';

function ImgPage() {
    const token = useLoaderData('root')
    const [imageFetch, setImage] = useState([]);
    const [like, setLike] = useState();
    const [isLike, setIsLike] = useState(false);
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
        setLike(data.favorites.length)
      });
  }, [params]);

  async function addLike(){

    const postData = { 
      post_id: imageFetch.url
    };
    console.log(postData)
    if(!isLike){ 
      const response = await fetch('http://127.0.0.1:8000/favorite', {
      method: "POST",
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token'),
        "X-CSRFToken": Cookies.get('csrftoken'),
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
    if (response.status === 422 || response.status === 401) {
      
      return response;
    }
  
    if (!response.ok) {
      throw json({ message: 'Could not add like.' }, { status: 500 });
    }
  
    setIsLike(true)
    const resData = await response.json();
    console.log(resData)
  
  }
    else{
      setIsLike(false)
    
    }
  }
    
  return (
    <PageContent >
      <h2>{imageFetch.title}</h2>
      <div className={classes.image_container}>
        <img src={imageFetch.image} alt={imageFetch.title} />
        <div className={classes.actions}>
            {token && <button className={classes.like} style={{
          backgroundColor: isLike ? 'DarkSeaGreen' : '',
          color: isLike ? 'white' : '',
        }} onClick={addLike}>Polub</button>}
            <span className={classes.likes_count}>{like} polubień</span>
        </div>
      </div>
    </PageContent>
  );
}

export default ImgPage;
