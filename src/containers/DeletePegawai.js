import DeletePegawai from "parts/DeletePegawai";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    resDeleteData: state.resDeleteData,
    errorResDeleteData: state.errorResDeleteData,
    openDeleteAlert: state.openDeleteAlert,
  };
};

export default connect(mapStateToProps)(DeletePegawai);
