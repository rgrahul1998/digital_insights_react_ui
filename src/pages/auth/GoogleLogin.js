import React, { useEffect, useState } from "react"
import API_URL from "../../config"
import { useNavigate } from "react-router-dom"

export default function GoogleSignIn({ setError }) {
    const navigate = useNavigate()

    useEffect(() => {
        // Dynamically load the Google Identity Services script
        const script = document.createElement("script")
        script.src = "https://accounts.google.com/gsi/client"
        script.async = true
        script.defer = true
        document.body.appendChild(script)

        // Initialize Google Login once the script is loaded
        script.onload = () => {
            /* global google */
            google.accounts.id.initialize({
                client_id:
                    "482583231843-irfiph45ba2beifospage2augl8qejq4.apps.googleusercontent.com",
                callback: handleCallbackResponse,
            })

            google.accounts.id.renderButton(
                document.getElementById("googleSignInDiv"),
                { theme: "outline", size: "large" }, // Customization of the button
            )
        }

        return () => {
            // Clean up the script when the component unmounts
            document.body.removeChild(script)
        }
    }, [])

    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential)

        const userObject = parseJwt(response.credential)
        console.log(userObject)

        const userData = {
            email: userObject.email,
            name: userObject.name,
        }

        // Send the user data to the Frappe backend
        fetch(
            API_URL +
                "/api/method/digital_insights.digital_insights.api.google_auth.save_google_user_data",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            },
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.message.msg === "success") {
                    const token = data.message.access_token.access_token
                    const user = data.message.user
                    const subscription = data.message.subscription

                    localStorage.setItem("access_token", token)
                    localStorage.setItem("user", user)
                    localStorage.setItem("subscription", subscription)

                    if (data.message.first_time_login === 1) {
                        navigate("/onboarding")
                        window.location.reload()
                    } else {
                        navigate("/dashboard")
                    }
                } else if (data.message.msg === "error") {
                    setError(data.message.error)
                } else {
                    setError("Invalid credentials, please try again.")
                }
            })
            .catch((error) => {
                console.error("Error saving user data:", error)
                setError("Internal server error")
            })
    }

    const parseJwt = (token) => {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join(""),
        )

        return JSON.parse(jsonPayload)
    }

    return <div id="googleSignInDiv"></div>
}
