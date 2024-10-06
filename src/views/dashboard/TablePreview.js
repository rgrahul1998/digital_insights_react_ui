import React from "react"

const TablePreview = ({ data, showTablePreview }) => {
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center flex-grow-1"
            style={{
                border: "1px dashed #ddd",
                padding: "1rem",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
            }}
        >
            {showTablePreview && (
                <div
                    style={{
                        width: "100%",
                        overflowY: "auto",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                    }}
                >
                    <table className="table table-hover table-bordered table-striped mb-0">
                        <thead className="table-primary" style={{ position: "sticky", top: 0 }}>
                            <tr>
                                {data[0].map((header, index) => (
                                    <th key={index} scope="col" style={{ textAlign: "center" }}>
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            style={{ textAlign: "center", verticalAlign: "middle" }}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default TablePreview
