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
import API_URL from "../../config"
import DashboardGraphs from "./DashboardGraphs"
import FiltersCard from "./FiltersCard"
import IconsList from "./IconsList"
import DataDropdown from "./DataDropdown"
import TablePreview from "./TablePreview"

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
    const [data, setData] = useState([]) // NEW state to store table data
    const [isTablePreviewed, setIsTablePreviewed] = useState(false)
    const [selectedChartType, setSelectedChartType] = useState(null) // NEW state for chart type
    const [xAxisColumn, setXAxisColumn] = useState(null)
    const [yAxisColumn, setYAxisColumn] = useState(null)

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
        if (!selectedDataSource || selectedTables.length === 0) {
            console.error("Please select a data source, table, and columns.")
            return
        }

        const payload = {
            data_source: selectedDataSource,
            table: selectedTables,
            columns: selectedColumns,
        }

        try {
            const response = await fetch(
                API_URL +
                    "/api/method/digital_insights.digital_insights.api.get_table_data.get_table_data",
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
                console.log("Table data retrieved:", data.message)
                setData(data.message)
                setShowTablePreview(true)
                setIsTablePreviewed(true) // Mark table as previewed
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
                API_URL + "/api/method/insights.api.queries.create_query",
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

    const handleIconClick = (chartType) => {
        setSelectedChartType(chartType)
    }

    return (
        <CContainer fluid>
            <DashboardHeader />
            <CRow className="gx-0 min-vh-100">
                <CCol lg="7" className="d-flex flex-column">
                    {/* Upper Section: Dashboard Graphs */}
                    <CCol className="d-flex flex-column mb-4">
                        <DashboardGraphs
                            selectedChartType={selectedChartType}
                            xAxisColumn={xAxisColumn}
                            yAxisColumn={yAxisColumn}
                            data={data}
                        />
                    </CCol>

                    {/* Lower Section: Table Preview */}
                    <CCol className="d-flex flex-column">
                        <TablePreview
                            data={data}
                            showTablePreview={showTablePreview}
                            handleExecute={handleExecute}
                        />
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
                                    <IconsList onIconClick={handleIconClick} />
                                    <hr className="mb-2" />
                                    <div className="p-2">
                                        <p className="mb-3 fw-bold">Selected Columns</p>
                                        {selectedColumns.length > 0 ? (
                                            selectedColumns.map((column, index) => (
                                                <div
                                                    key={index}
                                                    className="d-flex align-items-center mb-2 border rounded p-2"
                                                    style={{
                                                        backgroundColor: "#f9f9f9",
                                                        border: "1px solid #e5e5e5",
                                                    }}
                                                >
                                                    <span
                                                        className="flex-grow-1 text-truncate"
                                                        title={column.label}
                                                        style={{ fontSize: "0.9rem" }}
                                                    >
                                                        {column.label}
                                                    </span>
                                                    <button
                                                        className="btn btn-link text-danger p-0 ms-2"
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

                                        {/* New Dropdowns for X-axis and Y-axis */}
                                        <div className="mt-3">
                                            <p className="fw-bold">X-axis</p>
                                            <select
                                                value={xAxisColumn || ""}
                                                onChange={(e) => setXAxisColumn(e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="" disabled>
                                                    Select X-axis column
                                                </option>
                                                {selectedColumns
                                                    .filter((col) => col.type !== "Integer")
                                                    .map((col, index) => (
                                                        <option key={index} value={col.label}>
                                                            {col.label}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        <div className="mt-3">
                                            <p className="fw-bold">Y-axis</p>
                                            <select
                                                value={yAxisColumn || ""}
                                                onChange={(e) => setYAxisColumn(e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="" disabled>
                                                    Select Y-axis column
                                                </option>
                                                {selectedColumns
                                                    .filter((col) => col.type === "Integer")
                                                    .map((col, index) => (
                                                        <option key={index} value={col.label}>
                                                            {col.label}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
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
                                    <DataDropdown
                                        dataSources={dataSources}
                                        selectedDataSource={selectedDataSource}
                                        handleDataSourceSelect={handleDataSourceSelect}
                                    />

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
