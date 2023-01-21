import { Box, Typography, useTheme, Button} from "@mui/material";
import Header from "../../Components/Header";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import httpClint from "../../httpClint";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const News = ({isdashboard = false}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [news,setnews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        httpClint.get("/news")
        .then((response) => {
            setnews(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const loggedIn = localStorage.getItem("registerAs");
    const isDoctor = loggedIn? loggedIn.toString() : "na";

    return (
        <Box>
        { !isdashboard? (
            <Box m="20px">
                <Header title="News" subtitle="Get the lastest news!!"/>
                <Button style={{backgroundColor: `${colors.blueAccent[500]}`, color:"white", marginLeft: "50px"}} 
                    onClick={() => navigate("/postnews")}>
                    <AddIcon mr="10px"/>
                    <Typography>
                        Add News 
                    </Typography>
                </Button>
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
                            color={colors.grey[200]}
                            >
                            {d.date}
                        </Typography>
                        <Typography
                            variant="h5"
                            color={colors.grey[100]}
                            >
                            {d.body}
                        </Typography>
                        <Typography
                            variant="h5"
                            color={colors.blueAccent[500]}
                            >
                            - {d.author}
                        </Typography>
                    </li>
                )}
                </ul>
            </Box>

        ) : (
            <Box m="20px">
                <Box textAlign="center" m="10px 0"><Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
                    Latest News
                    </Typography></Box>
                <Box overflow="auto">
                <ul style={{listStyle: "none"}}>
                {news && news.map((d) => 
                    <li 
                        style={{
                            padding: "5px",
                            borderBottom: "1px solid primary"
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
                            color={colors.grey[200]}
                            >
                            {d.date}
                        </Typography>
                        <Typography
                            variant="h5"
                            color={colors.grey[100]}
                            >
                            {d.body}
                        </Typography>
                        <Typography
                            variant="h5"
                            color={colors.blueAccent[500]}
                            >
                            - {d.author}
                        </Typography>
                    </li>
                )}
                </ul>
                </Box>
            </Box>
        )}
        </Box>
    )
}

export default News;