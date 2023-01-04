import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { fetchPegawaiTable } from "actions";
import Navbar from "component/Navbar";
import React, { useEffect } from "react";
import { connect } from "react-redux";

function PegawaiTable(props) {
  const { rows, loading, dispatch } = props;

  useEffect(() => {
    if (rows ? rows.length === 0 : true) {
      dispatch(fetchPegawaiTable());
    }
  }, []);

  if (loading || rows.length === 0 || !rows) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} arial-label="pegawai table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Provinsi</TableCell>
                <TableCell>Kabupaten</TableCell>
                <TableCell>Kecamatan</TableCell>
                <TableCell>Kelurahan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.provinsi}</TableCell>
                  <TableCell>{row.kabupaten}</TableCell>
                  <TableCell>{row.kecamatan}</TableCell>
                  <TableCell>{row.kelurahan}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    rows: state.rows,
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(PegawaiTable);
