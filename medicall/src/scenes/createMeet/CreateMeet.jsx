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
          title="Create an Appointment"
          subtitle="Connect to your Doctor as soon as possible"
        />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(10, 1fr)"
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
                        to="/appointmentForm"
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
          gridRow="span 2"
          ml="10px"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

<script src="https://<your-domain>/external_api.js"></script>;
export default CreateMeet;
