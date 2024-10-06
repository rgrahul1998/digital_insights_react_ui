import * as React from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Carousel from "react-material-ui-carousel"

const item = {
    name: "Image 1",
    description: "Description for Image 1",
    imgPath: "/src/assets/images/excel_powered.png", // Ensure the correct path or import
}

export default function CustomerManagement() {
    return (
        <Box
            id="highlights"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                color: "white",
                bgcolor: "#153859",
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
                            The flexibility of Excel. The power of automation.
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
                            letting you focus on the strategic insights that drive business growth.{" "}
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
                            <div style={{ position: "relative", textAlign: "center" }}>
                                <img
                                    src={item.imgPath} // Use the imgPath from the item object
                                    alt={item.name}
                                    style={{ width: "100%", borderRadius: 8 }}
                                />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
