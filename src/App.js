import './App.css';
import Login from "./pages/Login";
import Customer from './pages/Customer';
import Admin from './pages/Admin';
import Engineer from './pages/Engineer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core';
import Auth from "./hoc/Auth"

function App() {
  const defaultMaterialTheme = createTheme()
  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>


      <Router>
        <Routes>
          {/* <Route path="/" element={<Auth><Admin/></Auth>} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/customer" element={<Auth page="customer"><Customer /></Auth>} />
          <Route path="/engineer" element={<Auth page="engineer"><Engineer /></Auth>} />
          <Route path="/admin" element={<Auth page="admin"><Admin /></Auth>} />
        </Routes>
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
