import React, { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { CSidebar, CSidebarHeader, CNavItem } from "@coreui/react"
import { AppSidebarNav } from "./AppSidebarNav"
import _nav from "../_nav"
import API_URL from "../config"

const AppSidebar = () => {
    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarShow)
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.post(
                    `${API_URL}/api/method/digital_insights.digital_insights.api.user_associated_company.user_associated_company`,
                    null,
                    {
                        params: {
                            user: localStorage.getItem("user"),
                        },
                    },
                )

                const fetchedCompanies = response?.data?.message?.data?.company_list || []
                setCompanies(fetchedCompanies)
            } catch (error) {
                console.error("Error fetching companies:", error)
                setCompanies([]) // Fallback to an empty array on error
            }
        }

        fetchCompanies()
    }, [])

    // Memoized navigation to avoid unnecessary recalculations
    const navigation = useMemo(() => {
        return _nav.map((item) => {
            if (item.name === "Company" && Array.isArray(companies)) {
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
    }, [companies])

    const filteredNavigation = useMemo(() => _nav.filter((item) => item.name !== "Company"), [])

    const companyNavigation = useMemo(
        () => navigation.filter((item) => item.name === "Company"),
        [navigation],
    )

    return (
        <CSidebar
            className="border-end"
            colorScheme="dark"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: "set", sidebarShow: visible })
            }}
        >
            <CSidebarHeader className="border-bottom">
                {companyNavigation.length > 0 && <AppSidebarNav items={companyNavigation} />}
            </CSidebarHeader>
            <AppSidebarNav items={filteredNavigation} />
        </CSidebar>
    )
}

export default React.memo(AppSidebar)
