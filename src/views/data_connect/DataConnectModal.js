import React, { useState } from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CForm, CFormLabel, CFormInput } from '@coreui/react';
import PropTypes from 'prop-types';
import axios from 'axios';
import API_URL from '../../config';

const DataConnectModal = ({ modal, setModal }) => {

    const [database, setDatabase] = useState({
        host: 'localhost',
        name: '_9360912a0d7d58b2',
        password: 'password',
        port: '3306',
        title: 'test2',
        type: 'MariaDB',
        username: 'root'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatabase({
            ...database,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const formattedDatabase = {
            ...database,
            port: parseInt(database.port, 10)
        };
        console.log({"database": formattedDatabase});
        try {
            const response = await axios.post(API_URL + '/api/method/insights.api.setup.test_database_connection', {"database": formattedDatabase});
            console.log(11111111111, response);
            console.log(11111111111, response.data.message);
            if (response.data.message[0] === 'Account') {
                setStatus('The database is now active.');
                const response1 = await axios.post(API_URL + '/api/method/insights.api.setup.add_database', {"database": formattedDatabase});
                console.log(response1);
                setModal(false);
            } else {
                setStatus('The database is now inactive.');
            }
        } catch (error) {
            setStatus('Error connecting to the database.');
        }
    };

    return (
        <CModal visible={modal} onClose={() => setModal(false)} backdrop={true}>
            <CModalHeader onClose={() => setModal(false)}>
                Database Connection
            </CModalHeader>
            <CModalBody>
                <CForm>
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
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setModal(false)}>
                    Close
                </CButton>
                <CButton color="primary" onClick={handleSubmit}>Save changes</CButton>
            </CModalFooter>
        </CModal>
    );
};

DataConnectModal.propTypes = {
    modal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired,
};

export default DataConnectModal;
