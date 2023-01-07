import PegawaiTable from "containers/PegawaiTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "component/Navbar";
import AddPegawai from "containers/AddPegawai";
import "./App.css";
import EditPegawai from "containers/EditPegawai";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<PegawaiTable />} />
        <Route path="/add" element={<AddPegawai />} />
        <Route path="/edit" element={<EditPegawai />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
