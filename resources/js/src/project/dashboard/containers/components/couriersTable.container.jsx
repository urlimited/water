import {connect} from "react-redux";
import {CouriersTableComponent} from "../../components/couriersTable.component";

const mapStateToProps = (state, ownProps) => ({
    couriers: state.data.couriers
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CouriersTableComponent);