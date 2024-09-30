import React, { useState } from "react"
import { CListGroup, CListGroupItem } from "@coreui/react"
import axios from "axios"
import API_URL from "../../config"
import { CIcon } from "@coreui/icons-react"
import { cilCalendar, cilCalculator } from "@coreui/icons" // Icons for date and integer

const TreeNode = ({
    node,
    onSelect,
    selectedDataSource,
    selectedDataSourceType,
    selectedColumns,
    setSelectedColumns,
}) => {
    const [expanded, setExpanded] = useState(false)
    const [childNodes, setChildNodes] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleToggle = (e) => {
        e.stopPropagation()
        setExpanded((prevExpanded) => !prevExpanded)
    }

    const handleSelect = () => {
        if (!childNodes) {
            // Fetch child nodes (columns) if not already loaded
            setLoading(true)
            axios
                .post(
                    `${API_URL}/api/method/digital_insights.digital_insights.api.fetch_related_tables_columns.fetch_related_tables_columns`,
                    {
                        table_names:
                            selectedDataSourceType === "SQLite"
                                ? [node.label]
                                : ["tab" + node.label],
                        data_source: selectedDataSource,
                    },
                )
                .then((response) => {
                    const columns = response.data.message || []
                    setChildNodes(columns)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error("API Error:", error)
                    setLoading(false)
                    setChildNodes([])
                })
        }
        onSelect(node.label)
    }

    const handleCheckboxChange = (child) => {
        setSelectedColumns((prev) => {
            const isAlreadySelected = prev.find((col) => col.label === child.label)
            if (isAlreadySelected) {
                return prev.filter((col) => col.label !== child.label) // Remove if already selected
            } else {
                return [...prev, child]
            }
        })
    }

    const getIconForType = (type) => {
        switch (type) {
            case "Integer":
                return <CIcon icon={cilCalculator} size="sm" className="me-2" />
            case "Date":
                return <CIcon icon={cilCalendar} size="sm" className="me-2" />
            default:
                return null // No icon for other types
        }
    }

    return (
        <>
            <CListGroupItem
                className="d-flex align-items-center py-1"
                onClick={handleSelect}
                style={{
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    border: "none",
                    padding: "0",
                    margin: "0",
                }}
            >
                {childNodes && childNodes.length > 0 && (
                    <button
                        onClick={handleToggle}
                        style={{
                            border: "none",
                            background: "none",
                            fontSize: "0.9rem",
                            marginRight: "0.5rem",
                        }}
                    >
                        {expanded ? "-" : "+"}
                    </button>
                )}
                <span>{node.label}</span>
                {loading && <span className="ms-2">Loading...</span>}
            </CListGroupItem>
            {expanded && childNodes && childNodes.length > 0 && (
                <div style={{ marginLeft: "1rem" }}>
                    {childNodes.map((child) => (
                        <div
                            key={child.id || child.label}
                            className="d-flex align-items-center py-1"
                            style={{ fontSize: "0.9rem" }}
                        >
                            <input
                                type="checkbox"
                                className="me-2"
                                onChange={() => handleCheckboxChange(child)}
                                checked={selectedColumns.some((col) => col.label === child.label)}
                            />
                            {getIconForType(child.type)} {/* Render icon based on type */}
                            <span>{child.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

const TreeView = ({
    items,
    onSelect,
    selectedDataSource,
    selectedDataSourceType,
    selectedColumns,
    setSelectedColumns,
}) => (
    <CListGroup border style={{ padding: "0", margin: "0" }}>
        {items.map((item) => (
            <TreeNode
                key={item.id}
                node={item}
                onSelect={onSelect}
                selectedDataSource={selectedDataSource}
                selectedDataSourceType={selectedDataSourceType}
                selectedColumns={selectedColumns}
                setSelectedColumns={setSelectedColumns}
            />
        ))}
    </CListGroup>
)

export default TreeView
