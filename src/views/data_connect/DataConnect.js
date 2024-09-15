import React, { useEffect, useState, useCallback } from "react"
import {
    CContainer,
    CRow,
    CCol,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CButton,
    CForm,
    CFormLabel,
    CFormSelect,
    CFormInput,
    CAlert,
    CSpinner,
} from "@coreui/react"
import CardItem from "./CardItem"
import { cilSpreadsheet, cilNoteAdd, cilDataTransferDown } from "@coreui/icons"
import { AppHeader, AppSidebar } from "../../components"
import { DataSourceListApi } from "../../api/DataSourceListApi"
import JsonForm from "./JsonForm"
import DatabaseForm from "./DatabaseForm"
import axios from "axios"
import API_URL from "../../config"
import Papa from "papaparse" // CSV parsing library

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
                        <PreviewModal
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
import { useNavigate } from "react-router-dom"
import BannerCard from "./BannerCard"

const CSVImportModal = ({
    visible,
    onClose,
    dataSources = [],
    file,
    tableDetails = {},
    onFileChange,
    onFileUpload,
    uploadStatus,
    error,
    isUploading,
    columns = [],
    filename,
    onPreview,
}) => {
    const [ifExists, setIfExists] = useState("Overwrite")
    const [dataSource, setDataSource] = useState(dataSources.length ? dataSources[0].name : "") // Set default value
    const [isLoading, setIsLoading] = useState(false) // Track loading state for import
    const [importSuccess, setImportSuccess] = useState(false) // Track import success
    const navigate = useNavigate()

    useEffect(() => {
        if (dataSources.length > 0 && !dataSource) {
            setDataSource(dataSources[0].name) // Set the first dataSource as default if none is selected
        }
    }, [dataSources, dataSource])

    const handleImport = async () => {
        var a = []

        // Populate the columns array
        columns.map((col, index) => {
            a[index] = {
                label: col.label,
                name: col.label.toLowerCase().replace(/\s+/g, "_"),
                type: col.type,
            }
        })

        // Create payload with table details, filename, etc.
        const payload = {
            table_label: tableDetails.label,
            table_name: tableDetails.name,
            filename: filename,
            if_exists: ifExists,
            columns: a,
            data_source: dataSource,
        }

        console.log("Payload:", payload)

        // Set loading state
        setIsLoading(true)

        try {
            // Send a POST request with the correct Content-Type
            const response = await axios.post(
                API_URL + "/api/method/insights.api.data_sources.import_csv",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "token " + localStorage.getItem("access_token"),
                    },
                },
            )
            console.log("Import successful:", response.data)
            setImportSuccess(true) // Set import success
        } catch (err) {
            console.error("Error during import:", err)
        } finally {
            setIsLoading(false) // Stop loading after the API call is done
        }
    }

    const handleCreateDashboard = () => {
        // Redirect to /dashboard
        navigate("/dashboard")
    }

    return (
        <CModal visible={visible} onClose={onClose} alignment="center">
            <CModalHeader closeButton>
                <CModalTitle>CSV Import</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    {isLoading ? (
                        // Loading screen during import process
                        <div className="text-center">
                            <CSpinner size="xl" />
                            <p className="mt-3">
                                The file is being imported. Please do not close the window.
                            </p>
                        </div>
                    ) : importSuccess ? (
                        // Success message after successful import
                        <div className="text-center">
                            <p className="text-success">
                                The file "{filename}" has been successfully imported!
                            </p>
                            <CButton color="success" onClick={handleCreateDashboard}>
                                Create Dashboard
                            </CButton>
                        </div>
                    ) : (
                        <>
                            <CRow>
                                {/* Data Source Selection */}
                                <CCol md={6}>
                                    <CFormLabel htmlFor="data-source">Data Source</CFormLabel>
                                    <CFormSelect
                                        id="data-source"
                                        value={dataSource}
                                        onChange={(e) => setDataSource(e.target.value)}
                                    >
                                        {dataSources.length > 0 ? (
                                            dataSources.map((source, index) => (
                                                <option key={index} value={source.name}>
                                                    {source.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option>No data sources found</option>
                                        )}
                                    </CFormSelect>
                                </CCol>

                                {/* File Input */}
                                <CCol md={6}>
                                    <CFormLabel htmlFor="file-input">File</CFormLabel>
                                    <CFormInput
                                        type="file"
                                        id="file-input"
                                        accept=".csv"
                                        onChange={onFileChange}
                                    />
                                </CCol>
                            </CRow>

                            {/* Display Table Details and Columns Preview After Successful Upload */}
                            {uploadStatus === "success" && (
                                <>
                                    <CRow className="mt-3">
                                        <CCol md={6}>
                                            <CFormLabel>New Table Label</CFormLabel>
                                            <CFormInput
                                                type="text"
                                                value={tableDetails.label}
                                                readOnly
                                            />
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormLabel>New Table Name</CFormLabel>
                                            <CFormInput
                                                type="text"
                                                value={tableDetails.name}
                                                readOnly
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mt-3">
                                        <CCol md={6}>
                                            <CFormLabel>Action if exists</CFormLabel>
                                            <CFormSelect
                                                value={ifExists}
                                                onChange={(e) => setIfExists(e.target.value)}
                                            >
                                                <option value="Fail">Fail</option>
                                                <option value="Overwrite">Overwrite</option>
                                                <option value="Append">Append</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>

                                    {/* Preview table of columns */}
                                    <CRow className="mt-3">
                                        <CCol>
                                            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>CSV Column</th>
                                                            <th>Column Name</th>
                                                            <th>Column Type</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {columns.map((col, index) => (
                                                            <tr key={index}>
                                                                <td>{col.label}</td>
                                                                <td>
                                                                    <CFormInput
                                                                        type="text"
                                                                        value={col.label
                                                                            .toLowerCase()
                                                                            .replace(/\s+/g, "_")}
                                                                    />
                                                                </td>
                                                                <td>{col.type}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CCol>
                                    </CRow>
                                </>
                            )}

                            {/* Conditional buttons based on columns length */}
                            <CRow className="mt-3">
                                {columns.length === 0 ? (
                                    <CCol>
                                        <CButton
                                            color="primary"
                                            className="w-100"
                                            onClick={onFileUpload}
                                            disabled={!file || isUploading}
                                        >
                                            {isUploading ? (
                                                <>
                                                    <CSpinner size="sm" className="me-2" />
                                                    Uploading...
                                                </>
                                            ) : (
                                                "Next"
                                            )}
                                        </CButton>
                                    </CCol>
                                ) : (
                                    <>
                                        <CCol md={6}>
                                            <CButton
                                                color="primary"
                                                className="w-100"
                                                onClick={onPreview}
                                                disabled={!file || isUploading}
                                            >
                                                Preview CSV Table
                                            </CButton>
                                        </CCol>
                                        <CCol md={6}>
                                            <CButton
                                                color="success"
                                                className="w-100"
                                                onClick={handleImport}
                                            >
                                                Import
                                            </CButton>
                                        </CCol>
                                    </>
                                )}
                            </CRow>
                        </>
                    )}
                </CForm>

                {error && <div className="text-danger mt-3">{error}</div>}
            </CModalBody>
        </CModal>
    )
}

const PreviewModal = ({ visible, onClose, csvData }) => {
    if (!csvData.length) return null

    return (
        <CModal
            size="xl" // Changed to a larger size
            visible={visible}
            onClose={onClose}
            className="preview-modal"
        >
            <CModalHeader>
                <CModalTitle>CSV Preview</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {Object.keys(csvData[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, i) => (
                                        <td key={i}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default DataConnect
