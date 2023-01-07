let initialState = {
  rows: [],
  userDetail: {},
  error: null,
  loading: true,
  provinsiList: [],
  kabList: [],
  kecList: [],
  kelList: [],
  resPostData: [],
  resPutData: [],
  resDeleteData: [],
  openAlert: false,
  successAlert: true,
  openDeleteAlert: false,
  errorResPostData: [],
  errorResPutData: [],
  errorResDeleteData: [],
};

const items = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_DATA_STARTED":
      return {
        ...state,
        openAlert: false,
        loading: true,
      };
    case "INIT_DATA":
      return {
        ...state,
        loading: false,
        rows: action.rows,
      };
    case "INIT_DATA_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "ADD_DATA":
      return {
        ...state,
        resPostData: action.data,
        rows: [],
        openAlert: true,
        successAlert:
          action.data.status >= 200 && action.data.status <= 299 ? true : false,
        errorResPostData: [],
      };
    case "ERROR_ADD_DATA":
      return {
        ...state,
        openAlert: true,
        resPostData: [],
        successAlert: false,
        errorResPostData: action.err,
      };
    case "PUT_DATA":
      return {
        ...state,
        rows: [],
        errorResPutData: [],
        resPutData: action.data,
        openAlert: true,
        successAlert: action.data.status === 200 ? true : false,
      };
    case "ERROR_PUT_DATA":
      return {
        ...state,
        openAlert: true,
        successAlert: false,
        resPutData: [],
        errorResPutData: action.data,
      };
    case "DELETE_DATA":
      return {
        ...state,
        resDeleteData: action.data,
        errorResDeleteData: [],
        openDeleteAlert: true,
      };
    case "ERROR_DELETE_DATA":
      return {
        ...state,
        openAlert: true,
        resDeleteData: [],
        errorResDeleteData: action.err,
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
    case "CLOSE_DELETE_ALERT":
      return {
        ...state,
        openDeleteAlert: false,
        rows: [],
      };

    default:
      return state;
  }
};

export default items;
