import {connect} from "react-redux";
import DashboardLayout from "../../pages/dashboard.layout";
import {apiGetUserRequest} from "../../../auth/requests/getUser.request";
import {UserFactory} from "../../../auth/models/user.model";

const mapStateToProps = (state, ownProps) => {
    console.log(state);

    return ({
        user: UserFactory.createUser(state.userData)
    });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getUser: () => dispatch(apiGetUserRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);