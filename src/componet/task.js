import React, { useEffect, useState } from "react";
import cheerio from "cheerio";
import { useNavigate } from "react-router-dom";
import useApi from "./hook/useApi";
import {
    AppBar,
    Button,
    Card,
    CircularProgress,
    Grid,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";

const UrlScraper = () => {
    const [url, setUrl] = useState("");
    const [Data, setData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { safebrowsing, scrapingbee } = useApi();
    const navigate = useNavigate();

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };
    const handleButtonClick = async () => {
        setIsLoading(true);
        const isValidUrl = (url) => {
            const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            return urlRegex.test(url);
        };
        if (!isValidUrl(url)) {
            setErrorMessage("Invalid URL. Please enter a valid URL.");
            setIsLoading(false);
            return;
        }
        //Bind Check SafeBrowsing Api
        safebrowsing(url).then((res) => {
            if (res.data.matches?.length) {
                setIsLoading(false);
                setErrorMessage(
                    "Malicious URL. Please try with a different URL."
                );
                return;
            }
        });

        try {
            // Bind Scraping api
            const response = await scrapingbee(url);
            const $ = cheerio.load(response.data);

            const title = $("head title").text();
            const description = $('head meta[name="description"]').attr(
                "content"
            );
            const author = $('head meta[name="author"]').attr("content");
            const image = $('head meta[property="og:image"]').attr("content");
            const type = $('head meta[property="og:type"]').attr("content");
            const canonicalUrl = $('head link[rel="canonical"]').attr("href");
            const locale = $("html").attr("lang");
            const publishedDate = $(
                'head meta[property="article:published_time"]'
            ).attr("content");

            setData({
                title,
                description,
                author,
                image,
                type,
                canonicalUrl,
                locale,
                publishedDate,
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (Object.keys(Data).length > 0) {
            setIsLoading(false);
            navigate("/content", { state: Data });
        }
    }, [Data, navigate]);
    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
            >
                <Grid item xs={3}>
                    <AppBar component="nav">
                        <Toolbar>
                            <Typography
                                align="center"
                                variant="h4"
                                style={{ margin: "auto" }}
                            >
                                Scrapping App
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid item xs={12}>
                        <Card
                            xs={12}
                            sx={{
                                margin: "auto",
                                mt: "40%",
                                padding: "100px",
                                maxWidth: "80%",
                                borderRadius: 2,
                                textAlign: "center",
                                fontSize: "0.875rem",
                                fontWeight: "700",
                            }}
                        >
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Enter url"
                                        variant="outlined"
                                        value={url}
                                        onChange={handleUrlChange}
                                        margin="normal"
                                        fullWidth
                                        inputProps={{
                                            style: {
                                                width: "100%",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {isLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        <Button
                                            style={{ margin: "auto" }}
                                            variant="contained"
                                            onClick={handleButtonClick}
                                        >
                                            Submit
                                        </Button>
                                    )}
                                    {errorMessage && (
                                        <div style={{ color: "red" }}>
                                            {errorMessage}
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default UrlScraper;
