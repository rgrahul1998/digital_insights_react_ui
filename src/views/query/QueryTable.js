import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import API_URL from '../../config';

const QueryTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [secondTableData, setSecondTableData] = useState([]);
    const [secondTableLoading, setSecondTableLoading] = useState(false);

    const handleConnectDataSource = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/api/method/insights.api.queries.get_queries`, {
                debug: 0,
                doctype: "Insights Query",
                fields: ["name", "title", "status", "is_assisted_query", "is_native_query", "is_script_query",
                    "is_stored", "data_source", "creation", "owner", "owner_name", "owner_image", "chart_type"],
                filters: {},
                limit: 50,
                limit_page_length: 50,
                limit_start: 0,
                order_by: "creation desc",
                start: 0
            });
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

    const handleRowClick = async (row) => {
        setSelectedRow(row);
        setSecondTableLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/method/run_doc_method', {
                // Customize your payload based on your API requirement
                doc: row.name
            });
            if (response.status === 200) {
                setSecondTableData(response.data.message); // Update this based on your actual response structure
            } else {
                console.error('Failed to fetch data for the second table:', response.statusText);
                setError('Failed to fetch data for the second table');
            }
        } catch (error) {
            console.error('Error fetching second table data:', error);
            setError('An error occurred while fetching second table data');
        } finally {
            setSecondTableLoading(false);
        }
    };

    useEffect(() => {
        handleConnectDataSource();
    }, []);

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
                                    <Typography variant="subtitle1" fontWeight="bold">Chart Type</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">Data Source</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">ID</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">Created By</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">Created</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <React.Fragment key={index}>
                                    <TableRow 
                                        hover 
                                        onClick={() => handleRowClick(row)} 
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{row.chart_type}</TableCell>
                                        <TableCell>{row.data_source}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.owner}</TableCell>
                                        <TableCell>{row.creation}</TableCell>
                                    </TableRow>
                                    {selectedRow === row && (
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                {secondTableLoading ? (
                                                    <CircularProgress />
                                                ) : secondTableData.length > 0 ? (
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Label</TableCell>
                                                                <TableCell>Data Source</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {secondTableData.map((dataRow, dataIndex) => (
                                                                <TableRow key={dataIndex}>
                                                                    <TableCell>{dataRow.label}</TableCell>
                                                                    <TableCell>{dataRow.data_source}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                ) : (
                                                    <Typography>No data available</Typography>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default QueryTable;
