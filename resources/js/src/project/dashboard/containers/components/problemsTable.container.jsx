import {connect} from "react-redux";
import {apiGetProblems} from "../../requests/getProblems.request";
import {ProblemsTableComponent} from "../../components/problemsTable.component";

const mapStateToProps = (state, ownProps) => ({
    problems: state.data.problems,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getProblems: () => dispatch(apiGetProblems())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsTableComponent);