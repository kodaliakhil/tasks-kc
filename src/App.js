import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';

// import { ErrorBoundary } from "react-error-boundary";

// import Login from './components/Login';
import Header from './components/Header.js'
import { Home } from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
// import PrivateRoute from './components/PrivateRoute'
import Services from './components/Serivces'
import Projects from './components/Projects'
import Partners from './components/Partners'
import Profile from './components/Profile'
import Feedback from './components/Feedback'
import Careers from './components/Careers'
import Help from './components/Help'
// import ErrorPage from './components/ErrorPage.js'
// import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

// const router = createBrowserRouter(
//   [
//     {
//       path: "/login",
//       element: <Login />
//     },
//     {
//       path: "*",
//       element: <ErrorPage />
//     },
//     {
//       path: "/",
//       element: <PrivateRoute> <ErrorBoundary fallback={<ErrorPage />}> <Header /> </ErrorBoundary> </PrivateRoute>,
//       children: [
//         {
//           index: true,
//           element: <Home />,
//           loader: homeLoader
//         },
//         {
//           path: "contact",
//           element: <Contact />,
//         },
//         {
//           path: "about",
//           element: <About />,
//         },
//         {
//           path: "services",
//           element: <Services />,
//         },
//         {
//           path: "projects",
//           element: <Projects />,
//         },
//         {
//           path: "partners",
//           element: <Partners />,
//         },
//         {
//           path: "profile",
//           element: <Profile />
//         },
//         {
//           path: "feedback",
//           element: <Feedback />,
//         },
//         {
//           path: "careers",
//           element: <Careers />,
//         },
//         {
//           path: "help",
//           element: <Help />,
//         },
//       ]
//     },
//   ])

// const App = () => {

//   return (
//     <RouterProvider router={router} />
//   )
// }


// const App = () => (
//   <BrowserRouter > 
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="*" element={<ErrorPage />} />
//       <Route path="/" element={<PrivateRoute> <ErrorBoundary fallback={<ErrorPage />}> <Header /> </ErrorBoundary> </PrivateRoute>}>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="services" element={<Services />} />
//         <Route path="projects" element={<Projects />} />
//         <Route path="partners" element={<Partners />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="feedback" element={<Feedback />} />
//         <Route path="careers" element={<Careers />} />
//         <Route path="help" element={<Help />} />
//       </Route>
//     </Routes>

//   </BrowserRouter>

// )

const App = () => (
  // <BrowserRouter > 
    <Routes>
      
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="partners" element={<Partners />} />
        <Route path="profile" element={<Profile />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="careers" element={<Careers />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>

  // </BrowserRouter>

)

export default App;
