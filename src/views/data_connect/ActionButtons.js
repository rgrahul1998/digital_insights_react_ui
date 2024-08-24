import React, { useState } from 'react';
import { CRow, CCol, CButton } from '@coreui/react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import API_URL from '../../config';

const ActionButtons = () => {
    const [data, setData] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const handleConnectDataSource = async () => {
        try {
            const response = await axios.post(API_URL + '/api/method/frappe.client.get_list', {
                debug: 0,
                doctype: "Insights Data Source",
                fields: ["name", "title", "status", "creation", "modified", "is_site_db", "database_type", "allow_imports"],
                filters: {},
                limit: 100,
                limit_page_length: 100,
                limit_start: 0,
                order_by: "creation desc",
                start: 0
            });

            if (response.status === 200) {
                setData(response.data.message);
                setShowTable(true);
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRowClick = (row) => {
        alert(`You clicked on ${row.title}`);
        // Navigate to another page or perform another action
    };

    return (
        <div>
            <CRow className="mb-5 d-flex justify-content-center">
                <CCol md="5" className="mb-3">
                    <CButton
                        block
                        color="primary"
                        size="lg"
                        style={{
                            backgroundColor: '#007bff',
                            color: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            fontSize: '1.2rem',
                            padding: '15px 20px',
                            width: "100%"
                        }}
                        onClick={handleConnectDataSource}
                    >
                        Connect Data Source
                    </CButton>
                </CCol>
                <CCol md="5" className="mb-3">
                    <CButton
                        block
                        color="success"
                        size="lg"
                        style={{
                            backgroundColor: '#28a745',
                            color: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            fontSize: '1.2rem',
                            padding: '15px 20px',
                            width: "100%"
                        }}
                        onClick={() => alert('Create a Query clicked')}
                    >
                        Create a Query
                    </CButton>
                </CCol>
            </CRow>

            {showTable && (
                <TableContainer component={Paper} style={{ marginTop: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">Title</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">Status</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">Database Type</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow 
                                    key={index} 
                                    hover 
                                    onClick={() => handleRowClick(row)} 
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.database_type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ActionButtons;
