import {
  Button,
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
import { fetchPegawaiTable, getDetail } from "actions";
import Navbar from "component/Navbar";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

function PegawaiTable(props) {
  const { rows, loading, dispatch } = props;
  const [id, setId] = useState("");

  useEffect(() => {
    if (rows ? rows.length === 0 : true) {
      dispatch(fetchPegawaiTable());
    } // eslint-disable-next-line
  }, []);

  if (loading || rows.length === 0) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
        Loading...
      </Typography>
    );
  }

  const getIdUser = (data) => {
    dispatch(getDetail(data));
  };
  return (
    <>
      <Container maxWidth="xl">
        <Link style={{ textDecoration: "none" }} to="/add">
          <Button variant="outlined">Tambah Siswa</Button>
        </Link>
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
                <TableCell sx={{ width: 200 }}>Action</TableCell>
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
                  <TableCell>
                    <Link to="edit">
                      <Button onClick={() => getIdUser(row)}>
                        <EditOutlined />
                      </Button>
                    </Link>
                    <Button
                      sx={{ color: pink[500] }}
                      onClick={() => {
                        setId(row.id);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </TableCell>
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
