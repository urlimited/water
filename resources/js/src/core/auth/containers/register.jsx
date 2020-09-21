import defaultComponent from "../loginPage.component";
import {connect} from "react-redux";
import {apiRegisterRequest} from "../requests/register.request";

const mapStateToProps = (state, ownProps) => {
    return ({

    });
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        register: (data) => dispatch(apiRegisterRequest(data)),
        //apiAuthAttempt: (login, pass) => dispatch(apiAuthRequest(login, pass))
        //changeUserData: () => dispatch()
    });
}



export default (component = defaultComponent) => connect(mapStateToProps, mapDispatchToProps)(component)