import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'register';
  if (mode !== 'login' && mode !== 'register') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }
  if(mode === 'login'){
  const data = await request.formData();
  const authData = {
    username: data.get('username'),
    password: data.get('password'),
  };

  const response = await fetch('http://127.0.0.1:8000/dj-rest-auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });
  if (response.status === 422 || response.status === 401) {
    
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  
  const resData = await response.json();
  
  const token = resData.key;
  console.log(token)
  localStorage.setItem('token', token);
  localStorage.setItem('owner', data.get('username'));
  const expiration = new Date()
  expiration.setHours(expiration.getHours()+1);
  localStorage.setItem('expiration', expiration.toISOString())
  return redirect('/');
  }
  if (mode === 'register'){
      const data = await request.formData();
      const authData = {
      username: data.get('username'),
      email: data.get('email'),
      password1: data.get('password1'),
      password2: data.get('password2'),
    };
    const response = await fetch('http://127.0.0.1:8000/dj-rest-auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData)
    })
    
    if (!response.ok) {
      throw json({ message: 'Could not authenticate user.' }, { status: 500 });
    }
    const response2 = await fetch('http://127.0.0.1:8000/dj-rest-auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.get('username'),
      password: data.get('password1')
    }),
  });
  if (response2.status === 422 || response2.status === 401) {
    
    return response2;
  }

  if (!response2.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  
  const resData = await response2.json();
  const token = resData.key;
  console.log(token)
  localStorage.setItem('token', token);
  localStorage.setItem('owner', data.get('username'));
  const expiration = new Date()
  expiration.setHours(expiration.getHours()+1);
  localStorage.setItem('expiration', expiration.toISOString())
  return redirect('/');
    }

  
  
}
