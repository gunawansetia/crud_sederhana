import EditPegawai from "parts/EditPegawai";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    rows: state.userDetail,
    provList: state.provinsiList,
    kabList: state.kabList,
    kecList: state.kecList,
    kelList: state.kelList,
    resPutData: state.resPutData,
    errorResPutData: state.errorResPutData,
    openAlert: state.openAlert,
    successAlert: state.successAlert,
  };
};

export default connect(mapStateToProps)(EditPegawai);
