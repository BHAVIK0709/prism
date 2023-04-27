import axios from "axios";
import React from "react";

function Api() {
    const safebrowsing = async (url) => {
        try {
            const data = {
                client: {
                    clientId:
                        "4534488267-rbmkb9krht35fcqi9tam0i4g4lg01mei.apps.googleusercontent.com",
                    clientVersion: "1.5.2",
                },
                threatInfo: {
                    threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
                    platformTypes: ["ANY_PLATFORM"],
                    threatEntryTypes: ["URL"],
                    threatEntries: [{ url }],
                },
            };
            const urlInfo = await axios.post(
                `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${"AIzaSyBt5AXrdCaED03LsW6V12hPGrpvrxHx43k"}`,
                data
            );
            return urlInfo;
        } catch (error) {
            console.log(error);
        }
    };
    const scrapingbee = async (url) => {
        try {
            const response = await axios.get(
                "https://app.scrapingbee.com/api/v1",
                {
                    params: {
                        api_key:
                            "S7X7AZHYW5PV0Q7SPLKTKE4058TL4O25WR9DHU000SEATCRH4SQAS02DDL26AM8WQDSZS1MVYAWUD263",
                        url: url,
                    },
                }
            );
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    return { safebrowsing, scrapingbee };
}

export default Api;
