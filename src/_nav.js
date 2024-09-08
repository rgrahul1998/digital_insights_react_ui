import React from "react"
import CIcon from "@coreui/icons-react"
import {
    cilCalculator,
    cilChartPie,
    cilCursor,
    cilDescription,
    cilPuzzle,
    cilSpeedometer,
} from "@coreui/icons"
import { CNavGroup, CNavItem } from "@coreui/react"

const _nav = [
    {
        component: CNavItem,
        name: "Dashboard",
        to: "/dashboard",
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
            color: "info",
        },
    },
    {
        component: CNavGroup,
        name: "Company",
        // to: '/base',
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
        items: [],
    },
    {
        component: CNavItem,
        name: "Data Connect",
        to: "/dashboard/data-connect",
        icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    },
    // {
    //   component: CNavItem,
    //   name: 'Query',
    //   to: '/dashboard/query',
    //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    // },
    {
        component: CNavItem,
        name: "API Connect",
        to: "/dashboard/api-connect",
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "Doc Mgmt Deck",
        to: "/dashboard/doc-mgmt-deck",
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "System",
        to: "/dashboard/system",
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    },
]

export default _nav
