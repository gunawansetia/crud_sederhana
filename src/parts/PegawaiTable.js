import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { fetchPegawaiTable, getDetail } from "actions";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import DeletePegawai from "./DeletePegawai";
import BreadCrumbs from "component/BreadCrumbs";

function PegawaiTable(props) {
  const { rows, loading, dispatch, error } = props;
  const [id, setId] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (rows ? rows.length === 0 : true) {
      setPage(0);
      dispatch(fetchPegawaiTable());
    } // eslint-disable-next-line
  }, [rows]);

  if (loading && rows.length === 0) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
        Something's wrong...
      </Typography>
    );
  }

  const getIdUser = (data) => {
    dispatch(getDetail(data));
  };
  return (
    <>
      <BreadCrumbs homeActive={"Active"} />
      <DeletePegawai
        id={id}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
      />

      <Container maxWidth="xl">
        <Typography
          variant="h5"
          fontWeight={500}
          sx={{ textAlign: "center", my: 3 }}
        >
          Daftar Pegawai PT Galaxy
        </Typography>
        <Link style={{ textDecoration: "none" }} to="/add">
          <Button variant="outlined">Tambah Siswa</Button>
        </Link>
        <TableContainer sx={{ my: 2 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} arial-label="pegawai table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Provinsi</TableCell>
                <TableCell>Kabupaten</TableCell>
                <TableCell>Kecamatan</TableCell>
                <TableCell>Kelurahan</TableCell>
                <TableCell>Jalan</TableCell>
                <TableCell sx={{ width: 200 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1 + (page > 0 ? rowsPerPage : 0)}
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.nama}</TableCell>
                    <TableCell>{row.provinsi}</TableCell>
                    <TableCell>{row.kabupaten}</TableCell>
                    <TableCell>{row.kecamatan}</TableCell>
                    <TableCell>{row.kelurahan}</TableCell>
                    <TableCell>{row.jalan ? row.jalan : ""}</TableCell>
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
                          setOpenConfirm(true);
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
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={rows.length <= 0 ? 0 : page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    rows: state.rows,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(PegawaiTable);
