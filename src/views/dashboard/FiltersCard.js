import React, { useState, useCallback } from "react"
import {
    CCard,
    CCardHeader,
    CCardBody,
    CFormInput,
    CButton,
    CFormSelect,
    CRow,
    CCol,
} from "@coreui/react"

const FiltersCard = ({ selectedColumns = [], data = [], onFiltersChange }) => {
    const [filters, setFilters] = useState([])
    const [currentFilter, setCurrentFilter] = useState({
        column: null, // Store the full column object
        operator: "equals",
        value: "",
    })

    // Instead of just using the column label, keep the full column object
    const availableColumns = selectedColumns

    const column_values = data.length > 0 ? data[0].map((col) => col.label) : []

    const values = {}

    if (data.length > 1) {
        column_values.forEach((column_value, index) => {
            values[column_value] = data.slice(1).map((row) => row[index])
        })
    }

    const operators = ["equals", "not equals", "is set", "is not set"]

    // Handle adding a filter and trigger the callback
    const handleAddFilter = useCallback(() => {
        if (currentFilter.column && currentFilter.value) {
            const updatedFilters = [...filters, currentFilter]
            setFilters(updatedFilters)
            setCurrentFilter({ column: null, operator: "equals", value: "" })

            // Notify parent component of filter changes (Triggers API call)
            onFiltersChange(updatedFilters)
        }
    }, [currentFilter, filters, onFiltersChange])

    // Handle removing a filter and trigger the callback
    const handleRemoveFilter = useCallback(
        (index) => {
            const updatedFilters = filters.filter((_, i) => i !== index)
            setFilters(updatedFilters)

            // Notify parent component of filter changes (Triggers API call)
            onFiltersChange(updatedFilters)
        },
        [filters, onFiltersChange],
    )

    const isDropdownValueField =
        currentFilter.operator === "equals" || currentFilter.operator === "not equals"

    const columnValues = currentFilter.column ? values[currentFilter.column.label] || [] : []

    return (
        <CCard className="h-100 mb-0">
            <CCardHeader>Filters</CCardHeader>
            <CCardBody className="p-2">
                {/* Select Column Dropdown */}
                <CRow className="mb-3">
                    <CCol>
                        <CFormSelect
                            value={currentFilter.column ? currentFilter.column.label : ""}
                            onChange={(e) => {
                                const selectedColumn = availableColumns.find(
                                    (col) => col.label === e.target.value,
                                )
                                setCurrentFilter({ ...currentFilter, column: selectedColumn })
                            }}
                            aria-label="Select a column"
                        >
                            <option value="">Select a column</option>
                            {availableColumns.map((col, idx) => (
                                <option key={idx} value={col.label}>
                                    {col.label}
                                </option>
                            ))}
                        </CFormSelect>
                    </CCol>
                </CRow>

                {/* Operator Dropdown */}
                <CRow className="mb-3">
                    <CCol>
                        <CFormSelect
                            value={currentFilter.operator}
                            onChange={(e) =>
                                setCurrentFilter({ ...currentFilter, operator: e.target.value })
                            }
                            aria-label="Select an operator"
                        >
                            {operators.map((operator, idx) => (
                                <option key={idx} value={operator}>
                                    {operator}
                                </option>
                            ))}
                        </CFormSelect>
                    </CCol>
                </CRow>

                {/* Value Input / Dropdown */}
                <CRow className="mb-3">
                    <CCol>
                        {isDropdownValueField && columnValues.length > 0 ? (
                            <CFormSelect
                                value={currentFilter.value}
                                onChange={(e) =>
                                    setCurrentFilter({ ...currentFilter, value: e.target.value })
                                }
                                aria-label="Select a value"
                            >
                                <option value="">Select a value</option>
                                {columnValues.map((val, idx) => (
                                    <option key={idx} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </CFormSelect>
                        ) : (
                            <CFormInput
                                placeholder="Value"
                                value={currentFilter.value}
                                onChange={(e) =>
                                    setCurrentFilter({ ...currentFilter, value: e.target.value })
                                }
                                aria-label="Enter filter value"
                            />
                        )}
                    </CCol>
                </CRow>

                {/* Add Filter Button */}
                <CRow className="mb-3">
                    <CCol>
                        <CButton color="primary" onClick={handleAddFilter}>
                            Add Filter
                        </CButton>
                    </CCol>
                </CRow>

                {/* Display Filters */}
                <div className="mt-3">
                    {filters.length > 0 && (
                        <div>
                            {filters.map((filter, index) => (
                                <div
                                    key={index}
                                    className="d-flex justify-content-between align-items-center mb-2"
                                >
                                    <span>
                                        {filter.column.label} {filter.operator} {filter.value}
                                    </span>
                                    <button
                                        className="btn btn-link text-danger p-0 ms-1"
                                        onClick={() => handleRemoveFilter(index)}
                                        aria-label="Remove column"
                                        style={{
                                            fontSize: "1rem",
                                            lineHeight: "1",
                                        }}
                                    >
                                        &#x2715;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CCardBody>
        </CCard>
    )
}

export default FiltersCard
