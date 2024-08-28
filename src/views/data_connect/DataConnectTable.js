import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const DataConnectTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleConnectDataSource = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/api/method/frappe.client.get_list`, {
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
            console.log(response)
            if (response.status === 200) {
                setData(response.data.message);
            } else {
                console.error('Failed to fetch data:', response.statusText);
                setError('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleConnectDataSource();
    }, []);

    const handleRowClick = (row) => {
        navigate(`/dashboard/data-connect/${row.title}`);
    };

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
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

export default DataConnectTable;
