let initialState = {
  rows: [],
  userDetail: {},
  error: null,
  loading: true,
  provinsiList: [],
  kabList: [],
  kecList: [],
  kelList: [],
  resPutData: [],
  openAlert: false,
  successAlert: true,
  errorResPutData: [],
};

const items = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_DATA_STARTED":
      return {
        ...state,
        loading: true,
      };
    case "INIT_DATA":
      return {
        ...state,
        loading: false,
        rows: action.rows,
      };
    case "ADD_DATA":
      return {
        ...state,
        rows: [action.payload.users, ...state.rows],
      };
    case "PUT_DATA":
      return {
        ...state,
        resPutData: action.data,
        openAlert: true,
        successAlert: action.data.status === 200 ? true : false,
      };
    case "ERROR_PUT_DATA":
      return {
        ...state,
        openAlert: true,
        successAlert: false,
        errorResPutData: action.data,
      };
    case "INIT_DATA_PROVINSI":
      return {
        ...state,
        kabList: [],
        kecList: [],
        kelList: [],
        provinsiList: action.payload.dataProv,
      };

    case "INIT_DATA_KABUPATEN":
      return {
        ...state,
        kecList: [],
        kelList: [],
        kabList: action.payload.dataKab,
      };
    case "INIT_DATA_KECAMATAN":
      return {
        ...state,
        kelList: [],
        kecList: action.payload.dataKec,
      };
    case "INIT_DATA_KELURAHAN":
      return {
        ...state,
        kelList: action.payload.dataKel,
      };
    case "GET_DETAIL":
      return {
        ...state,
        kabList: [],
        kelList: [],
        kecList: [],
        userDetail: action.payload.users,
      };
    case "DELETE_DATA_KABUPATEN":
      return {
        ...state,
        kabList: [],
      };

    case "DELETE_DATA_KECAMATAN":
      return {
        ...state,
        kecList: [],
      };
    case "DELETE_DATA_KELURAHAN":
      return {
        ...state,
        kelList: [],
      };
    case "CLOSE":
      return {
        ...state,
        openAlert: false,
      };

    default:
      return state;
  }
};

export default items;
