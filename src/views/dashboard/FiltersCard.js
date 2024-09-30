// FiltersCard.js
import React from "react"
import { CCard, CCardHeader, CCardBody, CFormInput, CButton } from "@coreui/react"

const FiltersCard = ({ searchQuery, setSearchQuery }) => (
    <CCard className="h-100 mb-0">
        <CCardHeader>Filters</CCardHeader>
        <CCardBody>
            <CFormInput
                placeholder="Search"
                className="mb-2"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
            />
            <p className="mb-2">Filters on this page</p>
            <CButton color="secondary" variant="outline" className="w-100 mb-2">
                Add data fields here
            </CButton>
        </CCardBody>
    </CCard>
)

export default FiltersCard
