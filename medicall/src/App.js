import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import NotFound from "./scenes/404";
import CreateMeet from "./scenes/createMeet/CreateMeet";
 
function App() {

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<CreateMeet />} />

              <Route path="/*" element={<NotFound />}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
