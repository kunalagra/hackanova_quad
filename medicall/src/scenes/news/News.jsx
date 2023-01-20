import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../Components/Header";
import { tokens } from "../../theme";

const News = ({ isDoctor = false}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const news = [{"title":"abcd", "para":"dfsdfsf"}, {"title":"abcsdcsdfsd","para":"dsfkhdfshd"}];
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
                        color={colors.grey[100]}
                    >
                        {d.title}
                    </Typography>
                </li>
            )}
            </ul>
        </Box>
    )
}

export default News;