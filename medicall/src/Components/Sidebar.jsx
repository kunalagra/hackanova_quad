import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MedicationIcon from '@mui/icons-material/Medication';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';



const Item = ({ title, icon, selected, setSelected, to }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      >
      <Typography>{title}</Typography>
      <Link to={to} target="_blank"/>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const lname = localStorage.getItem("lastName");
  const Lname = lname? lname.toString() : "Lastname";
  const fname = localStorage.getItem("firstName");
  const Fname = fname? fname.toString() : "Firstname";
  if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
    window.location.href = "/login";
  }
  
  const loggedIn = localStorage.getItem("registerAs");
  
  const isDoctor = loggedIn? loggedIn.toString() : "na";
  
  return (
    <Box 
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
      minHeight="85vh"
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  MEDICALL
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box sx={{ mb: "25px" }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src="logo192.png"
                  width="100px"
                  height="100px"
                  alt="Patient Profile"
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  margin="10px 0 0 0"
                >
                  {Fname} {Lname}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Profession
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* HOME */}
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* DATA */}
            {
              (isDoctor==="doctor")? (
                <>
                </>
              ) : (
                <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Data
                </Typography>
                <Item
                  title="Available Doctors"
                  to="/doctors"
                  icon={<MedicationLiquidIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/* MODEL */}
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Model
                </Typography>
                <Item
                  title="Disease Prediction"
                  to="/model"
                  icon={<PrecisionManufacturingIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                </>
              )
            }
            {/* Other Information */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Other
            </Typography>
            <Item
              title="About"
              to="/about"
              icon={<InfoOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* SHOP */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Shop
            </Typography>
            <Item
              title="Buy Medicines"
              to="//sultanindian007.github.io/EPharmacy/"
              icon={<MedicationIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
          {/* COPYRIGHT */}
          {!isCollapsed && (
            <Typography
              variant="h6"
              color={colors.grey[300]}
              textAlign="center"
              sx={{ m: "15px" }}
            >
              © 2022 MediCall | All Rights Reserved
            </Typography>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
