import React from "react"
import {
    CContainer,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CButton,
    CListGroup,
    CListGroupItem,
    CBadge,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilCheckCircle, cilXCircle } from "@coreui/icons"
import { AppHeader, AppSidebar } from "../../components"

const SubscriptionPage = () => {
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <CContainer className="px-4" lg>
                        <CRow className="justify-content-center">
                            <CCol xs="12" className="text-center">
                                <h3>Upgrade to Pro</h3>
                                <p className="text-muted">
                                    Unlock premium features and get the most out of our platform
                                    with the Pro subscription.
                                </p>
                            </CCol>
                        </CRow>

                        <CRow className="mt-4 justify-content-center">
                            {/* Free Plan */}
                            <CCol xs="12" md="6" lg="5" className="mb-4">
                                <CCard className="text-center border-light shadow-sm h-100">
                                    <CCardBody>
                                        <h4>Free Plan</h4>
                                        <CListGroup flush>
                                            <CListGroupItem>
                                                <CIcon
                                                    icon={cilCheckCircle}
                                                    className="text-success me-2"
                                                />{" "}
                                                Access to basic features
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CIcon
                                                    icon={cilCheckCircle}
                                                    className="text-success me-2"
                                                />{" "}
                                                Limited data sources
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CIcon
                                                    icon={cilXCircle}
                                                    className="text-danger me-2"
                                                />{" "}
                                                No priority support
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CIcon
                                                    icon={cilXCircle}
                                                    className="text-danger me-2"
                                                />{" "}
                                                Limited queries per month
                                            </CListGroupItem>
                                        </CListGroup>
                                        <CBadge color="secondary" className="mt-3">
                                            Free
                                        </CBadge>
                                    </CCardBody>
                                </CCard>
                            </CCol>

                            {/* Pro Plan */}
                            <CCol xs="12" md="6" lg="5" className="mb-4">
                                <CCard className="text-center border-primary shadow-sm h-100">
                                    <CCardBody>
                                        <h4>Pro Plan</h4>
                                        <CListGroup flush>
                                            <CListGroupItem>
                                                <CIcon
                                                    icon={cilCheckCircle}
                                                    className="text-success me-2"
                                                />{" "}
                                                Access to all features
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CIcon
                                                    icon={cilCheckCircle}
                                                    className="text-success me-2"
                                                />{" "}
                                                Unlimited data sources
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CIcon
                                                    icon={cilCheckCircle}
                                                    className="text-success me-2"
                                                />{" "}
                                                Priority support
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CIcon
                                                    icon={cilCheckCircle}
                                                    className="text-success me-2"
                                                />{" "}
                                                Unlimited queries per month
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CIcon
                                                    icon={cilCheckCircle}
                                                    className="text-success me-2"
                                                />{" "}
                                                Advanced analytics tools
                                            </CListGroupItem>
                                        </CListGroup>
                                        <CBadge color="primary" className="mt-3">
                                            $29.99/month
                                        </CBadge>
                                        <CButton color="primary" className="mt-4" size="lg">
                                            Buy Pro
                                        </CButton>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPage
