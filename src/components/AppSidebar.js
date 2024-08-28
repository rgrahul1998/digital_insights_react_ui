import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { CSidebar, CSidebarHeader, CNavItem, CSidebarBrand } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import _nav from '../_nav'
import API_URL from '../config'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [companies, setCompanies] = useState([])
  const [sidebarComponents, setSidebarComponents] = useState([])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.post(
          API_URL + '/api/method/digital_insights.digital_insights.api.user_associated_company.user_associated_company',
          null,
          {
            params: {
              user: localStorage.getItem("user")
            },
          }
        )
        console.log(111111111111,response)
        const fetchedCompanies = response?.data?.message?.data?.company_list || []  // Safe access and fallback to empty array
        setCompanies(fetchedCompanies)
        const fetchedSidebarComponents = response?.data?.message?.data?.sidebar_component_list || []  // Safe access and fallback to empty array
        setSidebarComponents(fetchedSidebarComponents)
      } catch (error) {
        console.error('Error fetching companies:', error)
        setCompanies([])  // Ensure companies is an empty array on error
        setSidebarComponents([])
      }
    }

    fetchCompanies()
  }, [])

  // Filter the _nav array based on sidebarComponents
  const filteredNav = _nav.filter((item) => sidebarComponents.includes(item.name))

  // Update navigation with companies if necessary
  const navigation = filteredNav.map((item) => {
    if (item.name === 'Company' && Array.isArray(companies)) {
      return {
        ...item,
        items: companies.map((company) => ({
          component: CNavItem,
          name: company,
          to: `/dashboard/company/${company}`,
        })),
      }
    }
    return item
  })

  const company = navigation.filter((item) => item.name === 'Company')
  const otherNavigationItems = navigation.filter((item) => item.name !== 'Company')

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        {company.length > 0 && <AppSidebarNav items={company} />}
      </CSidebarHeader>
      <AppSidebarNav items={otherNavigationItems} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
