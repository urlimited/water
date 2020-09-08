import * as actions from "../constants/actions.constant";

const setProblems = (problems) => ({
    type: actions.ACTION_SET_PROBLEMS,
    problems
});

export default setProblems;