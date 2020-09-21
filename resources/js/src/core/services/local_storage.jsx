export const loadState = () => {
    try {
        //TODO: распланировать cache management structure
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return console.log(err);
    }
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        console.log("state is saved in local storage");
        localStorage.setItem("state", serializedState);
    } catch (err) {
        console.log(err);
    }
};