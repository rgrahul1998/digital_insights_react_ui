import React from "react"
import { CForm, CFormLabel, CFormInput, CFormSelect, CButton } from "@coreui/react"

const CsvForm = () => {
    return (
        <div className="p-4 mt-4 shadow-sm border rounded-lg bg-white">
            <h4 className="mb-4 text-center">Upload CSV File</h4>
            <CForm>
                <div className="form-group mb-3">
                    <CFormLabel htmlFor="csvFile">Select CSV File</CFormLabel>
                    <CFormInput type="file" id="csvFile" name="csvFile" accept=".csv" />
                </div>
                <div className="form-group mb-3">
                    <CFormLabel htmlFor="domain">Select Domain</CFormLabel>
                    <CFormSelect id="domain" name="domain">
                        <option value=""></option>
                        <option value="finance">Finance</option>
                        <option value="investing">Investing</option>
                        <option value="stock-market">Stock Market</option>
                        <option value="e-commerce">E-commerce</option>
                        <option value="manufacturing">Manufacturing</option>
                    </CFormSelect>
                </div>
                <div className="d-flex justify-content-end">
                    <CButton color="primary">Upload</CButton>
                </div>
            </CForm>
        </div>
    )
}

export default CsvForm
