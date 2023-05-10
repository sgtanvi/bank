//import { Counter } from './features/counter/Counter';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Atm from "./pages/Atm";
import Upload from "./pages/Upload";
import Register from "./pages/Register";
import Users from "./pages/Users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/atm" element={<Atm/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/users" element={<Users/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
