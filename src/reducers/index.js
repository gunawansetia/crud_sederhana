let initialState = {
  id: "",
  rows: [],
  error: null,
  loading: true,
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

    default:
      return state;
  }
};

export default items;
