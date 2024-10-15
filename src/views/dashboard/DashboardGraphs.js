import React, { useEffect } from "react"
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"

const DashboardGraphs = ({ selectedChartType, xAxisColumn, yAxisColumn, data }) => {
    // UseEffect hook to render the chart when selectedChartType, xAxisColumn, yAxisColumn, or data changes
    useEffect(() => {
        if (selectedChartType && xAxisColumn && yAxisColumn && data.length) {
            const chartElement = document.getElementById("chart-container")
            // Clear any existing chart before rendering a new one
            chartElement.innerHTML = ""

            // Get headers from the first row of the data
            const headers = data[0].map((header) => header.label) // This should match your headers format

            // Determine the indices of x-axis and y-axis columns
            const xAxisIndex = headers.indexOf(xAxisColumn[0])
            const yAxisIndex = headers.indexOf(yAxisColumn[0])

            // Check if the indices are valid
            if (xAxisIndex === -1 || yAxisIndex === -1) {
                console.error("Invalid x-axis or y-axis column selected.")
                return
            }

            // Extract x and y values based on selected columns
            const labels = data.slice(1).map((item) => item[xAxisIndex]) // Slice to skip headers
            const values = data.slice(1).map((item) => item[yAxisIndex]) // Slice to skip headers

            // Create the chart
            new Chart(chartElement, {
                type: selectedChartType, // Use the chart type passed down
                data: {
                    labels: labels, // Set dynamic labels
                    datasets: [
                        {
                            name: "Dataset 1",
                            type: selectedChartType,
                            values: values, // Set dynamic values
                        },
                    ],
                },
                colors: ["#21BA45"],
            })
        }
    }, [selectedChartType, xAxisColumn, yAxisColumn, data]) // Add dependencies

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center flex-grow-1"
            style={{ border: "1px dashed #ddd", width: "100%", padding: "20px" }}
        >
            <h4 className="mb-2">Dashboard Graphs</h4>
            <div id="chart-container" style={{ width: "100%", height: "300px" }}></div>
        </div>
    )
}

export default DashboardGraphs
