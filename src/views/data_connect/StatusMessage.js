import React from 'react';
import PropTypes from 'prop-types';

const StatusMessage = ({ status }) => {
    if (!status) return null;

    return (
        <div className={`mt-3 alert ${status.includes('active') ? 'alert-success' : 'alert-danger'}`}>
            {status}
        </div>
    );
};

StatusMessage.propTypes = {
    status: PropTypes.string.isRequired,
};
export default StatusMessage;
