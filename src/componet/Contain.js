import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Contain() {
    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state;
    return (
        <>
            <Grid container xs={12}>
                <Card
                    xs={12}
                    sx={{
                        boxShadow: 3,

                        margin: "auto",
                        padding: "60px",
                        maxWidth: "70%",
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark" ? "#101010" : "#fff",
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "grey.300"
                                : "grey.800",
                        borderRadius: 2,
                        textAlign: "center",
                        fontSize: "0.875rem",
                        fontWeight: "700",
                    }}
                >
                    <Button
                        style={{ display: "flex" }}
                        onClick={() => navigate("/")}
                    >
                        Go Back
                    </Button>
                    <Grid>
                        <CardMedia
                            style={{ blockSize: "auto" }}
                            component="img"
                            height="140"
                            image={data.image}
                            // alt={title}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ textAlign: "start" }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            <b>Website title : </b> {data.title}
                        </Typography>
                        <Typography color="textSecondary" component="p">
                            <b>Description : </b> {data.description}
                        </Typography>
                        <Typography color="textSecondary" component="p">
                            <b>Author:</b> {data.author}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            <b> Type:</b> {data.type}
                        </Typography>
                        <Typography color="textSecondary" component="p">
                            <b> URL:</b> {data.canonicalUrl}
                        </Typography>
                        <Typography color="textSecondary" component="p">
                            <b> Locale: </b> {data.locale}
                        </Typography>
                        {data?.publishedDate !== "undifined" ? (
                            <Typography color="textSecondary" component="p">
                                <b> Published Date: </b> {data.publishedDate}
                            </Typography>
                        ) : (
                            ""
                        )}
                    </Grid>
                </Card>
            </Grid>
        </>
    );
}

export default Contain;
