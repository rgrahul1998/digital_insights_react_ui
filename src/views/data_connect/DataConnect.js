import React, { useState } from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import { 
    CContainer, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, 
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CForm, CFormLabel, CFormInput, 
    CSpinner, CFormCheck
} from '@coreui/react';
import axios from 'axios';
import API_URL from '../../config';
import DataConnectTable from './DataConnectTable';

const DataConnect = () => {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [isERP, setIsERP] = useState(true); // State to toggle between ERP and External
    const [database, setDatabase] = useState({
        host: 'localhost',
        name: '_36a28d4c89e67360',
        password: 'password',
        port: '3306',
        title: 'test2',
        type: 'MariaDB',
        username: 'root'
    });
    const [status, setStatus] = useState('');

    const toggleModal = () => {
        setModal(!modal);
        setStatus(''); // Reset status when modal is toggled
        setIsERP(true); // Reset to ERP on modal open
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatabase({
            ...database,
            [name]: value,
        });
    }

    const handleCheckboxChange = (type) => {
        if (type === 'ERP') {
            setIsERP(true);
        } else {
            setIsERP(false);
        }
    }

    const handleSubmit = async () => {
        setLoading(true); // Start loading
        const formattedDatabase = {
            ...database,
            port: parseInt(database.port, 10)
        };
        try {
            const response = await axios.post(API_URL + '/api/method/insights.api.setup.test_database_connection', {"database": formattedDatabase});
            if (response.data.message[0] === 'Account') {
                console.log(2222222222222, response.data.message);
                
                // Proceed to add the database
                try {
                    const response1 = await axios.post(API_URL + '/api/method/insights.api.setup.add_database', {"database": formattedDatabase});
                    console.log(11111111111, response1);
                    setModal(false);
                } catch (error) {
                    // Check if the error is a DuplicateEntryError
                    if (error.response && error.response.data.exc_type === "DuplicateEntryError") {
                        setStatus('The database already exists.');
                    } else {
                        setStatus('Error adding the database.');
                    }
                }
            } else {
                setStatus('The database is now inactive.');
            }
        } catch (error) {
            setStatus('Error connecting to the database.');
        } finally {
            setLoading(false); // Stop loading
        }
    }
    

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <CContainer className="px-4" lg>
                        <div className="d-flex justify-content-end">
                            <CDropdown>
                                <CDropdownToggle color="primary">
                                    Add New Data Source
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem onClick={() => setModal(true)}>Connect to MariaDB</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>

                        <DataConnectTable/>

                        {/* Modal Popup Form */}
                        <CModal visible={modal} onClose={() => setModal(false)} backdrop={true}>
                            <CModalHeader onClose={() => setModal(false)}>
                                Database Connection
                            </CModalHeader>
                            <CModalBody>
                                {loading ? (
                                    // Show spinner while loading
                                    <div className="d-flex justify-content-center">
                                        <CSpinner color="primary" />
                                    </div>
                                ) : (
                                    <CForm>
                                        <div className="form-group">
                                            <CFormCheck 
                                                type="radio"
                                                id="isERP"
                                                label="Is ERP"
                                                checked={isERP}
                                                onChange={() => handleCheckboxChange('ERP')}
                                            />
                                            <CFormCheck 
                                                type="radio"
                                                id="isExternal"
                                                label="Is External"
                                                checked={!isERP}
                                                onChange={() => handleCheckboxChange('External')}
                                            />
                                        </div>
                                        {isERP ? (
                                            <>
                                                <div className="form-group">
                                                    <CFormLabel htmlFor="title">Title</CFormLabel>
                                                    <CFormInput type="text" id="title" name="title" value={database.title} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <CFormLabel htmlFor="host">Host</CFormLabel>
                                                    <CFormInput type="text" id="host" name="host" value={database.host} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <CFormLabel htmlFor="port">Port</CFormLabel>
                                                    <CFormInput type="number" id="port" name="port" value={database.port} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <CFormLabel htmlFor="name">Database Name</CFormLabel>
                                                    <CFormInput type="text" id="name" name="name" value={database.name} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <CFormLabel htmlFor="username">Username</CFormLabel>
                                                    <CFormInput type="text" id="username" name="username" value={database.username} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <CFormLabel htmlFor="password">Password</CFormLabel>
                                                    <CFormInput type="password" id="password" name="password" value={database.password} onChange={handleChange} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Dummy fields for 'is External' */}
                                                <div className="form-group">
                                                    <CFormLabel htmlFor="dummyField1">Dummy Field 1</CFormLabel>
                                                    <CFormInput type="text" id="dummyField1" name="dummyField1" />
                                                </div>
                                                <div className="form-group">
                                                    <CFormLabel htmlFor="dummyField2">Dummy Field 2</CFormLabel>
                                                    <CFormInput type="text" id="dummyField2" name="dummyField2" />
                                                </div>
                                            </>
                                        )}
                                    </CForm>
                                )}
                                {/* Status Message within the Modal */}
                                {status && (
                                    <div className={`mt-3 alert ${status.includes('active') ? 'alert-success' : 'alert-danger'}`}>
                                        {status}
                                    </div>
                                )}
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setModal(false)} disabled={loading}>
                                    Close
                                </CButton>
                                <CButton color="primary" onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Adding...' : 'Add Datasource'}
                                </CButton>
                            </CModalFooter>
                        </CModal>
                    </CContainer>
                    
                </div>
                {/* <AppFooter /> */}
            </div>
        </div>
    )
}

export default DataConnect;
