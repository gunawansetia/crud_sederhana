import {
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AddPegawai() {
  const defaultValues = {
    name: "",
    province: "",
    kab: "",
    kec: "",
    kel: "",
  };

  const defaultOption = {
    provinsiList: [],
    kabList: [],
    kecList: [],
    kelList: [],
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

  const [option, setOption] = useState(defaultOption);
  const [isDisabled, setIsDisabled] = useState(initDisabled);

  const [values, setValues] = useState(defaultValues);
  const [id, setId] = useState(defaultId);

  const endPoint = "http://dev.farizdotid.com/api/daerahindonesia/provinsi";

  const areAllFilled =
    values.name !== "" &&
    values.province !== "" &&
    values.kab !== "" &&
    values.kec !== "" &&
    values.kel !== "";

  const handleChangeTeks = (e, newValue) => {
    const { name, value } = e.target;
    if (name === "name")
      setValues({
        ...values,
        [name]: value,
      });
    if (name === "kab") {
      setOption({
        ...option,
        kelList: [],
        kecList: [],
      });
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
      setOption({ ...option, kelList: [] });
      setIsDisabled({ ...isDisabled, kel: true });
      setValues({ ...values, kel: "", kec: value });
      setId({ ...id, kec: newValue ? newValue.props.id : null });
    }
    if (name === "kel") {
      setValues({ ...values, kel: value });
    }
  };

  const hChangeAutoComplete = (e, value) => {
    setOption({
      ...option,
      kabList: [],
      kecList: [],
      kelList: [],
    });
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
  };

  useEffect(() => {
    if (option.provinsiList.length === 0) {
      axios
        .get(endPoint)
        .then((res) => {
          let result = res.data;
          console.log(result.provinsi);
          setOption({
            ...option,
            kabList: [],
            kecList: [],
            provinsiList: result.provinsi,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (
      id.province !== "" &&
      values.province !== null &&
      values.kab === "" &&
      option.kabList.length === 0
    ) {
      const endPointKab = `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id.province}`;

      axios
        .get(endPointKab)
        .then((res) => {
          let result = res.data;
          console.log(result);
          setOption({
            ...option,
            kabList: result.kota_kabupaten,
          });
          setIsDisabled({
            ...isDisabled,
            kab: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (
      id.kab !== "" &&
      values.kab !== null &&
      values.kec === "" &&
      option.kecList.length === 0
    ) {
      const endPointKec = `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id.kab}`;

      axios.get(endPointKec).then((res) => {
        let result = res.data;
        console.log(result);
        setOption({
          ...option,
          kecList: result.kecamatan,
        });
        setIsDisabled({
          ...isDisabled,
          kec: false,
        });
      });
    }

    if (
      id.kec !== "" &&
      values.kec !== null &&
      values.kel === "" &&
      option.kelList.length === 0
    ) {
      const endPointKel = `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id.kec}`;

      axios.get(endPointKel).then((res) => {
        let result = res.data;
        console.log(result);
        setOption({
          ...option,
          kelList: result.kelurahan,
        });
        setIsDisabled({
          ...isDisabled,
          kel: false,
        });
      });
    }

    // eslint-disable-next-line
  }, [id.province, id.kab, id.kec]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      values.name !== "" &&
      values.kab !== "" &&
      values.province !== "" &&
      values.kec !== "" &&
      values.kel !== ""
    ) {
      console.log("Benar", values);
    } else {
      console.log("Tidak Lengkap", values);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          fontWeight={500}
          sx={{ textAlign: "center", my: 3 }}
        >
          Tambah Pegawai
        </Typography>

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
                required
                data-set
                renderInput={(params) => (
                  <TextField {...params} name="province" label="Provinsi" />
                )}
                label="Provinsi"
                onChange={hChangeAutoComplete}
                options={option.provinsiList}
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
                variant="standard"
                onChange={handleChangeTeks}
              >
                {option.kabList.length === 0
                  ? option.kabList
                  : option.kabList.map((option, index) => (
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
                {option.kecList.length === 0
                  ? option.kecList
                  : option.kecList.map((option, index) => (
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
                {option.kelList.length === 0
                  ? option.kelList
                  : option.kelList.map((option, index) => (
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
