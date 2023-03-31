import { json, redirect } from 'react-router-dom';
import AddForm from '../components/AddForm';


function AddPage() {
  
    return <AddForm/>; 
  }

  export default AddPage;


  export async function action({ request }) { 
    const data = await request.formData();
    // const file = fileToBase64(data.get('file'))
    console.log(data)
    const postData = { 
      title: data.get('title'),
      image: data.get('base64File'),
      token: localStorage.getItem('token'),
      owner: localStorage.getItem('name')
    };
    console.log(postData)
    const response = await fetch('http://127.0.0.1:8000/posts', {
      method: 'POST',
      headers: {
        "X-CSRFToken": localStorage.getItem('token'),
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData),
    });
    if (response.status === 422 || response.status === 401) {
      
      return response;
    }
  
    if (!response.ok) {
      throw json({ message: 'Could not add image.' }, { status: 500 });
    }
  
    
    const resData = await response.json();
    console.log(resData)
    return redirect('/');
  }
  