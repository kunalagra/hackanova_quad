import { Box, Typography, useTheme } from "@mui/material";
import CreateMeet from "../createMeet/CreateMeet";
import { tokens } from "../../theme";

const Dashboard = ( {isDoctor = false, details = {}} ) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // if(isDoctor){
    //     details.setItem("specialization","");
    //     details.setItem("address","");
    // }
    return (
        <Box m="20px" minHeight="85vh">
            {
                isDoctor? (
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
                    </Box>
                ) : (
                    <CreateMeet />
                )
            }
        </Box>
    )
}


export default Dashboard;

