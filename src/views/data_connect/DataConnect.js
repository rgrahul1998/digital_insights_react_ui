import React, { useState } from "react"
import { CContainer, CRow, CCol } from "@coreui/react"
import CardItem from "./CardItem"
import JsonForm from "./JsonForm" // New component for JSON upload
import CsvForm from "./CsvForm" // New component for CSV upload
import DatabaseForm from "./DatabaseForm"
import { cilSpreadsheet, cilNoteAdd, cilDataTransferDown } from "@coreui/icons"
import { AppHeader, AppSidebar } from "../../components"

const DataConnect = () => {
    const [showForm, setShowForm] = useState(false)
    const [selectedForm, setSelectedForm] = useState("") // New state for selected form

    const handleCardClick = (formType) => {
        setShowForm(formType === "MariaDB")
        setSelectedForm(formType)
    }

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <CContainer className="px-4" lg>
                        <div className="text-center mb-5">
                            <h3 className="font-weight-bold">
                                Add data source to start building a report
                            </h3>
                        </div>
                        <CRow className="justify-content-center">
                            <CCol md={4} className="mb-4">
                                <CardItem
                                    icon={cilSpreadsheet}
                                    color="primary"
                                    text="External API (Preview)"
                                    isSelected={selectedForm === "JSON"}
                                    onClick={() => handleCardClick("JSON")}
                                />
                            </CCol>
                            <CCol md={4} className="mb-4">
                                <CardItem
                                    icon={cilDataTransferDown}
                                    color="success"
                                    text="CSV (Preview)"
                                    isSelected={selectedForm === "CSV"}
                                    onClick={() => handleCardClick("CSV")}
                                />
                            </CCol>
                            <CCol md={4} className="mb-4">
                                <CardItem
                                    icon={cilNoteAdd}
                                    color="danger"
                                    text="MariaDB (Add Data)"
                                    isSelected={selectedForm === "MariaDB"}
                                    onClick={() => handleCardClick("MariaDB")}
                                />
                            </CCol>
                        </CRow>

                        {/* Render the appropriate form based on selectedForm state */}
                        {selectedForm === "JSON" && <JsonForm />}
                        {selectedForm === "CSV" && <CsvForm />}
                        {showForm && <DatabaseForm />}
                    </CContainer>
                </div>
            </div>
        </div>
    )
}

export default DataConnect
