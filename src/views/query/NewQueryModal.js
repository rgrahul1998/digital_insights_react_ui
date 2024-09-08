// src/components/NewQueryModal.js

import React from "react"
import { useNavigate } from "react-router-dom"
import { CModal, CModalBody, CModalHeader, CModalTitle, CButton } from "@coreui/react"
import { AiOutlineBarChart, AiOutlineCode } from "react-icons/ai"

const NewQueryModal = ({ visible, onClose }) => {
    const navigate = useNavigate()

    const handleButtonClick = async (isNative) => {
        const payload = isNative ? { is_native_query: 1 } : { is_assisted_query: 1 }

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/method/insights.api.queries.create_query",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                },
            )
            if (response.ok) {
                const data = await response.json()
                const queryName = data.message.name
                if (isNative) {
                    navigate(`/dashboard/query/${queryName}`)
                } else {
                    navigate(`/dashboard/visual-query/${queryName}`)
                }
            } else {
                console.error("Failed to create query")
            }
        } catch (error) {
            console.error("An error occurred:", error)
        }
    }

    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader onClose={onClose}>
                <CModalTitle>Select Interface Type</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-between w-100 mb-4">
                        <div className="text-center" style={{ marginRight: "20px" }}>
                            <CButton
                                color="light"
                                className="mb-2"
                                onClick={() => handleButtonClick(false)}
                            >
                                <AiOutlineBarChart size={30} />
                                <div>Visual</div>
                                <small>Create a query using the visual interface</small>
                            </CButton>
                        </div>
                        <div className="text-center" style={{ marginLeft: "20px" }}>
                            <CButton
                                color="light"
                                className="mb-2"
                                onClick={() => handleButtonClick(true)}
                            >
                                <AiOutlineCode size={30} />
                                <div>SQL</div>
                                <small>Create a query by writing native query</small>
                            </CButton>
                        </div>
                    </div>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default NewQueryModal
