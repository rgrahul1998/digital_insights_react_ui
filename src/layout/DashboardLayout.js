import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import Dashboard from '../views/dashboard/Dashboard'
import { CContainer } from '@coreui/react'

const DashboardLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CContainer className="px-4" lg>
            <Dashboard />
          </CContainer>
          {/* <AppContent /> */}
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DashboardLayout
