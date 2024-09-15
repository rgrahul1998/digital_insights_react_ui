import React from "react"
import { CModal, CModalHeader, CModalTitle, CModalBody } from "@coreui/react"

const CsvPreviewModal = ({ visible, onClose, csvData }) => {
    if (!csvData.length) return null

    return (
        <CModal
            size="xl" // Changed to a larger size
            visible={visible}
            onClose={onClose}
            className="preview-modal"
        >
            <CModalHeader>
                <CModalTitle>CSV Preview</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {Object.keys(csvData[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, i) => (
                                        <td key={i}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default CsvPreviewModal
