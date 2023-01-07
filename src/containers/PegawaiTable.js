import PegawaiTable from "parts/PegawaiTable";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    rows: state.rows,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(PegawaiTable);
