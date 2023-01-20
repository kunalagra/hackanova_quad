import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import NotFound from "./scenes/404";
import CreateMeet from "./scenes/createMeet/CreateMeet";
import About from "./scenes/About";   
import FAQ from "./Components/FAQ"; 
import Help from "./Components/Help";
import ProfilePage from "./scenes/Profile";
 
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
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<Help />} />
              <Route path="/profilepage" element={<ProfilePage />} />

              <Route path="/*" element={<NotFound />}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
