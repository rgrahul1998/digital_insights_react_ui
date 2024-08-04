import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { CCloseButton, CSidebar, CSidebarHeader, CNavItem, CSidebarBrand } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import _nav from '../_nav'
import CIcon from '@coreui/icons-react'
import { logo } from 'src/assets/brand/logo'


const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.post('https://insights.asiot.net/api/method/digital_insights.digital_insights.api.user_associated_company.user_associated_company', null, {
          params: {
            user: localStorage.getItem("user")
          },
        });
        console.log(response)
        setCompanies(response.data.message.data)
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
    }

    fetchCompanies()
  }, [])

  const navigation = _nav.map((item) => {
    if (item.name === 'Company') {
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
       
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
