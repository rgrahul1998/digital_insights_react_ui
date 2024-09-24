import React, { useState } from "react"
import { CListGroup, CListGroupItem } from "@coreui/react"
import axios from "axios"
import API_URL from "../../config"

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
        setExpanded(!expanded)
    }

    const handleSelect = () => {
        if (!childNodes) {
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
                    const columns = response.data.message
                    const fetchedChildNodes = columns.map((column, index) => ({
                        id: `${node.id}-${index}`,
                        label: column.column,
                    }))
                    setChildNodes(fetchedChildNodes)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error("API Error:", error)
                    setLoading(false)
                })
        }
        onSelect(node.label)
    }

    const handleCheckboxChange = (child) => {
        setSelectedColumns((prev) => {
            if (prev.includes(child.label)) {
                return prev.filter((col) => col !== child.label) // Remove if already selected
            } else {
                return [...prev, child.label] // Add if not selected
            }
        })
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
                            key={child.id}
                            className="d-flex align-items-center py-1"
                            style={{ fontSize: "0.9rem" }}
                        >
                            <input
                                type="checkbox"
                                className="me-2"
                                onChange={() => handleCheckboxChange(child)}
                                checked={selectedColumns.includes(child.label)} // Check if this column is selected
                            />
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
                setSelectedColumns={setSelectedColumns} // Pass the setSelectedColumns function
            />
        ))}
    </CListGroup>
)

export default TreeView
