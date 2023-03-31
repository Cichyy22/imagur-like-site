import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();

  const navigation = useNavigation() 
  const isSubmitting =navigation.state === 'submitting'

  const [SearchParams] = useSearchParams();
  const isLogin = SearchParams.get('mode') === 'login';
  
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Register'}</h1>
        {data && data.errors && <ul>  
            {Object.values(data.errors).map(error => <li key={error}>{error}</li>)}
          </ul>}
          {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" name="username" required />
        </p>
        {!isLogin && <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required/>
        </p>}
        {isLogin && <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>}
        {!isLogin && <p>
          <label htmlFor="password1">Repeat Password</label>
          <input id="password1" type="password" name="password1" required />
        </p>}
        {!isLogin && <p>
          <label htmlFor="password2">Repeat Password</label>
          <input id="password2" type="password" name="password2" required />
        </p>}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'register' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting..' : 'Auth'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;