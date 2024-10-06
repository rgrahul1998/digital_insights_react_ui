import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppHeader, AppSidebar } from "../../components"
import {
    CButton,
    CCol,
    CRow,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from "@coreui/react"
import { fetchAllQueries } from "../../api/VisualQueryApi"
import API_URL from "../../config"

const DashboardLayout = () => {
    const navigate = useNavigate()
    const [queries, setQueries] = useState([]) // State to hold queries

    // Fetch queries when component mounts
    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const result = await fetchAllQueries()
                setQueries(result)
            } catch (error) {
                console.error("Error fetching queries:", error)
            }
        }

        fetchQueries()
    }, [])

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
            navigate(`/dashboard/chart/${data.message.name}`)
        } catch (error) {
            console.error("Error creating new chart:", error)
        }
    }

    const handleEditChart = (queryName) => {
        navigate(`/dashboard/chart/${queryName}`)
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
                        {/* Dropdown for editing existing charts */}
                        <CDropdown>
                            <CDropdownToggle color="warning">Edit Existing Chart</CDropdownToggle>
                            <CDropdownMenu style={{ maxHeight: "200px", overflowY: "auto" }}>
                                {/* Loop through the queries and display them as dropdown items */}
                                {queries.length > 0 ? (
                                    queries.map((query) => (
                                        <CDropdownItem
                                            key={query.name}
                                            onClick={() => handleEditChart(query.name)}
                                        >
                                            {query.title}
                                        </CDropdownItem>
                                    ))
                                ) : (
                                    <CDropdownItem disabled>No queries available</CDropdownItem>
                                )}
                            </CDropdownMenu>
                        </CDropdown>
                    </CCol>
                </CRow>
            </div>
        </div>
    )
}

export default DashboardLayout
