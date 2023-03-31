import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage, {
  action as authAction,
} from './pages/Auth';
import { checkAuthLoader, tokenLoader } from './util/auth';
import "./App.css";
import {action as logoutAction} from './pages/logout'
import FavPage from './pages/Favourites';
import AddPage, {action as postAction} from './pages/NewImg';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <LoginPage />, action: authAction },
      { path: 'logout',action: logoutAction},
      { path: 'fav', element: <FavPage />, loader: checkAuthLoader,},
      { path: 'add', element: <AddPage />, loader: checkAuthLoader, action: postAction},

      // {
      //   path: 'events',
      //   element: <EventsRootLayout />,
      //   children: [
      //     {
      //       index: true,
      //       element: <EventsPage />,
      //       loader: eventsLoader,
      //     },
      //     {
      //       path: ':eventId',
      //       id: 'event-detail',
      //       loader: eventDetailLoader,
      //       children: [
      //         {
      //           index: true,
      //           element: <EventDetailPage />,
      //           action: deleteEventAction,
      //         },
      //         {
      //           path: 'edit',
      //           element: <EditEventPage />,
      //           action: manipulateEventAction,
      //           loader: checkAuthLoader,
      //         },
      //       ],
      //     },
      //     {
      //       path: 'new',
      //       element: <NewEventPage />,
      //       action: manipulateEventAction,
      //       loader: checkAuthLoader,
      //     },
      //   ],
      // },
      // {
      //   path: 'logout',
      //   action: logoutAction,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// function App() {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     // Fetch the Payroll Data related to the logged in User
//     fetch(`http://127.0.0.1:8000/posts`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setMovies(data);
//       });
//   }, []);

//   console.log(movies);

//   // let im = 'data:image/png;base64,' + movies[1].image

//   return (
//     <div className="App">
//       {/* <ul>
//         {movies.map((movie) => (
//           <li key={movie.id}><img src={`data:image/jpeg;base64,${movie.image}`} alt='Banana'/></li>
//         ))}
//       </ul> */}
//       <AuthenticationPage/>
//     </div>
//   );
// }

export default App;
