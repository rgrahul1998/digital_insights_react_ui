import React, { useState, useEffect, useRef } from "react"
import { Box, Card, CardContent, Typography, Container } from "@mui/material"
import BubbleChartIcon from "@mui/icons-material/BubbleChart" // For Finance Consolidation
import ShowChartIcon from "@mui/icons-material/ShowChart" // For Predictive Analytics
import AccountBalanceIcon from "@mui/icons-material/AccountBalance" // For Budgeting & Forecasting
import BarChartIcon from "@mui/icons-material/BarChart" // For Financial Reporting
import HubIcon from "@mui/icons-material/Hub" // For Data Integration

const blogs = [
    {
        title: "Finance Consolidation",
        description:
            "Merge financial bubbles into one. Transform scattered data into a clear, unified picture.",
        icon: <BubbleChartIcon sx={{ fontSize: 40, color: "black" }} />, // Color set to black
    },
    {
        title: "Predictive Analytics",
        description:
            "Foresee financial trends. Turn data into insights for strategic decision-making.",
        icon: <ShowChartIcon sx={{ fontSize: 40, color: "black" }} />, // Color set to black
    },
    {
        title: "Budgeting & Forecasting",
        description:
            "Balance ambition with reality. Craft budgets that push boundaries yet remain achievable.",
        icon: <AccountBalanceIcon sx={{ fontSize: 40, color: "black" }} />, // Color set to black
    },
    {
        title: "Financial Reporting",
        description:
            "Visualize your financial story. Create reports that reveal true performance and potential.",
        icon: <BarChartIcon sx={{ fontSize: 40, color: "black" }} />, // Color set to black
    },
    {
        title: "Data Integration",
        description:
            "Connect your financial network. Intertwine diverse data points into a robust financial ecosystem.",
        icon: <HubIcon sx={{ fontSize: 40, color: "black" }} />, // Color set to black
    },
]

const BlogSlider = () => {
    const [translateX, setTranslateX] = useState(0)
    const sliderRef = useRef(null)

    const slideWidth = 100 / 4 // Width of each card as a percentage

    useEffect(() => {
        const interval = setInterval(() => {
            setTranslateX((prevTranslateX) => prevTranslateX - slideWidth)
        }, 3000) // Slide every 3 seconds

        return () => clearInterval(interval)
    }, [slideWidth])

    useEffect(() => {
        if (Math.abs(translateX) >= 100) {
            setTimeout(() => {
                setTranslateX(0)
            }, 500) // After animation finishes, reset position
        }
    }, [translateX])

    return (
        <Container maxWidth="50%" sx={{ mt: 4, mb: 4, overflow: "hidden", maxWidth: "80%" }}>
            <Box
                ref={sliderRef}
                sx={{
                    display: "flex",
                    transform: `translateX(${translateX}%)`,
                    transition: translateX === 0 ? "none" : "transform 0.5s ease-in-out",
                }}
            >
                {blogs.concat(blogs).map((blog, index) => (
                    <Box
                        key={index}
                        sx={{
                            minWidth: `${slideWidth}%`, // Ensures equal-width cards
                            boxSizing: "border-box",
                            padding: 2,
                        }}
                    >
                        <Card
                            variant="outlined"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "250px",
                                alignItems: "center",
                                bgcolor: "#f5f9fc",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                {/* Add the icon above the title */}
                                {blog.icon}
                                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                                    {blog.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    {blog.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Container>
    )
}

export default BlogSlider
