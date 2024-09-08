import React from "react"
import { CCard, CCardText } from "@coreui/react"
import CIcon from "@coreui/icons-react"

const CardItem = ({ icon, color, text, isSelected, onClick }) => {
    return (
        <CCard
            className={`text-center p-4 shadow-sm border-0 rounded-lg ${isSelected ? "selected-card" : ""}`}
            style={{
                transition: "all 0.3s ease",
                cursor: "pointer",
                backgroundColor: isSelected ? "#d8f3dc" : "#f9f9f9",
            }}
            onMouseOver={(e) => {
                if (!isSelected) {
                    e.currentTarget.style.transform = "translateY(-5px)"
                    e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.15)"
                }
            }}
            onMouseOut={(e) => {
                if (!isSelected) {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 6px 10px rgba(0,0,0,0.05)"
                }
            }}
            onClick={onClick}
        >
            <CIcon icon={icon} size="3xl" className={`mb-3 text-${color}`} />
            <CCardText className="font-weight-bold text-muted">{text}</CCardText>
        </CCard>
    )
}

export default CardItem
