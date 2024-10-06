import React, { Suspense } from "react"
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom"
// import { useSelector } from 'react-redux'

import { CSpinner } from "@coreui/react"
import "./scss/style.scss"
import DataConnect from "./views/data_connect/DataConnect"
// import DataSourceTable from './views/data_connect/DataSourceTable';
import { GoogleOAuthProvider } from "@react-oauth/google"
import DataFusion from "./pages/DataFusion"
import Press from "./pages/Press"
import Pricing from "./pages/Pricing"
import OurTeam from "./pages/OurTeam"
// import ChatWindow from "./views/api/components/ChatWindow"
// import Apps from "../src/views/api/App"

// Lazy-loaded components
const NavBar = React.lazy(() => import("./include/navbar"))
const Footer = React.lazy(() => import("./include/Footer"))
const Signin = React.lazy(() => import("./pages/auth/Signin"))
const Signup = React.lazy(() => import("./pages/auth/Signup"))
const Onboarding = React.lazy(() => import("./pages/onboarding"))
const ContactUs = React.lazy(() => import("./pages/contact_us"))
const RequestDemo = React.lazy(() => import("./pages/request_demo"))
const LandingPage = React.lazy(() => import("./landing-page/LandingPage"))
const DashboardLayout = React.lazy(() => import("./views/dashboard/DashboardLayout"))
const Chart = React.lazy(() => import("./views/dashboard/Chart"))
const Query = React.lazy(() => import("./views/query/Query"))
const TableList = React.lazy(() => import("./views/data_connect/TableList"))
const QueryPage = React.lazy(() => import("./views/query/QueryPage"))
const VisualQueryPage = React.lazy(() => import("./views/query/VisualQueryPage"))
const ProtectedRoute = React.lazy(() => import("./pages/ProtectedRoute"))
const SubscriptionPage = React.lazy(() => import("./views/subscription/SubscriptionPage"))
const FinsightPro = React.lazy(() => import("./pages/DataFusion"))
const Crm = React.lazy(() => import("./pages/Crm"))
const FPAPowerbyML_AI = React.lazy(() => import("./pages/FP&APowerbyML_AI"))
const MagicExcel = React.lazy(() => import("./pages/MagicExcel"))

// Pages
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"))

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
    const location = useLocation()
    const isAuthenticated = !!localStorage.getItem("access_token")

    const isDashboardPath = location.pathname.startsWith("/dashboard")
    const noNavBarPaths = ["/login", "/signup", "/onboarding"] // Added '/onboarding'
    const noFooterPaths = ["/login", "/signup", "/onboarding"]

    return (
        <>
            <GoogleOAuthProvider clientId="482583231843-irfiph45ba2beifospage2augl8qejq4.apps.googleusercontent.com">
                {!isDashboardPath && !noNavBarPaths.includes(location.pathname) && <NavBar />}

                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route exact path="/home" element={<LandingPage />} />
                    <Route exact path="/login" element={<Signin />} />
                    <Route exact path="/signup" element={<Signup />} />

                    <Route exact path="/products/datafusion" element={<DataFusion />} />
                    <Route exact path="/products/finsightpro" element={<FinsightPro />} />
                    <Route exact path="/products/crm" element={<Crm />} />
                    <Route exact path="/products/fp-and-a-ml-ai" element={<FPAPowerbyML_AI />} />
                    <Route exact path="/products/magic-excel" element={<MagicExcel />} />

                    <Route exact path="/about-us/press" element={<Press />} />
                    <Route exact path="/pricing" element={<Pricing />} />
                    <Route exact path="/about-us/team" element={<OurTeam />} />
                    {/* <Route exact path="/signup" element={<Signup />} /> */}
                    <Route
                        exact
                        path="/onboarding"
                        element={isAuthenticated ? <Onboarding /> : <Navigate to="/login" />}
                    />
                    <Route exact path="/contact" element={<ContactUs />} />
                    <Route exact path="/request-demo" element={<RequestDemo />} />

                    <Route
                        exact
                        path="/dashboard"
                        element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
                    />
                    <Route
                        exact
                        path="/dashboard/chart/:queryName"
                        element={isAuthenticated ? <Chart /> : <Navigate to="/login" />}
                    />
                    <Route
                        exact
                        path="/dashboard/data-connect"
                        element={isAuthenticated ? <DataConnect /> : <Navigate to="/login" />}
                    />
                    {/* <Route
                        path="/dashboard/data-connect"
                        element={
                            <ProtectedRoute requiredSubscription="Pro">
                                <DataConnect />
                            </ProtectedRoute>
                        }
                    /> */}
                    <Route
                        exact
                        path="/dashboard/query"
                        element={isAuthenticated ? <Query /> : <Navigate to="/login" />}
                    />
                    {/* <Route path="/dashboard/data-connect/:title" element={<TableList />} />
                    <Route path="/dashboard/query/:queryName" element={<QueryPage />} /> */}
                    <Route
                        path="/dashboard/visual-query/:queryName"
                        element={<VisualQueryPage />}
                    />
                    <Route path="/dashboard/subscription" element={<SubscriptionPage />} />

                    <Route path="*" element={<Page404 />} />
                </Routes>

                {!isDashboardPath && !noFooterPaths.includes(location.pathname) && <Footer />}
            </GoogleOAuthProvider>
        </>
    )
}

export default App
