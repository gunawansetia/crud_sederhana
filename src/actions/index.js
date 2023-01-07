import axios from "axios";

const endPoint = "https://61601920faa03600179fb8d2.mockapi.io/pegawai";
const endPointProv = "http://dev.farizdotid.com/api/daerahindonesia/provinsi";

export const fetchPegawaiTable = () => {
  return (dispatch) => {
    dispatch(initDataStarted());
    axios
      .get(endPoint)
      .then((res) => {
        let result = res.data;
        dispatch(initData(result));
        console.log(result);
      })
      .catch((err) => {
        dispatch(initDataFailed());
        console.log(err);
      });
  };
};

export const fetchProvinsiList = () => {
  return (dispatch) => {
    axios
      .get(endPointProv)
      .then((res) => {
        let result = res.data;
        console.log(result.provinsi);
        dispatch(initDataProvinsi(result.provinsi));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchKabupatenList = (idProv) => {
  return (dispatch) => {
    axios
      .get(
        `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProv}`
      )
      .then((res) => {
        let result = res.data;
        console.log(result);
        dispatch(initDataKabupaten(result.kota_kabupaten));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchKecamatanList = (idKab) => {
  return (dispatch) => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${idKab}`
      )
      .then((res) => {
        let result = res.data;
        console.log(result);
        dispatch(initDataKecamatan(result.kecamatan));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchKelurahanList = (idKec) => {
  return (dispatch) => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKec}`
      )
      .then((res) => {
        let result = res.data;
        console.log(result);
        dispatch(initDataKelurahan(result.kelurahan));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const postDataPegawai = (data) => {
  return (dispatch) => {
    axios
      .post("https://61601920faa03600179fb8d2.mockapi.io/pegawai", data)
      .then((res) => ({ status: res.status, body: res.data }))
      .then((obj) => {
        dispatch(addPegawai(obj));
        console.log(obj);
      })
      .catch((err) => {
        dispatch(errorAddPegawai(err));
        console.log(err);
      });
  };
};

export const putDataPegawai = (id, data) => {
  return (dispatch) => {
    axios
      .put(`https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`, data)
      .then((res) => ({ status: res.status, body: res.data }))
      .then((obj) => {
        dispatch(updatePegawai(obj));
        console.log(obj);
      })
      .catch((err) => {
        dispatch(errorUpdatePegawai(err));
        console.log(err);
      });
  };
};

export const deleteDataPegawai = (id) => {
  return (dispatch) => {
    axios
      .delete(`https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`)
      .then((res) => ({ status: res.status, body: res.data }))
      .then((obj) => {
        dispatch(deletePegawai(obj));
        console.log(obj);
      })
      .catch((err) => {
        dispatch(errorDeletePegawai(err));
        console.log(err);
      });
  };
};

export const getDetail = (data) => ({
  type: "GET_DETAIL",
  payload: {
    users: data,
  },
});

const addPegawai = (data) => ({
  type: "ADD_DATA",
  data,
});

const errorAddPegawai = (err) => ({
  type: "ERROR_ADD_DATA",
  err,
});

const updatePegawai = (data) => ({
  type: "PUT_DATA",
  data,
});

const errorUpdatePegawai = (data) => ({
  type: "ERROR_PUT_DATA",
  data,
});

const deletePegawai = (data) => ({
  type: "DELETE_DATA",
  data,
});

const errorDeletePegawai = (err) => ({
  type: "ERROR_DELETE_DATA",
  err,
});

export const deleteListKab = () => ({
  type: "DELETE_DATA_KABUPATEN",
});
export const deleteListKec = () => ({
  type: "DELETE_DATA_KECAMATAN",
});
export const deleteListKel = () => ({
  type: "DELETE_DATA_KELURAHAN",
});

export const initDataStarted = () => ({
  type: "INIT_DATA_STARTED",
});

const initData = (rows) => ({
  type: "INIT_DATA",
  rows,
});

const initDataFailed = () => ({
  type: "INIT_DATA_FAILED",
});

const initDataProvinsi = (data) => ({
  type: "INIT_DATA_PROVINSI",
  payload: {
    dataProv: data,
  },
});

const initDataKabupaten = (data) => ({
  type: "INIT_DATA_KABUPATEN",
  payload: {
    dataKab: data,
  },
});

const initDataKecamatan = (data) => ({
  type: "INIT_DATA_KECAMATAN",
  payload: {
    dataKec: data,
  },
});
const initDataKelurahan = (data) => ({
  type: "INIT_DATA_KELURAHAN",
  payload: {
    dataKel: data,
  },
});

export const closeAlert = () => ({
  type: "CLOSE",
});

export const closeDeleteAlert = () => ({
  type: "CLOSE_DELETE_ALERT",
});
