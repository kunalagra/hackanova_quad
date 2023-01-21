import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import httpClint from "../../httpClint";
import { useNavigate } from "react-router-dom";
import { History } from "@remix-run/router";


const Doctors = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const getMeet = (p) => {
      
      console.log(p.email);
      httpClint.post("/gen-meet", {"email":p.email})
            .then((response) => {
              console.log(response);
              navigate("/start-meet?meetId=" + response.data.meet);
              
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
        window.location.href = "/login";
     }

    const [doctors, setDoctors] = useState([]);
    const [id, setId] = useState([]);

    useEffect(() => {
        httpClint.get("/doctor")
            .then((response) => {
              // console.log(response.data);
                response.data.map((row, index) => row["id"] = index);
                setDoctors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    
    const columns = [
        {field: "_id.$oid", headerName: "ID", flex: 0.3, headerAlign:"center", align:"center"},
        {field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell"},
        // {field: "firstName", headerName: "firstName", flex: 1, cellClassName: "name-column--cell"},
        // {field: "lastName", headerName: "lastName", flex: 1, cellClassName: "name-column--cell"},
        {field: "email", headerName: "Email", flex: 0.5, headerAlign: "left", align: "left"},
        {field: "gender", headerName: "Gender", flex: 0.5, headerAlign: "left", align: "left"},
        {
            field: "appointments", 
            headerName: "Book an Appointment",
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <Box
                        width="70%"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                      <Button color="secondary" variant="contained" sx={{fontSize: "14px", borderRadius: "6px"}} 
                        onClick={() => getMeet(params.row)}>
                        BOOK NOW
                      </Button>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="Available Doctors" subtitle="Book a doctor suitable for your disease"/>
            <Box 
                m="40px 0 0 0" 
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .name-column--cell": {
                      color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.blueAccent[700],
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid 
                    rows={doctors} 
                    columns={columns} 
                    components={{ Toolbar: GridToolbar } 

                  }
                />
            </Box>
        </Box>
    )

}

export default Doctors;