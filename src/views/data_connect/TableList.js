import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import API_URL from '../../config';
import { AppHeader, AppSidebar } from '../../components';
import { CContainer } from '@coreui/react';

const TableList = () => {
    const { title } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.post(`${API_URL}/api/method/run_doc_method`, {
                    dt: "Insights Data Source",
                    dn: title,
                    method: "get_tables",
                    args: null
                });
                console.log(response)
                if (response.status === 200) {
                    setDetails(response.data.message);
                } else {
                    console.error('Failed to fetch details:', response.statusText);
                    setError('Failed to fetch details');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred while fetching details');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [title]);

    return (
         <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <CContainer className="px-4" lg>
                        <div>
                            {loading ? (
                                <CircularProgress />
                            ) : error ? (
                                <Typography color="error">{error}</Typography>
                            ) : (
                                details && (
                                    <TableContainer component={Paper} style={{ marginTop: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                                                    <TableCell>
                                                        <Typography variant="subtitle1" fontWeight="bold">Table</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {details.map((row, index) => (
                                                <TableRow 
                                                    key={index} 
                                                    hover 
                                                    onClick={() => handleRowClick(row)} 
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <TableCell>{row.label}</TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )
                            )}
                        </div>
                    </CContainer>
                </div>
            </div>
        </div>
        
    );
};

export default TableList;
