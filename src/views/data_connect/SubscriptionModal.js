import { CButton, CModal, CModalBody } from "@coreui/react"
import { useNavigate } from "react-router-dom"

const SubscriptionModal = ({ visible, onClose }) => {
    const navigate = useNavigate()

    const handleBuyNowClick = () => {
        // Navigate to the specified path
        navigate("/dashboard/subscription")
    }
    return (
        <CModal visible={visible} onClose={onClose} alignment="center">
            <CModalBody
                className="p-4"
                style={{
                    backgroundColor: "#f9f9f9",
                    textAlign: "left",
                    maxWidth: "800px",
                    margin: "auto",
                }}
            >
                <h5
                    className="mb-3"
                    style={{ fontWeight: "600", fontSize: "1.25rem", color: "#333" }}
                >
                    Upgrade Your Business Intelligence App License
                </h5>
                <p className="text-muted mb-4" style={{ fontSize: "1rem", color: "#666" }}>
                    Unlock premium features by upgrading your license. Gain access to:
                </p>
                <ul className="list-unstyled mb-4" style={{ padding: "0", margin: "0" }}>
                    <li className="mb-2" style={{ fontSize: "1rem", color: "#444" }}>
                        ⚡ Real-time refresh for your datasets
                    </li>
                    <li className="mb-2" style={{ fontSize: "1rem", color: "#444" }}>
                        💾 100GB data storage
                    </li>
                    <li className="mb-2" style={{ fontSize: "1rem", color: "#444" }}>
                        🤖 Advanced AI and ML features for data analysis
                    </li>
                </ul>
                <p className="text-muted mb-4" style={{ fontSize: "1rem", color: "#666" }}>
                    Contact our{" "}
                    <a
                        href="#"
                        className="text-primary"
                        style={{ color: "#007bff", textDecoration: "none" }}
                    >
                        Admin
                    </a>{" "}
                    for a free 7-day trial.
                </p>
                <div className="text-right">
                    <CButton
                        color="primary"
                        size="lg"
                        className="w-100"
                        onClick={handleBuyNowClick} // Handle the button click
                    >
                        Buy Now
                    </CButton>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default SubscriptionModal
