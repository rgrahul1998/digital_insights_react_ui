import React from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import { CContainer } from '@coreui/react';
import QueryTable from './QueryTable';

const Query = () => {
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <CContainer className="px-4" lg>
                        <QueryTable/>
                    </CContainer>
                    
                </div>
                <AppFooter />
            </div>
        </div>
    )
}

export default Query;
