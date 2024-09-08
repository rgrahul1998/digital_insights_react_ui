import React from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, requiredSubscription }) => {
    const subscription = localStorage.getItem("subscription")
    console.log(subscription, requiredSubscription)
    if (subscription !== requiredSubscription) {
        // Redirect to the dashboard or show an unauthorized message if subscription does not match
        return <Navigate to="/dashboard/subscription" />
    }

    return children
}

export default ProtectedRoute
