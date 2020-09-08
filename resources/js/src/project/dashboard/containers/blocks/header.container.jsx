import {connect} from "react-redux";
import {HeaderBlock} from "../../blocks/header.block";
import {apiLogoutRequest} from "../../../../core/auth/requests/logout.request";

const mapStateToProps = (state, ownProps) => ({
    pageErrors: state.pageData.pageErrors
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: () => dispatch(apiLogoutRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBlock)