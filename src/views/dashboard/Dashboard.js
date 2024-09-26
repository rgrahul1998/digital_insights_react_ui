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
import API_URL from "../../config"

const Dashboard = () => {
    // State hooks
    const [dataSources, setDataSources] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedDataSource, setSelectedDataSource] = useState("Select data source")
    const [selectedDataSourceType, setSelectedDataSourceType] = useState()
    const [tables, setTables] = useState([])
    const [selectedTables, setSelectedTables] = useState([])
    const [selectedColumns, setSelectedColumns] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [tableSearchQuery, setTableSearchQuery] = useState("")
    const [showTablePreview, setShowTablePreview] = useState(false) // NEW state for table visibility

    useEffect(() => {
        const fetchDataSources = async () => {
            try {
                const result = await DataSourceListApi()
                setDataSources(result)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchDataSources()
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

    const handleExecute = async () => {
        // Check if there is a selected data source, table, and columns
        if (!selectedDataSource || selectedTables.length === 0 || selectedColumns.length === 0) {
            console.error("Please select a data source, table, and columns.")
            return
        }

        // Prepare payload
        const payload = {
            data_source: selectedDataSource,
            table: selectedTables, // Assuming you are selecting one table at a time
            columns: selectedColumns,
        }

        try {
            const response = await fetch(
                API+"/api/method/digital_insights.digital_insights.api.get_table_data.get_table_data",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                },
            )

            if (response.ok) {
                const data = await response.json()
                console.log("Table data retrieved:", data)
                // Handle the response data, e.g., display table preview
                setShowTablePreview(true)
            } else {
                console.error("Failed to retrieve table data")
            }
        } catch (error) {
            console.error("An error occurred while fetching table data:", error)
        }
    }

    const filteredTables = tables.filter((table) =>
        table.label.toLowerCase().includes(tableSearchQuery.toLowerCase()),
    )

    const handleNewQuery = async () => {
        const payload = { is_assisted_query: 1, title: "ABC" }

        try {
            const response = await fetch(
                API_URL+"/api/method/insights.api.queries.create_query",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                },
            )

            if (response.ok) {
                const data = await response.json()
                const queryName = data.message.name
                console.log("New query created:", queryName)
            } else {
                console.error("Failed to create query")
            }
        } catch (error) {
            console.error("An error occurred:", error)
        }
    }

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
                    {/* Upper Section: Dashboard Graphs */}
                    <CCol className="d-flex flex-column mb-4">
                        <DashboardGraphs />
                    </CCol>

                    {/* Lower Section: Table Preview */}
                    <CCol className="d-flex flex-column">
                        <div
                            className="d-flex flex-column align-items-center justify-content-center flex-grow-1"
                            style={{ border: "1px dashed #ddd" }}
                        >
                            <h4 className="mb-2">Preview Table</h4>
                            <CButton color="primary" onClick={handleExecute}>
                                Execute
                            </CButton>
                            {/* Conditionally render table */}
                            {showTablePreview && (
                                <table className="table mt-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Column 1</th>
                                            <th scope="col">Column 2</th>
                                            <th scope="col">Column 3</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Data 1</td>
                                            <td>Data 2</td>
                                            <td>Data 3</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </CCol>
                </CCol>

                <CCol lg="5" className="d-flex flex-column">
                    <CRow className="gx-0 flex-grow-1">
                        <CCol md="4">
                            <FiltersCard
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
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
                                    <CButton
                                        color="primary"
                                        className="w-100 mb-2"
                                        onClick={handleNewQuery}
                                    >
                                        New Query
                                    </CButton>
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
                                                    selectedColumns={selectedColumns}
                                                    setSelectedColumns={setSelectedColumns}
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

const DashboardGraphs = () => (
    <div
        className="d-flex flex-column align-items-center justify-content-center flex-grow-1"
        style={{ border: "1px dashed #ddd" }}
    >
        <h4 className="mb-2">Dashboard Graphs</h4>
        <img src="https://via.placeholder.com/300x150" alt="Graph placeholder" />
        <p>Add graphs or charts representing your data.</p>
    </div>
)

const FiltersCard = ({ searchQuery, setSearchQuery }) => (
    <CCard className="h-100 mb-0">
        <CCardHeader>Filters</CCardHeader>
        <CCardBody>
            <CFormInput
                placeholder="Search"
                className="mb-2"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
            />
            <p className="mb-2">Filters on this page</p>
            <CButton color="secondary" variant="outline" className="w-100 mb-2">
                Add data fields here
            </CButton>
        </CCardBody>
    </CCard>
)
