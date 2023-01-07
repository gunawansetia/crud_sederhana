import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { closeDeleteAlert, deleteDataPegawai } from "actions";
import React from "react";
import { connect } from "react-redux";

function DeletePegawai(props) {
  const {
    id,
    openConfirm,
    setOpenConfirm,
    dispatch,
    resDeleteData,
    errorResDeleteData,
    openDeleteAlert,
  } = props;

  const handleDelete = () => {
    dispatch(deleteDataPegawai(id));
    handleCloseConfirm();
  };

  const handleClose = () => {
    dispatch(closeDeleteAlert());
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-confirm-delete"
        aria-describedby="alert-dialog-confirm-delete"
      >
        <DialogTitle id="alert-dialog-title">
          {"Apakah Anda yakin ingin menghapus data ini?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Batalkan</Button>
          <Button onClick={handleDelete} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteAlert}
        aria-labelledby="alert-dialog-delete"
        aria-describedby="alert-dialog-delete"
      >
        <DialogTitle id="alert-dialog-title">
          {resDeleteData.status >= 200 && resDeleteData.status <= 299
            ? "Data berhasil dihapus"
            : `Gagal, ${errorResDeleteData}`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function mapStateToProps(state) {
  return {
    resDeleteData: state.resDeleteData,
    errorResDeleteData: state.errorResDeleteData,
    openDeleteAlert: state.openDeleteAlert,
  };
}

export default connect(mapStateToProps)(DeletePegawai);
