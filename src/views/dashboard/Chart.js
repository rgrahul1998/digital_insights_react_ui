import React, { useEffect, useState, useMemo, useCallback } from "react"
import { CContainer, CRow, CCol, CFormInput, CCard, CCardHeader, CCardBody } from "@coreui/react"
import DashboardHeader from "./DashboardHeader"
import { DataSourceListApi } from "../../api/DataSourceListApi"
import { fetchTables, getQueryData } from "../../api/VisualQueryApi"
import TreeView from "./TreeView"
import API_URL from "../../config"
import DashboardGraphs from "./DashboardGraphs"
import FiltersCard from "./FiltersCard"
import DataDropdown from "./DataDropdown"
import TablePreview from "./TablePreview"
import VisualizationSection from "./VisualizationSection"
import Chaticon from "../../landing-page/components/ChatInterface"
import { AppHeader, AppSidebar } from "../../components"
import { useParams } from "react-router-dom"

const Chart = () => {
    const { queryName } = useParams()

    // State hooks
    const [dataSources, setDataSources] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedDataSource, setSelectedDataSource] = useState("Select data source")
    const [selectedDataSourceType, setSelectedDataSourceType] = useState(null)
    const [tables, setTables] = useState([])
    const [selectedTables, setSelectedTables] = useState([])
    const [selectedColumns, setSelectedColumns] = useState([])
    const [tableSearchQuery, setTableSearchQuery] = useState("")
    const [showTablePreview, setShowTablePreview] = useState(false)
    const [data, setData] = useState([])
    const [isTablePreviewed, setIsTablePreviewed] = useState(false)
    const [selectedChartType, setSelectedChartType] = useState(null)
    const [xAxisColumn, setXAxisColumn] = useState([])
    const [yAxisColumn, setYAxisColumn] = useState([])
    const [filters, setFilters] = useState([]) // New state for filters

    // Prefill query data from API
    useEffect(() => {
        if (queryName) {
            const prefillData = async () => {
                try {
                    const queryData = await getQueryData(queryName)
                    setSelectedDataSource(queryData.data_source)
                    setSelectedDataSourceType(queryData.data_source_type)

                    // Fetch and set tables and columns based on queryData
                    const result = await fetchTables(queryData.data_source)
                    const transformedTables = result.map(({ name, label }) => ({
                        id: name,
                        label,
                    }))
                    setTables(transformedTables)
                    setSelectedTables(queryData.table)
                    setSelectedColumns(queryData.columns)

                    // Preset the x and y axis columns from the query data
                    setXAxisColumn(queryData.x_axis_column || [])
                    setYAxisColumn(queryData.y_axis_column || [])
                    setSelectedChartType(queryData.chart_type || [])
                    setFilters(queryData.filter)
                } catch (error) {
                    setError(error.message)
                }
            }
            prefillData()
        }
    }, [queryName])

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
        if (!selectedDataSource || selectedDataSource === "Select data source") return

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

    const handleTableSelect = async (tableName) => {
        if (!selectedTables.includes(tableName)) {
            const updatedTables = [...selectedTables, tableName]
            setSelectedTables(updatedTables)
            await handleExecute(updatedTables)
        }
    }

    useEffect(() => {
        if (selectedTables.length > 0 && selectedColumns.length >= 0) {
            handleExecute(selectedTables, selectedColumns)
        }
    }, [selectedColumns, selectedTables])

    const handleColumnSelect = (columnName) => {
        if (!selectedColumns.includes(columnName)) {
            setSelectedColumns((prevColumns) => [...prevColumns, columnName])
        }
    }

    const handleColumnRemove = (column) => {
        const columnLabel = column.label // Extract the label from the column object

        setSelectedColumns((prevColumns) => {
            const updatedColumns = prevColumns.filter((col) => col !== column)

            // Update xAxisColumn if the removed column was part of it
            if (xAxisColumn.includes(columnLabel)) {
                setXAxisColumn((prevXAxis) => prevXAxis.filter((xCol) => xCol !== columnLabel))
            }

            // Update yAxisColumn if the removed column was part of it
            if (yAxisColumn.includes(columnLabel)) {
                setYAxisColumn((prevYAxis) => prevYAxis.filter((yCol) => yCol !== columnLabel))
            }

            return updatedColumns // Return updated selected columns
        })
    }

    // New function to handle filter changes
    const handleFiltersChange = useCallback(
        (newFilters) => {
            setFilters(newFilters)
            handleExecute(selectedTables, selectedColumns, newFilters) // Trigger API when filters change
        },
        [selectedTables, selectedColumns],
    )

    // Execute Query and Fetch Table Data
    const handleExecute = async (
        tablesToFetch = selectedTables,
        columnsToFetch = selectedColumns,
        filtersToFetch = filters, // Use filters in the API call
    ) => {
        if (!selectedDataSource || tablesToFetch.length === 0) {
            console.error("Please select a data source and table.")
            return
        }

        const payload = {
            data_source: selectedDataSource,
            table: tablesToFetch,
            columns: columnsToFetch,
            query_name: queryName,
            filters: filtersToFetch, // Include filters in the payload
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
                console.error("Failed to retrieve table data.")
            }
        } catch (error) {
            console.error("An error occurred while fetching table data:", error)
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
        <div style={{ height: "100vh", overflow: "hidden" }}>
            <AppSidebar />
            <div className="wrapper d-flex flex-column" style={{ height: "100vh" }}>
                <AppHeader />
                <div style={{ flex: 1, overflow: "auto" }}>
                    <CContainer fluid style={{ height: "93%" }}>
                        <DashboardHeader />
                        <CRow className="gx-0 mt-0 h-100">
                            {/* Left Section */}
                            <CCol lg="7" className="d-flex flex-column h-100">
                                {/* Upper Section: Dashboard Graphs */}
                                <CCol
                                    className="d-flex flex-column mb-4"
                                    style={{ flex: "0 0 auto" }}
                                >
                                    <DashboardGraphs
                                        selectedChartType={selectedChartType}
                                        xAxisColumn={xAxisColumn}
                                        yAxisColumn={yAxisColumn}
                                        data={data}
                                    />
                                </CCol>

                                {/* Lower Section: Table Preview */}
                                <CCol
                                    className="d-flex flex-column flex-grow-1"
                                    style={{ overflowY: "auto", maxHeight: "100%" }}
                                >
                                    <TablePreview data={data} showTablePreview={showTablePreview} />
                                </CCol>
                            </CCol>

                            {/* Right Section */}
                            <CCol lg="5" className="d-flex flex-column h-100">
                                <CRow className="gx-0 flex-grow-1 h-100">
                                    {/* Filters Section */}
                                    <CCol
                                        md="4"
                                        className="d-flex flex-column"
                                        style={{ overflowY: "auto", maxHeight: "100%" }}
                                    >
                                        <FiltersCard
                                            selectedColumns={selectedColumns}
                                            data={data}
                                            onFiltersChange={handleFiltersChange} // Pass down filter change handler
                                        />
                                    </CCol>

                                    {/* Visualization Section */}
                                    <CCol
                                        md="4"
                                        className="d-flex flex-column"
                                        style={{ overflowY: "auto", maxHeight: "100%" }}
                                    >
                                        <VisualizationSection
                                            selectedColumns={selectedColumns}
                                            xAxisColumn={xAxisColumn}
                                            setXAxisColumn={setXAxisColumn}
                                            yAxisColumn={yAxisColumn}
                                            setYAxisColumn={setYAxisColumn}
                                            handleIconClick={handleIconClick}
                                            handleColumnRemove={handleColumnRemove}
                                            queryName={queryName}
                                        />
                                    </CCol>

                                    {/* Data Section */}
                                    <CCol
                                        md="4"
                                        className="d-flex flex-column"
                                        style={{ overflowY: "auto", maxHeight: "100%" }}
                                    >
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
                                                                height: "650px",
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
            {/* Chat icon floating at bottom right */}
            <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
                <Chaticon />
            </div>
        </div>
    )
}

export default Chart
