import {connect} from "react-redux";
import HomePage from "../../pages/home.page";
import {apiGetUserRequest} from "../../../auth/requests/getUser.request";
import {UserFactory} from "../../../auth/models/user.model";

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return ({
        user: UserFactory.createUser(state.userData)
    });
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getUser: () => dispatch(apiGetUserRequest(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);