import React from "react"
import { useNavigate } from "react-router-dom" // Importing useNavigate
import { AppHeader, AppSidebar } from "../../components"
import Chaticon from "../../landing-page/components/ChatInterface" // Importing Chaticon
import { CButton, CCol, CRow } from "@coreui/react" // Importing CoreUI components
import API_URL from "../../config"

const DashboardLayout = () => {
    const navigate = useNavigate() // Initializing navigate

    const handleCreateNewChart = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/method/digital_insights.digital_insights.api.create_query.create_new_query`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log("New chart created successfully:", data.message)

            // Navigate to the new chart page
            navigate(`/dashboard/chart/${data.message.name}`) // Use data.name to navigate

        } catch (error) {
            console.error("Error creating new chart:", error)
        }
    }

    return (
        <div style={{ height: "100vh", overflow: "hidden" }}>
            <AppSidebar />
            <div className="wrapper d-flex flex-column" style={{ height: "100vh" }}>
                <AppHeader />

                {/* Buttons Row */}
                <CRow className="justify-content-center mt-3">
                    <CCol xs="auto">
                        <CButton
                            color="primary"
                            onClick={() => console.log("Add New Dashboard clicked")}
                        >
                            Add New Dashboard
                        </CButton>
                    </CCol>
                    <CCol xs="auto">
                        <CButton color="success" onClick={handleCreateNewChart}>
                            Create New Chart
                        </CButton>
                    </CCol>
                    <CCol xs="auto">
                        <CButton
                            color="warning"
                            onClick={() => console.log("Edit Existing Chart clicked")}
                        >
                            Edit Existing Chart
                        </CButton>
                    </CCol>
                </CRow>
            </div>

            {/* Chat icon floating at bottom right */}
            <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
                <Chaticon />
            </div>
        </div>
    )
}

export default DashboardLayout
