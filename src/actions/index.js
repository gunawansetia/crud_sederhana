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
      })
      .catch((err) => {
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

export const addSiswa = (data) => ({
  type: "ADD_DATA",
  payload: {
    users: data,
  },
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

const initDataStarted = () => ({
  type: "INIT_DATA_STARTED",
});

const initData = (rows) => ({
  type: "INIT_DATA",
  rows,
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
