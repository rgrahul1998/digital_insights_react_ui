import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
    CButton,
    CContainer,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFormInput,
} from "@coreui/react"
import {
    AiOutlineDatabase,
    AiOutlineTable,
    AiOutlineFilter,
    AiOutlineColumnHeight,
} from "react-icons/ai"
import { AppHeader, AppSidebar } from "../../components"
import { fetchQueryData, fetchTables, setDataSource } from "../../api/VisualQueryApi"
import { DataSourceListApi } from "../../api/DataSourceListApi"

const VisualQueryPage = () => {
    const { queryName } = useParams()

    // State hooks
    const [dataSources, setDataSources] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedDataSource, setSelectedDataSource] = useState("Select data source")
    const [tables, setTables] = useState([]) // State to store fetched tables
    const [selectedTables, setSelectedTables] = useState([]) // To store selected tables
    const [searchQuery, setSearchQuery] = useState("") // Search state for filtering data source dropdown items
    const [tableSearchQuery, setTableSearchQuery] = useState("") // Search state for filtering table dropdown items

    // Fetch list of data sources from API
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

    // Fetch query data and preselect data source if available
    useEffect(() => {
        if (queryName) {
            const fetchQueryDataHandler = async () => {
                try {
                    const result = await fetchQueryData(queryName)
                    setSelectedDataSource(result.data_source || "Select data source")
                } catch (error) {
                    console.error("Error fetching query data:", error)
                }
            }
            fetchQueryDataHandler()
        }
    }, [queryName])

    // Handle data source selection
    const handleDataSourceSelect = async (dataSourceName) => {
        setSelectedDataSource(dataSourceName)

        try {
            await setDataSource(queryName, dataSourceName)
        } catch (error) {
            console.error("Error setting data source:", error)
        }
    }

    // Fetch tables based on the selected data source
    useEffect(() => {
        if (selectedDataSource !== "Select data source") {
            const fetchTablesHandler = async () => {
                try {
                    const result = await fetchTables(selectedDataSource)
                    setTables(result || [])
                } catch (error) {
                    console.error("Error fetching tables:", error)
                }
            }

            fetchTablesHandler()
        }
    }, [selectedDataSource])

    // Append selected table to the list of selected tables
    const handleTableSelect = (tableName) => {
        if (!selectedTables.includes(tableName)) {
            setSelectedTables((prevTables) => [...prevTables, tableName])
        }
    }

    // Handle search input change for data sources
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase())
    }

    // Handle search input change for tables
    const handleTableSearch = (e) => {
        setTableSearchQuery(e.target.value.toLowerCase())
    }

    // Filter data sources based on the search query
    const filteredDataSources = dataSources.filter((source) =>
        source.title.toLowerCase().includes(searchQuery),
    )

    // Filter tables based on the search query
    const filteredTables = tables.filter((table) =>
        table.label.toLowerCase().includes(tableSearchQuery),
    )

    const handleClickSearchInput = (e) => {
        e.stopPropagation() // Prevent click event from closing the dropdown
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="d-flex flex-column min-vh-100">
            <AppSidebar />
            <div className="wrapper d-flex flex-column flex-grow-1">
                <AppHeader />
                <div className="header d-flex justify-content-between align-items-center mb-3">
                    <div className="breadcrumb">
                        <span>Queries</span> / <span>Query {queryName}</span>
                    </div>
                </div>
                <CContainer fluid className="body flex-grow-1 d-flex flex-column">
                    <div className="visual-query-page d-flex flex-grow-1">
                        <div className="main-content d-flex flex-grow-1">
                            <div className="sidebar p-3">
                                <div className="section mb-3 border-bottom pb-3">
                                    <div className="tabs d-flex justify-content-between mb-3 border-bottom pb-3">
                                        <CButton size="sm" active className="w-100 text-center">
                                            Build
                                        </CButton>
                                        <CButton size="sm" className="w-100 text-center">
                                            Visualize
                                        </CButton>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <AiOutlineDatabase className="me-2" /> Data Source
                                    </div>
                                    <CDropdown>
                                        <CDropdownToggle color="primary">
                                            {selectedDataSource}
                                        </CDropdownToggle>
                                        <CDropdownMenu
                                            style={{ maxHeight: "200px", overflowY: "auto" }}
                                        >
                                            {/* Add search input */}
                                            <CFormInput
                                                size="sm"
                                                className="mb-2"
                                                placeholder="Search data source..."
                                                value={searchQuery}
                                                onChange={handleSearch}
                                                onClick={handleClickSearchInput} // Add this to prevent dropdown from closing
                                            />
                                            {/* Display filtered data sources */}
                                            {filteredDataSources.length === 0 ? (
                                                <CDropdownItem>No data sources found</CDropdownItem>
                                            ) : (
                                                filteredDataSources.map((source) => (
                                                    <CDropdownItem
                                                        key={source.name}
                                                        onClick={() =>
                                                            handleDataSourceSelect(source.name)
                                                        }
                                                    >
                                                        {source.title}
                                                    </CDropdownItem>
                                                ))
                                            )}
                                        </CDropdownMenu>
                                    </CDropdown>
                                </div>

                                <div className="section mb-3 border-bottom pb-3 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <AiOutlineTable className="me-2" /> Tables
                                    </div>
                                    <CDropdown>
                                        <CDropdownToggle size="sm" color="primary">
                                            +
                                        </CDropdownToggle>
                                        <CDropdownMenu
                                            style={{ maxHeight: "200px", overflowY: "auto" }}
                                        >
                                            {/* Add search input */}
                                            <CFormInput
                                                size="sm"
                                                className="mb-2"
                                                placeholder="Search tables..."
                                                value={tableSearchQuery}
                                                onChange={handleTableSearch}
                                            />
                                            {/* Display filtered tables */}
                                            {filteredTables.length === 0 ? (
                                                <CDropdownItem>No tables available</CDropdownItem>
                                            ) : (
                                                filteredTables.map((table, index) => (
                                                    <CDropdownItem
                                                        key={index}
                                                        onClick={() =>
                                                            handleTableSelect(table.label)
                                                        }
                                                    >
                                                        {table.label}
                                                    </CDropdownItem>
                                                ))
                                            )}
                                        </CDropdownMenu>
                                    </CDropdown>
                                </div>
                                {/* Selected Tables Display */}
                                <div className="section">
                                    <div className="d-flex align-items-center mb-2">
                                        <AiOutlineFilter className="me-2" /> Selected Tables
                                    </div>
                                    {selectedTables.length === 0 ? (
                                        <div>No tables selected</div>
                                    ) : (
                                        <ul>
                                            {selectedTables.map((table, index) => (
                                                <li key={index}>{table}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="section mb-3 border-bottom pb-3 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <AiOutlineFilter className="me-2" /> Filters
                                    </div>
                                    <CButton size="sm" color="primary">
                                        +
                                    </CButton>
                                </div>
                                <div className="section mb-3 border-bottom pb-3 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <AiOutlineColumnHeight className="me-2" /> Columns
                                    </div>
                                    <CButton size="sm" color="primary">
                                        +
                                    </CButton>
                                </div>
                                <div className="section mb-3 pb-3">
                                    <div className="d-flex align-items-center mb-2">Row Limit</div>
                                    <CFormInput size="sm" defaultValue="100" />
                                </div>
                                <div className="section mb-3 border-bottom pb-3 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">Transform</div>
                                    <CButton size="sm" color="primary">
                                        +
                                    </CButton>
                                </div>
                            </div>

                            <div className="content flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                                <div className="no-results mb-3">
                                    <img src="path/to/your/graph-icon.png" alt="Graph Icon" />
                                    <p>No results found</p>
                                </div>
                                <div className="no-results">
                                    <img src="path/to/your/table-icon.png" alt="Table Icon" />
                                    <p>No results to display</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CContainer>
            </div>
        </div>
    )
}

export default VisualQueryPage
