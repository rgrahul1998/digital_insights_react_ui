import React from "react"
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

const IconsList = ({ onIconClick }) => {
    // Function to handle icon click and send chart type to parent
    const handleIconClick = (chartType) => {
        onIconClick(chartType) // Call parent function
    }

    return (
        <>
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
                        onClick={() => handleIconClick(item.chartType)} // Handle click event
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
        </>
    )
}

export default IconsList
