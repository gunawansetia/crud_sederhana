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
      console.log("Masuk");
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
  }, [id.province, id.kab, id.kec]);

  // const handleInputChange = (event, newValue) => {
  //   const { name, value } = event.target;
  //   setIsDisabled({ ...isDisabled, kab: true });
  //   console.log(newValue);
  //   setValues({
  //     ...values,
  //     kab: "",
  //     kec: "",
  //     [name]: value,
  //   });

  //   setOption({
  //     ...option,
  //     kabList: [],
  //     kecList: [],
  //   });

  //   if (newValue ? true : false) {
  //     console.log(event);
  //     setIsDisabled({ ...isDisabled, kab: true });
  //     if (!name) {
  //       setValues({
  //         ...values,
  //         kab: "",
  //         province: newValue.nama,
  //       });
  //       setId({
  //         ...id,
  //         province: newValue.id,
  //       });
  //     } else {
  //       setValues({
  //         ...values,
  //         kab: "",
  //         [name]: newValue.nama,
  //       });
  //       setId({
  //         ...id,
  //         [name]: newValue.id,
  //       });
  //     }
  //   }
  // };

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
                onChange={(e, value) => {
                  setValues({
                    ...values,
                    name: e.target.value,
                  });
                }}
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
                onChange={(e, value) => {
                  console.log(value);
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
                }}
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
                  setOption({
                    ...option,
                    kelList: [],
                    kecList: [],
                  });
                  setValues({
                    ...values,
                    kec: "",
                    kel: "",
                    kab: e.target.value,
                  });
                  setIsDisabled({ ...isDisabled, kec: true, kel: true });
                  setId({
                    ...id,
                    kec: "",
                    kel: "",
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
                onChange={(e, newValue) => {
                  console.log(newValue);
                  setOption({
                    ...option,
                    kelList: [],
                  });
                  setIsDisabled({ ...isDisabled, kel: true });
                  setValues({
                    ...values,
                    kel: "",
                    kec: e.target.value,
                  });
                  setId({
                    ...id,
                    kec: newValue ? newValue.props.id : null,
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
            <Grid item>
              <TextField
                id="kel-input"
                required
                disabled={isDisabled.kel}
                select
                label="Kelurahan"
                defaultValue=""
                name="kel"
                value={values.kel || ""}
                helperText="Please select your kelurahan"
                variant="standard"
                onChange={(e) => {
                  setValues({
                    ...values,
                    kel: e.target.value,
                  });
                }}
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
          <Button color="primary" variant="outlined" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}
