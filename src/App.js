import PegawaiTable from "parts/PegawaiTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "component/Navbar";
import AddPegawai from "parts/AddPegawai";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" index element={<PegawaiTable />} /> */}
        <Route path="/" index element={<AddPegawai />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
