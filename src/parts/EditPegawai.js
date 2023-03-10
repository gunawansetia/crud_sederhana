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
  putDataPegawai,
} from "actions";
import BreadCrumbs from "component/BreadCrumbs";
import React, { useEffect, useState } from "react";

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
    jalan: rows.jalan || "",
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

  const [isDisabled, setIsDisabled] = useState(initDisabled);
  const [values, setValues] = useState(defaultValues);
  const [id, setId] = useState(defaultId);

  useEffect(() => {
    dispatch(initDataStarted());
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

      setId({ ...id, kab: initIdKab ? initIdKab.id : "" });
    }
    if (id.kec === "" && kecList.length > 0 && values.kec === rows.kecamatan) {
      let initIdKec = kecList.find((item) => item.nama === defaultValues.kec);

      setId({ ...id, kec: initIdKec ? initIdKec.id : "" });
    }
    // eslint-disable-next-line
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
    values.kel !== "" &&
    values.jalan !== "" &&
    !/^\s+$/.test(values.jalan);

  const handleChangeTeks = (e, newValue) => {
    const { name, value } = e.target;

    if (name === "name") {
      setValues({
        ...values,
        [name]: value,
      });
    }
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
        jalan: values.jalan,
      })
    );
  };

  return (
    <>
      <BreadCrumbs />

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

export default EditPegawai;
