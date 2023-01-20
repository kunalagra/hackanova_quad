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
import News from "./scenes/news/News";
import Doctordetails from "./Components/Doctordetails";
import JitsiComponent from "./scenes/startMeet/createMeet";
import HomePage from "./DieseasePredictor/components/HomePage";
 
function App() {

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={ <Dashboard/>}/>
              <Route path="/start" element={ <JitsiComponent />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/news" element={<News />} />
              <Route path="/model" element={<HomePage />} />
              <Route path="/details" element={<Doctordetails />} />

              <Route path="/*" element={<NotFound />}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
