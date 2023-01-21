import { Box, IconButton, Typography, useTheme } from "@mui/material";
import CreateMeet from "../createMeet/CreateMeet";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import httpClint from "../../httpClint";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
        window.location.href = "/login";
     }

    const loggedIn = localStorage.getItem("registerAs");

    const isDoctor = loggedIn? loggedIn.toString() : "na";
    const [details, setDetails] = useState([]);
    // if(loggedIn){
    //   httpClint.post("/details", {
    //     "registerer": isDoctor,
    //   })
    //   .then((response) => {
    //     setDetails(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
    useEffect(() => {
        httpClint.post("/details", {
        "registerer": isDoctor,
        })
        .then((response) => {
        setDetails(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
        // console.log(loggedIn, isDoctor, details)
    }, [isDoctor]);
    // console.log(isDoctor)

    // if(isDoctor){
    //     details.setItem("specialization","");
    //     details.setItem("address","");
    // }


    const handleFetch = () => {
        httpClint.get("/fetchmeets")
          .then((response) => {
            console.log(response);
            if(response.data.meet!=='na'){
                navigate("/start-meet?meetId=" + response.data.meet);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    } 


    return (
        <Box m="20px" minHeight="85vh">
            {
                isDoctor==='doctor'? (
                    <Box m="20px" display="flex" justifyContent="space-evenly" alignItems="center" marginTop="100px">
                        <Box
                            backgroundColor="white"
                            borderRadius="50%"
                            width="25%"
                        >
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" 
                            alt=""
                            className="rounded-circle"
                            width="100%"
                            />
                        </Box>
                        <Box>
                            <Box display="flex" alignItems="center" margin="20px" width="350px">
                                <Typography
                                    variant="h3"
                                    color="secondary"
                                    mr="30px"
                                >
                                    Full Name
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color={colors.grey[100]}
                                >
                                    {details.firstName + ' ' + details.lastName}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" margin="20px" width="350px">
                                <Typography
                                    variant="h3"
                                    color="secondary"
                                    mr="30px"
                                >
                                    Email
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color={colors.grey[100]}
                                >
                                    {details.email}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" margin="20px" width="350px">
                                <Typography
                                    variant="h3"
                                    color="secondary"
                                    mr="30px"
                                >
                                    Phone
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color={colors.grey[100]}
                                >
                                    {details.phone}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" margin="20px" width="350px">
                                <Typography
                                    variant="h3"
                                    color="secondary"
                                    mr="30px"
                                >
                                    Specialization
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color={colors.grey[100]}
                                >
                                    {details.specialization}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" margin="20px" width="350px">
                                <Typography
                                    variant="h3"
                                    color="secondary"
                                    mr="30px"
                                >
                                    Address
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color={colors.grey[100]}
                                >
                                    {details.address}
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton sx={{display: "flex", justifyContent: "flex-end", alignItems: "center"}} onClick={() => handleFetch()}>
                            <RefreshIcon fontSize="large"/>
                        </IconButton>
                    </Box>
                ) : (
                    <CreateMeet />
                )
            }
        </Box>
    )
}


export default Dashboard;

