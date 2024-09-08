import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
    CButton,
    CContainer,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from "@coreui/react"
import { AiOutlineTable, AiOutlinePlayCircle } from "react-icons/ai"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-sql"
import "ace-builds/src-noconflict/theme-github"
import { AppHeader, AppSidebar } from "../../components"
import API_URL from "../../config"

const QueryPage = () => {
    const { queryName } = useParams()
    const [dataSources, setDataSources] = useState([])
    const [selectedDataSource, setSelectedDataSource] = useState("Select data source")
    const [queryData, setQueryData] = useState("")

    useEffect(() => {
        // Fetch data sources on component mount
        const fetchDataSources = async () => {
            try {
                const response = await fetch(`${API_URL}/api/method/frappe.client.get_list`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        debug: 0,
                        doctype: "Insights Data Source",
                        fields: [
                            "name",
                            "title",
                            "status",
                            "creation",
                            "modified",
                            "is_site_db",
                            "database_type",
                            "allow_imports",
                        ],
                        filters: {},
                        limit: 100,
                        limit_page_length: 100,
                        limit_start: 0,
                        order_by: "creation desc",
                        start: 0,
                    }),
                })

                if (!response.ok) {
                    throw new Error("Failed to fetch data sources")
                }

                const data = await response.json()
                setDataSources(data.message || [])
            } catch (error) {
                console.error("Error fetching data sources:", error)
            }
        }

        fetchDataSources()
    }, [])

    useEffect(() => {
        if (queryName) {
            // Fetch query data based on queryId
            const fetchQueryData = async () => {
                try {
                    const response = await fetch(`${API_URL}/api/method/frappe.client.get`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            doctype: "Insights Query",
                            name: queryName,
                        }),
                    })
                    console.log(response)
                    if (!response.ok) {
                        throw new Error("Failed to fetch query data")
                    }

                    const result = await response.json()
                    console.log(result)

                    setQueryData(result.message.sql_query || "")
                    setSelectedDataSource(result.message.data_source || "Select data source")
                } catch (error) {
                    console.error("Error fetching query data:", error)
                }
            }

            fetchQueryData()
        }
    }, [queryName])

    const handleDataSourceSelect = async (dataSourceName) => {
        setSelectedDataSource(dataSourceName)

        try {
            const response = await fetch(`${API_URL}/api/method/frappe.client.set_value`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctype: "Insights Query",
                    fieldname: { data_source: dataSourceName },
                    data_source: dataSourceName,
                    name: queryName,
                }),
            })
            if (!response.ok) {
                throw new Error("Failed to set data source")
            }

            const result = await response.json()
            console.log("Set data source response:", result)
        } catch (error) {
            console.error("Error setting data source:", error)
        }
    }

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <CContainer className="px-4" lg>
                        <div className="d-flex justify-content-end">
                            <CDropdown>
                                <CDropdownToggle color="primary">
                                    {selectedDataSource}
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    {dataSources.map((source) => (
                                        <CDropdownItem
                                            key={source.name}
                                            onClick={() => handleDataSourceSelect(source.name)}
                                        >
                                            {source.title}
                                        </CDropdownItem>
                                    ))}
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <AceEditor
                            mode="sql"
                            theme="github"
                            value={queryData}
                            width="100%"
                            fontSize={16}
                            setOptions={{ useWorker: false }}
                            showGutter
                            highlightActiveLine
                            name="queryEditor"
                        />
                        <div className="d-flex mt-2">
                            <CButton color="primary" variant="outline" className="me-2">
                                <AiOutlineTable className="me-2" />
                                Preview Data
                            </CButton>
                            <CButton color="primary">
                                <AiOutlinePlayCircle className="me-2" />
                                Run Query
                            </CButton>
                        </div>
                    </CContainer>
                </div>
            </div>
        </div>
    )
}

export default QueryPage
