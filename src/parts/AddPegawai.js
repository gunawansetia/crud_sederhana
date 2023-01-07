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
  closeAlert,
  deleteListKab,
  deleteListKec,
  deleteListKel,
  fetchKabupatenList,
  fetchKecamatanList,
  fetchKelurahanList,
  fetchProvinsiList,
  initDataStarted,
  postDataPegawai,
} from "actions";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BreadCrumbs from "component/BreadCrumbs";

function AddPegawai(props) {
  const {
    dispatch,
    provList,
    kabList,
    kecList,
    kelList,
    successAlert,
    openAlert,
    resPostData,
    errorResPostData,
  } = props;

  const defaultValues = {
    name: "",
    province: "",
    kab: "",
    kec: "",
    kel: "",
    jalan: "",
  };

  const defaultId = {
    province: "",
    kab: "",
    kec: "",
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

  const areAllFilled =
    values.name !== "" &&
    !/^\s+$/.test(values.name) &&
    values.province !== "" &&
    values.kab !== "" &&
    values.kec !== "" &&
    values.kel !== "" &&
    values.jalan !== "" &&
    !/^\s+$/.test(values.jalan);

  const handleChangeTeks = (e, newValue) => {
    const { name, value } = e.target;
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
    if (name === "jalan") {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const hChangeAutoComplete = (e, value) => {
    console.log(value);
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

  useEffect(() => {
    dispatch(initDataStarted());
    if (provList.length === 0) {
      dispatch(fetchProvinsiList());
    }

    if (
      id.province !== "" &&
      values.province !== null &&
      values.kab === "" &&
      kabList.length === 0
    ) {
      dispatch(fetchKabupatenList(id.province));
      setIsDisabled({
        ...isDisabled,
        kab: false,
      });
    }

    if (
      id.kab !== "" &&
      values.kab !== null &&
      values.kec === "" &&
      kecList.length === 0
    ) {
      dispatch(fetchKecamatanList(id.kab));
      setIsDisabled({
        ...isDisabled,
        kec: false,
      });
    }

    if (
      id.kec !== "" &&
      values.kec !== null &&
      values.kel === "" &&
      kelList.length === 0
    ) {
      dispatch(fetchKelurahanList(id.kec));
      setIsDisabled({
        ...isDisabled,
        kel: false,
      });
    }

    // eslint-disable-next-line
  }, [id.province, id.kab, id.kec]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      postDataPegawai({
        nama: values.name,
        provinsi: values.province,
        kabupaten: values.kab,
        kecamatan: values.kec,
        kelurahan: values.kel,
        jalan: values.jalan,
      })
    );
  };

  const handleClose = () => {
    dispatch(closeAlert());
  };

  return (
    <>
      <BreadCrumbs addActive={"Active"} />
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          fontWeight={500}
          sx={{ textAlign: "center", my: 3 }}
        >
          Tambah Pegawai
        </Typography>
        <Alert
          onClose={handleClose}
          severity={!successAlert ? "error" : "success"}
          sx={{ display: openAlert ? "flex" : "none", mb: 3 }}
        >
          {`This is a ${!successAlert ? "error" : "success"} alert - ${
            !successAlert ? errorResPostData : resPostData.status
          }`}
        </Alert>

        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{ mb: 3 }}
            columns={{ xs: 4, sm: 12 }}
          >
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
                required
                data-set
                renderInput={(params) => (
                  <TextField {...params} name="province" label="Provinsi" />
                )}
                label="Provinsi"
                onChange={hChangeAutoComplete}
                options={provList}
                getOptionLabel={(option) => option.nama || ""}
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
                defaultValue=""
                name="kab"
                value={values.kab || ""}
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
                defaultValue=""
                name="kec"
                value={values.kec || ""}
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
                defaultValue=""
                name="kel"
                value={values.kel || ""}
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
            <Grid item xs={4}>
              <TextField
                id="jalan-input"
                required
                label="Jalan"
                fullWidth
                name="jalan"
                variant="standard"
                value={values.jalan || ""}
                onChange={handleChangeTeks}
              />
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
    provList: state.provinsiList,
    kabList: state.kabList,
    kecList: state.kecList,
    kelList: state.kelList,
    resPostData: state.resPostData,
    errorResPostData: state.errorResPostData,
    openAlert: state.openAlert,
    successAlert: state.successAlert,
  };
};

export default connect(mapStateToProps)(AddPegawai);
