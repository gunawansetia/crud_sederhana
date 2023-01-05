import PegawaiTable from "parts/PegawaiTable";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "component/Navbar";
import AddPegawai from "parts/AddPegawai";
import { Container } from "@mui/system";
import { Breadcrumbs } from "@mui/material";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 3 }}>
          <Link className="Link" to="/">
            Home
          </Link>
          <Link className="Link" to="/add">
            Add
          </Link>
        </Breadcrumbs>
      </Container>
      <Routes>
        <Route path="/" index element={<PegawaiTable />} />
        <Route path="/add" element={<AddPegawai />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
