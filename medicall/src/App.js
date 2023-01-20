import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import NotFound from "./scenes/404/404";
import About from "./scenes/about/About";   
import FAQ from "./Components/FAQ"; 
import Topbar from "./Components/Topbar"
import Dashboard from "./scenes/dashboard/Dashboard";
 
function App() {

  const [theme, colorMode] = useMode();
  const loggedIn = sessionStorage.getItem("registerAs");

  const isDoctor = loggedIn? loggedIn.toString() : "na";
  // console.log(isDoctor)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={ <Dashboard isDoctor={isDoctor==="doctor"} />}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />

              <Route path="/*" element={<NotFound />}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
