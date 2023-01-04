import axios from "axios";

const endPoint = "https://61601920faa03600179fb8d2.mockapi.io/pegawai";

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

const initDataStarted = () => ({
  type: "INIT_DATA_STARTED",
});

const initData = (rows) => ({
  type: "INIT_DATA",
  rows,
});
