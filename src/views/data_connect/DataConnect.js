import React, { useState } from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import { CContainer, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import DataConnectModal from './DataConnectModal';
import StatusMessage from './StatusMessage';
import ActionButtons from './ActionButtons';

const DataConnect = () => {
    const [modal, setModal] = useState(false);
    
    const [status, setStatus] = useState('');

    const toggleModal = () => {
        setModal(!modal);
    };


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
                        
                        <ActionButtons setModal={toggleModal} />
                        
                        <DataConnectModal 
                            modal={modal} 
                            setModal={toggleModal} 
                        />

                        <StatusMessage status={status} />
                    </CContainer>
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default DataConnect;
