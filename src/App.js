import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux'

import { CSpinner } from '@coreui/react'
import './scss/style.scss'

// Containers
const NavBar = React.lazy(() => import('./include/navbar'))
const Footer = React.lazy(() => import('./include/Footer'))
const Signin = React.lazy(() => import('./pages/signin'))
const Signup = React.lazy(() => import('./pages/signup'))
const Onboarding = React.lazy(() => import('./pages/onboarding'))
const ContactUs = React.lazy(() => import('./pages/contact_us'))
const RequestDemo = React.lazy(() => import('./pages/request_demo'))
const LandingPage = React.lazy(() => import('./landing-page/LandingPage'))
const DashboardLayout = React.lazy(() => import('./layout/DashboardLayout'))

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Main />
      </Suspense>
    </BrowserRouter>
  )
}

const Main = () => {
  const location = useLocation();
  const noFooterPaths = ['/login', '/signup', '/dashboard', "/onboarding"];
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <>
      {location.pathname !== '/dashboard' && location.pathname !== '/onboarding' && <NavBar />}

      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<LandingPage />} />
        <Route exact path="login" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/onboarding" element={isAuthenticated ? <Onboarding /> : <Navigate to="/login" />} />
        <Route exact path="/contact" element={<ContactUs />} />
        <Route exact path="/dashboard" element={<DashboardLayout />} />
        <Route exact path="/request-demo" element={<RequestDemo />} />
        {/* <Route exact path="/dashboard" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} /> */}
        <Route path="*" element={<Page404 />} />

      </Routes>

      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
