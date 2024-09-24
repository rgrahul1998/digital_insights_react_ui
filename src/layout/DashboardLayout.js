import React from "react"
import { AppContent, AppSidebar, AppFooter, AppHeader } from "../components/index"
import Dashboard from "../views/dashboard/Dashboard"
import { CContainer } from "@coreui/react"

const DashboardLayout = () => {
    return (
        <div style={{ height: "910px", display: "flex", overflow: "hidden" }}>
            <AppSidebar />
            <div
                className="wrapper d-flex flex-column"
                style={{ flex: 1, minHeight: "100vh", overflow: "hidden" }}
            >
                <AppHeader />
                <div className="body flex-grow-1" style={{ flex: 1, overflow: "hidden" }}>
                    <Dashboard />
                </div>
                {/* <AppFooter /> */}
            </div>
        </div>
    )
}

export default DashboardLayout
