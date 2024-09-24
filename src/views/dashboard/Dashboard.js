// Dashboard.js
import React, { useEffect, useState } from "react"
import {
    CContainer,
    CRow,
    CCol,
    CFormInput,
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
} from "@coreui/react"
import DashboardHeader from "./DashboardHeader"
import { DataSourceListApi } from "../../api/DataSourceListApi"
import { fetchTables } from "../../api/VisualQueryApi"
import { useParams } from "react-router-dom"
import TreeView from "./TreeView"
import {
    FaDollarSign,
    FaChartLine,
    FaChartPie,
    FaTable,
    FaFilter,
    FaTextHeight,
} from "react-icons/fa" // Import specific icons
import { AiOutlineLineChart, AiOutlineBarChart } from "react-icons/ai"
import { IoIosStats } from "react-icons/io"
import { RiPieChart2Line, RiFileChartLine } from "react-icons/ri"

const Dashboard = () => {
    // State hooks
    const [dataSources, setDataSources] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedDataSource, setSelectedDataSource] = useState("Select data source")
    const [selectedDataSourceType, setSelectedDataSourceType] = useState()
    const [tables, setTables] = useState([])
    const [selectedTables, setSelectedTables] = useState([]) // To store selected tables
    const [selectedColumns, setSelectedColumns] = useState([]) // State for selected columns
    const [searchQuery, setSearchQuery] = useState("")
    const [tableSearchQuery, setTableSearchQuery] = useState("")

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await DataSourceListApi()
                setDataSources(result)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [])

    useEffect(() => {
        if (selectedDataSource !== "Select data source") {
            const fetchTablesHandler = async () => {
                try {
                    const result = await fetchTables(selectedDataSource)
                    const transformedTables = result.map((table) => ({
                        id: table.name,
                        label: table.label,
                    }))

                    setTables(transformedTables)
                } catch (error) {
                    console.error("Error fetching tables:", error)
                }
            }

            fetchTablesHandler()
        }
    }, [selectedDataSource])

    const handleDataSourceSelect = (dataSourceName, dataSourceType) => {
        setSelectedDataSource(dataSourceName)
        setSelectedDataSourceType(dataSourceType)
    }

    const handleTableSelect = (tableName) => {
        setSelectedTables((prev) => [...prev, tableName])
    }

    const handleColumnRemove = (column) => {
        setSelectedColumns((prev) => prev.filter((col) => col !== column))
    }

    const filteredTables = tables.filter((table) =>
        table.label.toLowerCase().includes(tableSearchQuery.toLowerCase()),
    )

    const icons = [
        { label: "Number", icon: <FaDollarSign /> },
        { label: "Trend", icon: <AiOutlineLineChart /> },
        { label: "Line", icon: <IoIosStats /> },
        { label: "Scatter", icon: <AiOutlineBarChart /> },
        { label: "Bar", icon: <FaChartLine /> },
        { label: "Row", icon: <RiFileChartLine /> },
        { label: "Pie", icon: <FaChartPie /> },
        { label: "Funnel", icon: <RiPieChart2Line /> },
        { label: "Table", icon: <FaTable /> },
        { label: "Progress", icon: <AiOutlineBarChart /> },
        { label: "Mixed Axis", icon: <FaChartLine /> },
        { label: "Filter", icon: <FaFilter /> },
        { label: "Text", icon: <FaTextHeight /> },
        { label: "Pivot Table", icon: <FaTable /> },
    ]

    return (
        <CContainer fluid>
            <DashboardHeader />
            <CRow className="gx-0 min-vh-100">
                <CCol lg="7" className="d-flex flex-column">
                    <div
                        className="d-flex flex-column align-items-center justify-content-center flex-grow-1"
                        style={{ border: "1px dashed #ddd" }}
                    >
                        <img src="https://via.placeholder.com/100x50" alt="drag and drop icon" />
                        <h4 className="mb-2">Build visuals with your data</h4>
                        <p>Select or drag fields from the Data pane onto the report canvas.</p>
                    </div>
                </CCol>

                <CCol lg="5" className="d-flex flex-column">
                    <CRow className="gx-0 flex-grow-1">
                        <CCol md="4">
                            <CCard className="h-100 mb-0">
                                <CCardHeader>Filters</CCardHeader>
                                <CCardBody>
                                    <CFormInput
                                        placeholder="Search"
                                        className="mb-2"
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <p className="mb-2">Filters on this page</p>
                                    <CButton
                                        color="secondary"
                                        variant="outline"
                                        className="w-100 mb-2"
                                    >
                                        Add data fields here
                                    </CButton>
                                    <hr className="mb-2" />
                                    <p className="mb-2">Filters on all pages</p>
                                    <CButton color="secondary" variant="outline" className="w-100">
                                        Add data fields here
                                    </CButton>
                                </CCardBody>
                            </CCard>
                        </CCol>

                        <CCol md="4">
                            <CCard className="h-100 mb-0">
                                <CCardHeader>Visualizations</CCardHeader>
                                <CCardBody className="p-0">
                                    <div className="d-flex flex-wrap">
                                        {icons.map((item, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    width: "25%", // Controls number of icons per row
                                                    textAlign: "center",
                                                }}
                                            >
                                                <div style={{ fontSize: "1.2rem", color: "#333" }}>
                                                    {item.icon}
                                                </div>
                                                {/* Icon size and color */}
                                                <div
                                                    style={{
                                                        fontSize: "0.74rem",
                                                        color: "#555",
                                                        marginTop: "0.1rem",
                                                    }}
                                                >
                                                    {item.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr className="mb-2" />
                                    <div className="p-2">
                                        <p className="mb-3 fw-bold">Selected Columns</p>
                                        {selectedColumns.length > 0 ? (
                                            selectedColumns.map((column, index) => (
                                                <div
                                                    key={index}
                                                    className="d-flex align-items-center mb-2"
                                                    style={{
                                                        width: "100%",
                                                        padding: "0.5rem",
                                                        border: "1px solid #e5e5e5",
                                                        borderRadius: "0.2rem",
                                                        backgroundColor: "#f9f9f9",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            flexGrow: 1,
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            fontSize: "0.9rem",
                                                        }}
                                                        title={column} // Tooltip with full column name
                                                    >
                                                        {column}
                                                    </span>
                                                    <button
                                                        style={{
                                                            fontSize: "0.75rem",
                                                            width: "1.25rem",
                                                            height: "1.25rem",
                                                            lineHeight: "1.25rem",
                                                            border: "none",
                                                            background: "none",
                                                            color: "#dc3545",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => handleColumnRemove(column)}
                                                        aria-label="Remove column"
                                                    >
                                                        &#x2715;
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted">No columns selected</p>
                                        )}
                                    </div>
                                    <hr className="mb-0" />
                                </CCardBody>
                            </CCard>
                        </CCol>

                        <CCol md="4">
                            <CCard className="h-100 mb-0">
                                <CCardHeader>Data</CCardHeader>
                                <CCardBody className="p-0">
                                    <CDropdown className="w-100">
                                        <CDropdownToggle color="white" className="w-100">
                                            {selectedDataSource}
                                        </CDropdownToggle>
                                        <CDropdownMenu
                                            style={{ maxHeight: "300px", overflowY: "auto" }}
                                        >
                                            {dataSources.map((source) => (
                                                <CDropdownItem
                                                    key={source.name}
                                                    onClick={() =>
                                                        handleDataSourceSelect(
                                                            source.name,
                                                            source.database_type,
                                                        )
                                                    }
                                                >
                                                    {source.title}
                                                </CDropdownItem>
                                            ))}
                                        </CDropdownMenu>
                                    </CDropdown>

                                    {selectedDataSource !== "Select data source" && (
                                        <>
                                            <CFormInput
                                                placeholder="Search tables"
                                                className="mb-2"
                                                value={tableSearchQuery}
                                                onChange={(e) =>
                                                    setTableSearchQuery(e.target.value)
                                                }
                                            />
                                            <div style={{ height: "700px", overflowY: "auto" }}>
                                                <TreeView
                                                    items={filteredTables}
                                                    onSelect={handleTableSelect}
                                                    selectedDataSource={selectedDataSource}
                                                    selectedDataSourceType={selectedDataSourceType}
                                                    selectedColumns={selectedColumns} // Pass selectedColumns
                                                    setSelectedColumns={setSelectedColumns} // Pass setSelectedColumns
                                                />
                                            </div>
                                        </>
                                    )}
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default Dashboard
