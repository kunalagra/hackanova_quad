import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import AddIcon from '@mui/icons-material/Add';
import Header from "../../Components/Header";
import { Link } from "react-router-dom";

const CreateMeet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Dashboard"
          subtitle="Track your health!!"
        />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(16, 1fr)"
        gridAutoRows="140px"
        gap="20px"  
      >
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          display="flex"
          ml="10px"
          backgroundColor={colors.primary[400]}
          border={`2px solid ${colors.primary[600]}`}
          borderRadius="30px"
          alignItems="center"
          justifyContent="center"
        >
            <Box 
                p="2px"
                border={`1px dashed ${colors.blueAccent[600]}`}
                borderRadius= "12px"
            >
                <Box
                    backgroundColor={colors.blueAccent[700]}
                    padding="12px 20px"
                    borderRadius="10px"
                    fontSize="14px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        "&:hover": {
                            backgroundColor: colors.blueAccent[800],
                            cursor: "pointer",
                        }
                    }}
                >
                    <AddIcon sx={{mr: "10px"}}/>
                    <Link
                        to="/start-meet"
                        style={{
                            color: colors.grey[100],
                            fontWeight: "bold",
                            textDecoration: "none"
                        }}
                    >
                        CREATE AN APPOINTMENT
                    </Link>
                    
                </Box>
            </Box>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 4"
          display="flex"
          ml="10px"
          backgroundColor={colors.primary[400]}
          border={`2px solid ${colors.primary[600]}`}
          borderRadius="30px"
          alignItems="center"
          justifyContent="center"
        >
            <Box 
                p="2px"
                border={`1px dashed ${colors.blueAccent[600]}`}
                borderRadius= "12px"
            >
                <Box
                    backgroundColor={colors.blueAccent[700]}
                    padding="12px 20px"
                    borderRadius="10px"
                    fontSize="14px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        "&:hover": {
                            backgroundColor: colors.blueAccent[800],
                            cursor: "pointer",
                        }
                    }}
                >
                    <Link
                        to="/news"
                        style={{
                            color: colors.grey[100],
                            fontWeight: "bold",
                            textDecoration: "none"
                        }}
                    >
                        Latest News
                    </Link>
                </Box>
            </Box>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          display="flex"
          ml="10px"
          backgroundColor={colors.primary[400]}
          border={`2px solid ${colors.primary[600]}`}
          borderRadius="30px"
          alignItems="center"
          justifyContent="center"
        >
            <Box 
                p="2px"
                border={`1px dashed ${colors.blueAccent[600]}`}
                borderRadius= "12px"
            >
                <Box
                    backgroundColor={colors.blueAccent[700]}
                    padding="12px 20px"
                    borderRadius="10px"
                    fontSize="14px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        "&:hover": {
                            backgroundColor: colors.blueAccent[800],
                            cursor: "pointer",
                        }
                    }}
                >
                    <Link
                        to="/model"
                        style={{
                            color: colors.grey[100],
                            fontWeight: "bold",
                            textDecoration: "none"
                        }}
                    >
                      Test Your Health
                    </Link>
                    
                </Box>
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

<script src="https://<your-domain>/external_api.js"></script>;
export default CreateMeet;
