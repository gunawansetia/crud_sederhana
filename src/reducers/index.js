let initialState = {
  rows: [],
  error: null,
  loading: true,
  provinsiList: [],
  kabList: [],
  kecList: [],
  kelList: [],
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

    default:
      return state;
  }
};

export default items;
