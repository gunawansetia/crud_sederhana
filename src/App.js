import PegawaiTable from "parts/PegawaiTable";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "component/Navbar";
import AddPegawai from "parts/AddPegawai";
import { Container } from "@mui/system";
import { Breadcrumbs } from "@mui/material";
import "./App.css";
import EditPegawai from "parts/EditPegawai";

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
