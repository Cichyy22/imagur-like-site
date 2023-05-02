import { Form, NavLink, useLoaderData } from 'react-router-dom';


import classes from './MainNavigation.module.css';

function MainNavigation() {
  const token = useLoaderData('root')
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {token && <li>
            <NavLink
              to="/fav"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Favourite
            </NavLink>
          </li>}
          {token && <li>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Add post
            </NavLink>
          </li>}
          {!token && <li>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Auth
            </NavLink>
          </li>}
          {token && <li>
            <Form action='/logout' method='post'>
              <button >Logout</button>
            </Form>
          </li>}
        </ul> 
      </nav>
    </header>
  );
}

export default MainNavigation;
