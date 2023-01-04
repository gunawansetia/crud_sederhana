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
  };

  const initDisabled = {
    kab: true,
    kec: true,
  };

  const [option, setOption] = useState(defaultOption);
  const [isDisabled, setIsDisabled] = useState(initDisabled);

  const [values, setValues] = useState(defaultValues);
  const [id, setId] = useState(defaultId);

  const endPoint = "http://dev.farizdotid.com/api/daerahindonesia/provinsi";

  useEffect(() => {
    if (option.provinsiList.length === 0) {
      axios
        .get(endPoint)
        .then((res) => {
          let result = res.data;
          console.log(result.provinsi);
          setOption({
            ...option,
            provinsiList: result.provinsi,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (values.kab === "" && option.kabList.length === 0) {
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

    if (values.kec === "" && option.kecList.length === 0) {
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
  }, [id.province, id.kab]);

  const handleInputChange = (event, newValue) => {
    const { name, value } = event.target;
    console.log(newValue);
    setValues({
      ...values,
      [name]: value,
    });

    if (newValue ? true : false) {
      console.log(event);
      setIsDisabled({ ...isDisabled, kab: true });
      if (!name) {
        setValues({
          ...values,
          kab: "",
          province: newValue.nama,
        });
        setId({
          ...id,
          province: newValue.id,
        });
      } else {
        setValues({
          ...values,
          kab: "",
          [name]: newValue.nama,
        });
        setId({
          ...id,
          [name]: newValue.id,
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values, id);
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
            <Grid item>
              <TextField
                id="name-input"
                required
                label="Nama"
                name="name"
                variant="standard"
                value={values.name || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                id="province-input"
                required
                data-set
                renderInput={(params) => (
                  <TextField {...params} name="province" label="Provinsi" />
                )}
                label="Provinsi"
                sx={{ minWidth: 250 }}
                onChange={handleInputChange}
                options={option.provinsiList}
                getOptionLabel={(option) => option.nama || ""}
              />
            </Grid>
            <Grid item>
              <TextField
                id="kab-input"
                required
                disabled={isDisabled.kab}
                select
                label="Kabupaten"
                defaultValue=""
                name="kab"
                value={values.kab || ""}
                helperText="Please select your kabupaten"
                variant="standard"
                onChange={(e, newValue) => {
                  setValues({
                    ...values,
                    kab: e.target.value,
                  });
                  setId({
                    ...id,
                    kab: newValue.props.id,
                  });
                }}
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
            <Grid item>
              <TextField
                id="kec-input"
                required
                disabled={isDisabled.kec}
                select
                label="Kecamatan"
                defaultValue=""
                name="kec"
                value={values.kec || ""}
                helperText="Please select your kecamatan"
                variant="standard"
                onChange={(e) => {
                  setValues({
                    ...values,
                    kec: e.target.value,
                  });
                }}
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
          </Grid>
          <Button color="primary" variant="outlined" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}
