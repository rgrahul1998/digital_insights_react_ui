import React, { useState } from "react"
import { CForm, CFormCheck, CFormLabel, CFormInput, CButton, CSpinner, CAlert } from "@coreui/react"
import axios from "axios"
import API_URL from "../../config"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const DatabaseForm = () => {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("")
    const [database, setDatabase] = useState({
        host: "localhost",
        name: "_36a28d4c89e67360",
        password: "password",
        port: "3306",
        title: "test2",
        type: "MariaDB",
        username: "root",
    })

    const handleChange = (e) => {
        setDatabase({
            ...database,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async () => {
        setStatus("")
        setLoading(true)

        const formattedDatabase = {
            ...database,
            port: parseInt(database.port, 10),
        }

        try {
            const response = await axios.post(
                `${API_URL}/api/method/insights.api.setup.test_database_connection`,
                { database: formattedDatabase },
            )

            if (response.data.message[0] === "Account") {
                try {
                    await axios.post(`${API_URL}/api/method/insights.api.setup.add_database`, {
                        database: formattedDatabase,
                    })
                    setStatus("Data source has been added successfully!")
                    toast.success("Data source has been added!", { autoClose: 3000 })
                } catch (error) {
                    setStatus(
                        error.response && error.response.data.exc_type === "DuplicateEntryError"
                            ? "The database already exists."
                            : "Error adding the database.",
                    )
                }
            } else {
                setStatus("The database is now inactive.")
            }
        } catch (error) {
            setStatus("Error connecting to the database.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 mt-4 shadow-sm border rounded-lg bg-white">
            <h4 className="mb-4 text-center">Database Connection</h4>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <CSpinner color="primary" />
                </div>
            ) : (
                <CForm>
                    <div className="form-group mb-3">
                        <CFormLabel htmlFor="title">Title</CFormLabel>
                        <CFormInput
                            type="text"
                            id="title"
                            name="title"
                            value={database.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <CFormLabel htmlFor="host">Host</CFormLabel>
                        <CFormInput
                            type="text"
                            id="host"
                            name="host"
                            value={database.host}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <CFormLabel htmlFor="port">Port</CFormLabel>
                        <CFormInput
                            type="number"
                            id="port"
                            name="port"
                            value={database.port}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <CFormLabel htmlFor="name">Database Name</CFormLabel>
                        <CFormInput
                            type="text"
                            id="name"
                            name="name"
                            value={database.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <CFormLabel htmlFor="username">Username</CFormLabel>
                        <CFormInput
                            type="text"
                            id="username"
                            name="username"
                            value={database.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <CFormLabel htmlFor="password">Password</CFormLabel>
                        <CFormInput
                            type="password"
                            id="password"
                            name="password"
                            value={database.password}
                            onChange={handleChange}
                        />
                    </div>
                </CForm>
            )}

            {status && (
                <CAlert
                    color={status.includes("successfully") ? "success" : "danger"}
                    className="mt-3"
                >
                    {status}
                </CAlert>
            )}

            <div className="d-flex justify-content-end mt-4">
                <CButton color="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Adding..." : "Add Datasource"}
                </CButton>
            </div>
        </div>
    )
}

export default DatabaseForm
