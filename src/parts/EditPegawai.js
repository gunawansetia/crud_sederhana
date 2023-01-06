import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import {
  addPegawai,
  closeAlert,
  deleteListKab,
  deleteListKec,
  deleteListKel,
  fetchKabupatenList,
  fetchKecamatanList,
  fetchKelurahanList,
  fetchProvinsiList,
  putDataPegawai,
} from "actions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function EditPegawai(props) {
  const {
    dispatch,
    rows,
    provList,
    kabList,
    kecList,
    kelList,
    resPutData,
    errorResPutData,
    successAlert,
    openAlert,
  } = props;

  const defaultValues = {
    name: rows.nama || "",
    province: rows.provinsi || "",
    kab: rows.kabupaten || "",
    kec: rows.kecamatan || "",
    kel: rows.kelurahan || "",
  };

  const defaultId = {
    province: "",
    kab: "",
    kec: "",
    kel: "",
  };

  const initDisabled = {
    kab: true,
    kec: true,
    kel: true,
  };

  const alertStatus = {
    isOpen: false,
    success: true,
    text: "",
  };

  const [isDisabled, setIsDisabled] = useState(initDisabled);
  const [values, setValues] = useState(defaultValues);
  const [id, setId] = useState(defaultId);
  const [open, setOpen] = useState(alertStatus);

  useEffect(() => {
    if (
      id.province === "" &&
      provList.length > 0 &&
      values.province === rows.provinsi
    ) {
      let initIdProv = provList.find(
        (item) => item.nama === defaultValues.province
      );
      setId({ ...id, province: initIdProv ? initIdProv.id : "" });
    }
    if (id.kab === "" && kabList.length > 0 && values.kab === rows.kabupaten) {
      let initIdKab = kabList.find((item) => item.nama === defaultValues.kab);
      console.log("UseEffect 2");
      setId({ ...id, kab: initIdKab ? initIdKab.id : "" });
    }
    if (id.kec === "" && kecList.length > 0 && values.kec === rows.kecamatan) {
      let initIdKec = kecList.find((item) => item.nama === defaultValues.kec);
      console.log("UseEffect 2");
      setId({ ...id, kec: initIdKec ? initIdKec.id : "" });
    }
  }, [kabList, kecList]);

  useEffect(() => {
    if (provList.length === 0) {
      dispatch(fetchProvinsiList());
    }
    if (
      id.province !== "" &&
      values.province !== null &&
      kabList.length === 0
    ) {
      console.log("UseEffect 1");
      dispatch(fetchKabupatenList(id.province));
      setIsDisabled({
        ...isDisabled,
        kab: false,
      });
    }

    if (id.kab !== "" && values.kab !== null && kecList.length === 0) {
      dispatch(fetchKecamatanList(id.kab));
      setIsDisabled({
        ...isDisabled,
        kec: false,
      });
    }

    if (id.kec !== "" && values.kec !== null && kelList.length === 0) {
      dispatch(fetchKelurahanList(id.kec));
      setIsDisabled({
        ...isDisabled,
        kel: false,
      });
    }

    // eslint-disable-next-line
  }, [id.province, id.kab, id.kec]);

  const areAllFilled =
    values.name !== "" &&
    !/^\s+$/.test(values.name) &&
    values.province !== "" &&
    values.kab !== "" &&
    values.kec !== "" &&
    values.kel !== "";

  const handleChangeTeks = (e, newValue) => {
    const { name, value } = e.target;
    console.log(newValue);
    if (name === "name")
      setValues({
        ...values,
        [name]: value,
      });
    if (name === "kab") {
      dispatch(deleteListKec(), deleteListKel());
      setValues({
        ...values,
        kec: "",
        kel: "",
        kab: value,
      });
      setIsDisabled({ ...isDisabled, kec: true, kel: true });
      setId({ ...id, kec: "", kel: "", kab: newValue.props.id });
    }
    if (name === "kec") {
      dispatch(deleteListKel());
      setIsDisabled({ ...isDisabled, kel: true });
      setValues({ ...values, kel: "", kec: value });
      setId({ ...id, kec: newValue ? newValue.props.id : null });
    }
    if (name === "kel") {
      setValues({ ...values, kel: value });
    }
  };

  const hChangeAutoComplete = (e, value) => {
    console.log(isDisabled.kab);
    setIsDisabled({
      ...isDisabled,
      kab: true,
      kec: true,
      kel: true,
    });
    setValues({
      ...values,
      kab: "",
      kec: "",
      kel: "",
      province: value ? value.nama : "",
    });

    setId({
      ...id,
      kab: "",
      kec: "",
      kel: "",
      province: value ? value.id : "",
    });
    dispatch(deleteListKab(), deleteListKec(), deleteListKel());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      putDataPegawai(rows.id, {
        nama: values.name,
        provinsi: values.province,
        kabupaten: values.kab,
        kecamatan: values.kec,
        kelurahan: values.kel,
      })
    );
    // if (resPutData.status === 200) {
    //   setOpen({ isOpen: true, text: resPutData.status, success: true });
    //   console.log(resPutData.body);
    // } else {
    //   setOpen({ isOpen: true, text: errorResPutData, success: false });
    // }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          fontWeight={500}
          sx={{ textAlign: "center", my: 3 }}
        >
          Edit Pegawai
        </Typography>
        <Alert
          onClose={() => dispatch(closeAlert())}
          severity={!successAlert ? "error" : "success"}
          sx={{ display: openAlert ? "flex" : "none", mb: 3 }}
        >
          {`This is a ${!successAlert ? "error" : "success"} alert - ${
            !successAlert ? errorResPutData : resPutData.status
          }`}
        </Alert>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={4}>
              <TextField
                id="name-input"
                required
                label="Nama"
                fullWidth
                name="name"
                variant="standard"
                value={values.name || ""}
                onChange={handleChangeTeks}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                id="province-input"
                freeSolo
                autoSelect
                required
                renderInput={(params) => (
                  <TextField {...params} name="province" label="Provinsi" />
                )}
                label="Provinsi"
                value={provList.length > 0 ? values.province : ""}
                onChange={hChangeAutoComplete}
                options={provList}
                isOptionEqualToValue={(option, value) =>
                  option.nama === values.province
                }
                getOptionLabel={(option) =>
                  option.nama || values.province || ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="kab-input"
                required
                fullWidth
                disabled={isDisabled.kab}
                select
                label="Kabupaten"
                name="kab"
                value={kabList.length > 0 ? values.kab : ""}
                helperText="Please select your kabupaten"
                variant="outlined"
                onChange={handleChangeTeks}
              >
                {kabList.length === 0
                  ? kabList
                  : kabList.map((option, index) => (
                      <MenuItem key={index} value={option.nama} id={option.id}>
                        {option.nama}
                      </MenuItem>
                    ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="kec-input"
                required
                disabled={isDisabled.kec}
                select
                fullWidth
                label="Kecamatan"
                name="kec"
                value={kecList.length > 0 ? values.kec : ""}
                helperText="Please select your kecamatan"
                variant="outlined"
                onChange={handleChangeTeks}
              >
                {kecList.length === 0
                  ? kecList
                  : kecList.map((option, index) => (
                      <MenuItem key={index} value={option.nama} id={option.id}>
                        {option.nama}
                      </MenuItem>
                    ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="kel-input"
                required
                disabled={isDisabled.kel}
                select
                fullWidth
                label="Kelurahan"
                name="kel"
                value={kelList.length > 0 ? values.kel : ""}
                helperText="Please select your kelurahan"
                variant="outlined"
                onChange={handleChangeTeks}
              >
                {kelList.length === 0
                  ? kelList
                  : kelList.map((option, index) => (
                      <MenuItem key={index} value={option.nama} id={option.id}>
                        {option.nama}
                      </MenuItem>
                    ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            disabled={!areAllFilled}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    rows: state.userDetail,
    provList: state.provinsiList,
    kabList: state.kabList,
    kecList: state.kecList,
    kelList: state.kelList,
    resPutData: state.resPutData,
    errorResPutData: state.errorResPutData,
    openAlert: state.openAlert,
    successAlert: state.successAlert,
  };
};

export default connect(mapStateToProps)(EditPegawai);
