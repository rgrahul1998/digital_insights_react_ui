import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DataSourceTable = () => {
    const { state } = useLocation();
    const data = state?.data?.message || [];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Creation</TableCell>
                        <TableCell>Modified</TableCell>
                        <TableCell>Is Site DB</TableCell>
                        <TableCell>Database Type</TableCell>
                        <TableCell>Allow Imports</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.creation}</TableCell>
                            <TableCell>{row.modified}</TableCell>
                            <TableCell>{row.is_site_db ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{row.database_type}</TableCell>
                            <TableCell>{row.allow_imports ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataSourceTable;
