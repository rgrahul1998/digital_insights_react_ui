import * as React from "react"
import { alpha, Grid, Box, Container, Typography } from "@mui/material"
import Dataflow from "../../assets/svg/dataflow"
import Stack from "@mui/material/Stack"

export default function DataIntegration() {
    return (
        <Box
            id="highlights"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                color: "white",
                // bgcolor: "#153859",
            }}
        >
            <Container maxWidth="50%" sx={{ mt: 4, maxWidth: "80%" }}>
                <Grid container sx={{ height: "100%" }}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 3,
                            height: { xs: "auto", md: "600px" },
                            backgroundColor: "background.paper",
                            // borderRight: { md: '1px solid #e0e0e0' },
                            textAlign: { xs: "center", md: "center" }, // Center text alignment
                        }}
                    >
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{ fontWeight: "bold", color: "primary.main" }}
                        >
                            Data Integration and Automation
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                mt: 2,
                                lineHeight: 1.7,
                                color: "text.secondary",
                                textAlign: "center",
                            }}
                        >
                            Automation allows you to keep working in your Excel environment with
                            100% functionality. Automated consolidation and reporting save you time,
                            letting you focus on the strategic insights that drive business growth.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 3,
                            backgroundColor: "background.default",
                        }}
                    >
                        <Box sx={{ width: "100%" }}>
                            <video
                                width="100%"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                style={{ width: "100%", borderRadius: 8 }} // Rounded corners and subtle shadow for the video
                            >
                                <source
                                    src="src\assets\videos\Purple and White Minimalist Consumer Analysis Graph.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
