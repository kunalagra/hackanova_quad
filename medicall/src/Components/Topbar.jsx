import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      ></Box>

      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width="13%"
      >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>

          <IconButton onClick={() => navigate("/news")}>
            <NotificationsOutlinedIcon />
          </IconButton>

          <IconButton onClick={() => navigate("/login")}>
            <ExitToAppIcon onClick={() => localStorage.clear()} />
          </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
