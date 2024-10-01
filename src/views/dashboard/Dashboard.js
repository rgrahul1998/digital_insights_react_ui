import React, { useEffect, useState, useMemo } from "react"
import { CContainer, CRow, CCol, CFormInput, CCard, CCardHeader, CCardBody } from "@coreui/react"
import DashboardHeader from "./DashboardHeader"
import { DataSourceListApi } from "../../api/DataSourceListApi"
import { fetchTables } from "../../api/VisualQueryApi"
import TreeView from "./TreeView"
import API_URL from "../../config"
import DashboardGraphs from "./DashboardGraphs"
import FiltersCard from "./FiltersCard"
import DataDropdown from "./DataDropdown"
import TablePreview from "./TablePreview"
import VisualizationSection from "./VisualizationSection"
import { AppHeader, AppSidebar } from "../../components"


const Dashboard = () => {
    // State hooks
    const [dataSources, setDataSources] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedDataSource, setSelectedDataSource] = useState("Select data source")
    const [selectedDataSourceType, setSelectedDataSourceType] = useState(null)
    const [tables, setTables] = useState([])
    const [selectedTables, setSelectedTables] = useState([])
    const [selectedColumns, setSelectedColumns] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [tableSearchQuery, setTableSearchQuery] = useState("")
    const [showTablePreview, setShowTablePreview] = useState(false)
    const [data, setData] = useState([])
    const [isTablePreviewed, setIsTablePreviewed] = useState(false)
    const [selectedChartType, setSelectedChartType] = useState(null)
    const [xAxisColumn, setXAxisColumn] = useState(null)
    const [yAxisColumn, setYAxisColumn] = useState(null)

    // Fetch Data Sources
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

    // Fetch Tables when Data Source is selected
    useEffect(() => {
        if (!selectedDataSource) return

        const fetchTablesHandler = async () => {
            try {
                const result = await fetchTables(selectedDataSource)
                const transformedTables = result.map(({ name, label }) => ({
                    id: name,
                    label,
                }))
                setTables(transformedTables)
            } catch (error) {
                console.error("Error fetching tables:", error)
            }
        }
        fetchTablesHandler()
    }, [selectedDataSource])

    // Data source and table selection handlers
    const handleDataSourceSelect = (dataSourceName, dataSourceType) => {
        setSelectedDataSource(dataSourceName)
        setSelectedDataSourceType(dataSourceType)
        setTables([]) // Clear tables when a new data source is selected
        setSelectedTables([]) // Clear selected tables
    }

    const handleTableSelect = (tableName) => {
        if (!selectedTables.includes(tableName)) {
            setSelectedTables((prev) => [...prev, tableName])
        }
    }

    const handleColumnRemove = (column) => {
        setSelectedColumns((prev) => prev.filter((col) => col !== column))
    }

    // Execute Query and Fetch Table Data
    const handleExecute = async () => {
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
                `${API_URL}/api/method/digital_insights.digital_insights.api.get_table_data.get_table_data`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                },
            )

            if (response.ok) {
                const result = await response.json()
                setData(result.message)
                setShowTablePreview(true)
                setIsTablePreviewed(true)
            } else {
                console.error("Failed to retrieve table data")
            }
        } catch (error) {
            console.error("An error occurred while fetching table data:", error)
        }
    }

    // New Query Handler
    const handleNewQuery = async () => {
        const payload = { is_assisted_query: 1, title: "ABC" }

        try {
            const response = await fetch(
                `${API_URL}/api/method/insights.api.queries.create_query`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            )

            if (response.ok) {
                const result = await response.json()
                console.log("New query created:", result.message.name)
            } else {
                console.error("Failed to create query")
            }
        } catch (error) {
            console.error("An error occurred:", error)
        }
    }

    // Icon click handler for chart selection
    const handleIconClick = (chartType) => {
        setSelectedChartType(chartType)
    }

    // Filter tables based on search query (useMemo for optimization)
    const filteredTables = useMemo(
        () =>
            tables.filter((table) =>
                table.label.toLowerCase().includes(tableSearchQuery.toLowerCase()),
            ),
        [tables, tableSearchQuery],
    )

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column">
                <AppHeader />
                <div>
                    <CContainer fluid>
                        <DashboardHeader />
                        <CRow className="gx-0 min-vh-100">
                            {/* Left Section */}
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

                            {/* Right Section */}
                            <CCol lg="5" className="d-flex flex-column">
                                <CRow className="gx-0 flex-grow-1">
                                    {/* Filters and Visualization */}
                                    <CCol md="4">
                                        <FiltersCard
                                            searchQuery={searchQuery}
                                            setSearchQuery={setSearchQuery}
                                        />
                                    </CCol>

                                    <CCol md="4">
                                        <VisualizationSection
                                            selectedColumns={selectedColumns}
                                            xAxisColumn={xAxisColumn}
                                            setXAxisColumn={setXAxisColumn}
                                            yAxisColumn={yAxisColumn}
                                            setYAxisColumn={setYAxisColumn}
                                            handleIconClick={handleIconClick}
                                            handleColumnRemove={handleColumnRemove}
                                        />
                                    </CCol>

                                    {/* Data Section */}
                                    <CCol md="4">
                                        <CCard className="h-100 mb-0">
                                            <CCardHeader>Data</CCardHeader>
                                            <CCardBody className="p-0">
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
                                                        <div
                                                            style={{
                                                                height: "700px",
                                                                overflowY: "auto",
                                                            }}
                                                        >
                                                            <TreeView
                                                                items={filteredTables}
                                                                onSelect={handleTableSelect}
                                                                selectedDataSource={
                                                                    selectedDataSource
                                                                }
                                                                selectedDataSourceType={
                                                                    selectedDataSourceType
                                                                }
                                                                selectedColumns={selectedColumns}
                                                                setSelectedColumns={
                                                                    setSelectedColumns
                                                                }
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
                </div>
            </div>
        </div>
    )
}

export default Dashboard
