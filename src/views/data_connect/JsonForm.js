import React from "react"
import { CForm, CFormLabel, CFormInput, CButton } from "@coreui/react"

const JsonForm = () => {
    return (
        <div className="p-4 mt-4 shadow-sm border rounded-lg bg-white">
            <h4 className="mb-4 text-center">Upload JSON File</h4>
            <CForm>
                <div className="form-group mb-3">
                    <CFormLabel htmlFor="url">URL</CFormLabel>
                    <CFormInput
                        type="text"
                        id="url"
                        name="url"
                        // value={database.title}
                        // onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <CFormLabel htmlFor="token">Token</CFormLabel>
                    <CFormInput
                        type="text"
                        id="token"
                        name="token"
                        // value={database.host}
                        // onChange={handleChange}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <CButton color="primary">Submit</CButton>
                </div>
            </CForm>
            
        </div>
    )
}

export default JsonForm
