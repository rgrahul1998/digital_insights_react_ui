import * as React from "react"

import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import LogoCollection from "./components/LogoCollection"
import Highlights from "./components/AssitantAi"
import Pricing from "./components/RelationshipManangement"
import Home from "./components/Hero"
import DataIntegration from "./components/DataIntegration"
import ProductPortfolio from "./components/ProductPortfiolio"
import CustomerManagement from "./components/CustomerManagement"
import BlogSlider from "./components/BlogSlider"

export default function LandingPage() {
    // eslint-disable-next-line
    const [mode, setMode] = React.useState("light")
    const defaultTheme = createTheme({ palette: { mode } })

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Home />
            <Box sx={{ bgcolor: "background.default" }}>
                <LogoCollection />
                <Divider />
                <DataIntegration />
                <Divider />
                <Highlights />
                <Divider />
                <Pricing />
                <Divider />
                <CustomerManagement />
                <Divider />
                <ProductPortfolio />
                <Divider />
                <BlogSlider />
                <Divider />
            </Box>
        </ThemeProvider>
    )
}
