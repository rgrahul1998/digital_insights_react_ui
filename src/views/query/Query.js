// src/views/Query.jsx

import React, { useState } from "react"
import { AppSidebar, AppFooter, AppHeader } from "../../components/index"
import { CContainer, CButton } from "@coreui/react"
import QueryList from "./QueryList"
import NewQueryModal from "./NewQueryModal" // Import the modal component

const Query = () => {
    const [visible, setVisible] = useState(false)

    const handleButtonClick = () => {
        setVisible(true)
    }

    const closeModal = () => {
        setVisible(false)
    }

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <CContainer className="px-4" lg>
                        <div className="d-flex justify-content-end">
                            <CButton color="primary" onClick={handleButtonClick}>
                                Add New Query
                            </CButton>
                        </div>
                        <QueryList />
                    </CContainer>
                </div>
                <AppFooter />
            </div>

            <NewQueryModal visible={visible} onClose={closeModal} />
        </div>
    )
}

export default Query
