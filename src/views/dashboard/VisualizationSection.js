import React from "react"
import { CCard, CCardHeader, CCardBody } from "@coreui/react"
import {
    FaDollarSign,
    FaChartLine,
    FaChartPie,
    FaTable,
    FaFilter,
    FaTextHeight,
} from "react-icons/fa"
import { AiOutlineLineChart, AiOutlineBarChart } from "react-icons/ai"
import { IoIosStats } from "react-icons/io"
import { RiPieChart2Line, RiFileChartLine } from "react-icons/ri"
import axios from "axios"
import API_URL from "../../config"

// Define icons and chart types in a separate array for reusability
const icons = [
    { label: "Number", icon: <FaDollarSign />, chartType: "number" },
    { label: "Trend", icon: <AiOutlineLineChart />, chartType: "line" },
    { label: "Line", icon: <IoIosStats />, chartType: "line" },
    { label: "Scatter", icon: <AiOutlineBarChart />, chartType: "scatter" },
    { label: "Bar", icon: <FaChartLine />, chartType: "bar" },
    { label: "Row", icon: <RiFileChartLine />, chartType: "bar" },
    { label: "Pie", icon: <FaChartPie />, chartType: "pie" },
    { label: "Funnel", icon: <RiPieChart2Line />, chartType: "funnel" },
    { label: "Table", icon: <FaTable />, chartType: "table" },
    { label: "Progress", icon: <AiOutlineBarChart />, chartType: "progress" },
    { label: "Mixed Axis", icon: <FaChartLine />, chartType: "mixed" },
    { label: "Pivot Table", icon: <FaTable />, chartType: "pivot" },
]

const VisualizationSection = ({
    selectedColumns,
    xAxisColumn,
    setXAxisColumn,
    yAxisColumn,
    setYAxisColumn,
    handleIconClick,
    handleColumnRemove,
    queryName,
}) => {
    // Shared function for API calls to set/update chart values
    const updateChartValues = (x_axis, y_axis, chart_type) => {
        axios
            .post(
                `${API_URL}/api/method/digital_insights.digital_insights.api.set_chart_values.set_chart_values`,
                {
                    x_axis,
                    y_axis,
                    chart_type,
                    query_name: queryName,
                },
            )
            .then((response) => console.log("Chart values updated successfully:", response.data))
            .catch((error) => console.error("Error updating chart values:", error))
    }

    // Handle icon click with validation
    const onIconClick = (chartType) => {
        if (xAxisColumn.length === 0 || yAxisColumn.length === 0) {
            alert("Please select both X-axis and Y-axis columns before choosing a chart.")
            return
        }
        updateChartValues(xAxisColumn, yAxisColumn, chartType)
        handleIconClick(chartType)
    }

    // Handle X-axis and Y-axis changes
    const handleAxisChange = (e, setAxisColumn, isXAxis) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value)

        setAxisColumn(selectedOptions)

        if (isXAxis) {
            updateChartValues(selectedOptions, yAxisColumn)
        } else {
            updateChartValues(xAxisColumn, selectedOptions)
        }
    }

    return (
        <CCard className="h-100 mb-0">
            <CCardHeader>Visualizations</CCardHeader>
            <CCardBody className="p-0">
                <div className="d-flex flex-wrap">
                    {icons.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                width: "24%",
                                textAlign: "center",
                                cursor: "pointer",
                                margin: "1px",
                            }}
                            onClick={() => onIconClick(item.chartType)}
                        >
                            <div
                                style={{
                                    fontSize: "1.2rem",
                                    color: "#333",
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    borderRadius: "8px",
                                }}
                            >
                                {item.icon}
                            </div>
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

                <hr className="mb-0" />

                <div className="p-2">
                    <p className="mb-1 fw-bold">Selected Columns</p>
                    {selectedColumns.length > 0 ? (
                        selectedColumns.map((column, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    // marginBottom: "8px",
                                }}
                            >
                                <span className="flex-grow-1 text-truncate" title={column.label}>
                                    {column.label}
                                </span>
                                <button
                                    className="btn btn-link text-danger p-0 ms-1"
                                    onClick={() => handleColumnRemove(column)}
                                    aria-label="Remove column"
                                    style={{
                                        fontSize: "1rem",
                                        lineHeight: "1",
                                    }}
                                >
                                    &#x2715;
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No columns selected</p>
                    )}

                    <hr className="mb-0" />

                    {/* Dropdowns for X-axis and Y-axis */}
                    <div className="mt-1">
                        <p className="fw-bold mb-1">X-axis</p>
                        <select
                            multiple
                            value={xAxisColumn}
                            onChange={(e) => handleAxisChange(e, setXAxisColumn, true)}
                            className="form-select"
                        >
                            {selectedColumns
                                .filter((col) => col.type !== "Integer")
                                .map((col, index) => (
                                    <option key={index} value={col.label}>
                                        {col.label}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="mt-1">
                        <p className="fw-bold mb-1">Y-axis</p>
                        <select
                            multiple
                            value={yAxisColumn}
                            onChange={(e) => handleAxisChange(e, setYAxisColumn, false)}
                            className="form-select"
                        >
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
            </CCardBody>
        </CCard>
    )
}

export default VisualizationSection
