import { Box, Typography} from "@mui/material";
import Header from "../../Components/Header";
// import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import httpClint from "../../httpClint";

const News = ({ isDoctor = false}) => {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const [news,setnews] = useState([]);

    useEffect(() => {
        httpClint.get("/news")
        .then((response) => {
            setnews(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    // dispay date, author, body, title with format

    return (
        <Box m="20px">
            <Header title="News" subtitle="Get the lastest news!!"/>
            <ul style={{listStyle: "none"}}>
            {news && news.map((d) => 
                <li 
                    style={{
                        padding: "20px"
                    }}
                >
                    <Typography
                        variant="h4"
                        color="secondary"
                        >
                        {d.title}
                    </Typography>
                    <Typography
                        variant="h5"
                        color="secondary"
                        >
                        {d.date}
                    </Typography>
                    <Typography
                        variant="h5"
                        color="secondary"
                        >
                        {d.body}
                    </Typography>
                    <Typography
                        variant="h5"
                        color="secondary"
                        >
                        {d.author}
                    </Typography>
                </li>
            )}
            </ul>
        </Box>
    )
}

export default News;