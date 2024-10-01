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
    { label: "Filter", icon: <FaFilter />, chartType: "filter" },
    { label: "Text", icon: <FaTextHeight />, chartType: "text" },
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
}) => {
    // Enhanced icon click handler with validation
    const onIconClick = (chartType) => {
        if (!xAxisColumn) {
            alert("Please select an X-axis column before choosing a chart.")
            return
        }
        if (!yAxisColumn) {
            alert("Please select a Y-axis column before choosing a chart.")
            return
        }

        // Call the existing icon click handler if validation passes
        handleIconClick(chartType)
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
                                width: "24%", // Controls number of icons per row
                                textAlign: "center",
                                cursor: "pointer",
                                margin: "1px", // Adds a 1px gap between icons
                            }}
                            onClick={() => onIconClick(item.chartType)} // Handle click event with validation
                        >
                            <div
                                style={{
                                    fontSize: "1.2rem",
                                    color: "#333",
                                    border: "1px solid #ccc", // Adding border
                                    padding: "8px",
                                    borderRadius: "8px", // Rounded corners
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

                <hr className="mb-2" />

                <div className="p-2">
                    <p className="mb-3 fw-bold">Selected Columns</p>
                    {selectedColumns.length > 0 ? (
                        selectedColumns.map((column, index) => (
                            <div key={index} className="d-flex align-items-center mb-2 column-box">
                                <span className="flex-grow-1 text-truncate" title={column.label}>
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

                    {/* Dropdowns for X-axis and Y-axis */}
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
    )
}

export default VisualizationSection
