import React from "react"
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormLabel,
    CFormInput,
    CButton,
    CRow,
    CCol,
} from "@coreui/react"

const ExternalApiModal = ({ visible, onClose }) => {
    return (
        <CModal visible={visible} onClose={onClose} alignment="center">
            <CModalHeader>
                <CModalTitle>External Api</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    <CRow className="mb-3">
                        <CCol md="12">
                            <CFormLabel htmlFor="url">URL</CFormLabel>
                            <CFormInput type="text" id="url" placeholder="Enter URL" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CCol md="12">
                            <CFormLabel htmlFor="token">Token</CFormLabel>
                            <CFormInput type="text" id="token" placeholder="Enter Token" />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="12">
                            <CButton type="submit" color="primary" className="w-100">
                                Submit
                            </CButton>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
        </CModal>
    )
}

export default ExternalApiModal
