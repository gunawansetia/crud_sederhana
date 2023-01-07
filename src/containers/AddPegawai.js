import AddPegawai from "parts/AddPegawai";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    provList: state.provinsiList,
    kabList: state.kabList,
    kecList: state.kecList,
    kelList: state.kelList,
    resPostData: state.resPostData,
    errorResPostData: state.errorResPostData,
    openAlert: state.openAlert,
    successAlert: state.successAlert,
  };
};

export default connect(mapStateToProps)(AddPegawai);
