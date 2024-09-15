import React, { useEffect, useState } from "react"
import {
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
    CSpinner,
} from "@coreui/react"
import axios from "axios"
import API_URL from "../../config"
import { useNavigate } from "react-router-dom"

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
            setImportSuccess(true) // Set import success
        } catch (err) {
            console.error("Error during import:", err)
        } finally {
            setIsLoading(false) // Stop loading after the API call is done
        }
    }

    const handleCreateDashboard = () => {
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

export default CSVImportModal
