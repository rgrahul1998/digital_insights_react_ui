import React, { useEffect, useState, useCallback } from "react"
import { CContainer, CRow, CCol, CAlert } from "@coreui/react"
import CardItem from "./CardItem"
import { cilSpreadsheet, cilNoteAdd, cilDataTransferDown } from "@coreui/icons"
import { AppHeader, AppSidebar } from "../../components"
import { DataSourceListApi } from "../../api/DataSourceListApi"
import JsonForm from "./JsonForm"
import DatabaseForm from "./DatabaseForm"
import axios from "axios"
import API_URL from "../../config"
import Papa from "papaparse"
import CsvPreviewModal from "./CsvPreviewModal"
import BannerCard from "./BannerCard"
import CSVImportModal from "./CsvImpoerModal"

const DataConnect = () => {
    const [dataSources, setDataSources] = useState([])
    const [selectedForm, setSelectedForm] = useState("")
    const [showCSVModal, setShowCSVModal] = useState(false)
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [uploadStatus, setUploadStatus] = useState(null)
    const [tableDetails, setTableDetails] = useState({ label: "", name: "" })
    const [isUploading, setIsUploading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [columns, setColumns] = useState([])
    const [showPreviewModal, setShowPreviewModal] = useState(false) // State for preview modal
    const [csvData, setCsvData] = useState([]) // State to store parsed CSV data

    useEffect(() => {
        const fetchDataSources = async () => {
            try {
                const result = await DataSourceListApi()
                setDataSources(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchDataSources()
    }, [])

    const handleCardClick = (formType) => {
        setSelectedForm(formType)
        if (formType === "CSV") setShowCSVModal(true)
    }

    const resetModalState = () => {
        setFile(null)
        setUploadStatus(null)
        setTableDetails({ label: "", name: "" })
        setShowCSVModal(false)
        setColumns([])
        setCsvData([]) // Reset CSV data
        setShowPreviewModal(false) // Close preview modal
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setUploadStatus(null)
    }

    const handleFileUpload = useCallback(async () => {
        if (!file) {
            setError("No file selected")
            return
        }

        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("is_private", 0)
        formData.append("folder", "Home")
        console.log(localStorage.getItem("access_token"))
        try {
            const response = await axios.post(`${API_URL}/api/method/upload_file`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "token " + localStorage.getItem("access_token"),
                },
            })

            if (response.status === 200) {
                const fileNameWithoutExtension = response.data.message.file_name.split(".")[0]
                setFileName(response.data.message.name)
                setUploadStatus("success")
                setTableDetails({
                    label: fileNameWithoutExtension,
                    name: fileNameWithoutExtension,
                })

                // Fetch columns
                const columnsResponse = await axios.post(
                    API_URL +
                        "/api/method/insights.api.data_sources.get_columns_from_uploaded_file",
                    { filename: response.data.message.name },
                )

                if (columnsResponse.status === 200) {
                    setColumns(columnsResponse.data.message)
                } else {
                    throw new Error("Failed to fetch columns")
                }
                // Parse CSV data
                Papa.parse(file, {
                    header: true,
                    complete: (results) => {
                        setCsvData(results.data)
                    },
                    error: (err) => {
                        setError("Error parsing CSV")
                    },
                })
            } else {
                throw new Error("File upload failed")
            }
        } catch (err) {
            setUploadStatus("error")
            setError(err.message)
        } finally {
            setIsUploading(false)
        }
    }, [file])

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <CContainer className="px-4">
                        <BannerCard />
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

                        {loading && <CAlert color="info">Loading data sources...</CAlert>}
                        {error && <CAlert color="danger">Error: {error}</CAlert>}

                        {selectedForm === "JSON" && <JsonForm />}
                        {selectedForm === "MariaDB" && <DatabaseForm />}

                        <CSVImportModal
                            visible={showCSVModal}
                            onClose={resetModalState}
                            dataSources={dataSources}
                            file={file}
                            tableDetails={tableDetails}
                            onFileChange={handleFileChange}
                            onFileUpload={handleFileUpload}
                            uploadStatus={uploadStatus}
                            error={error}
                            isUploading={isUploading}
                            columns={columns}
                            filename={fileName}
                            onPreview={() => setShowPreviewModal(true)} // Add handler for preview
                        />
                        <CsvPreviewModal
                            visible={showPreviewModal}
                            onClose={() => setShowPreviewModal(false)}
                            csvData={csvData}
                        />
                    </CContainer>
                </div>
            </div>
        </div>
    )
}

export default DataConnect
