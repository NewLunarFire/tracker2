export default class Store {
    constructor() {
        this.state = {};
        this.callbacks = []
        this.mutators = {
            init_checks(state, checks) {
                state.checks = checks;
            }
        }
    }

    get_state()
    {
        return this.state;
    }

    commit(name, ...args)
    {
        console.log("State before mutation", this.state);
        const newState = structuredClone(this.state);

        this.mutators[name](newState, args);
        Object.freeze(newState);
        this.state = newState;

        console.log("State after mutation", this.state);
        for(const callback in this.callbacks)
        {
            callback(this.state);
        }
    }

    listen(callback)
    {
        this.callbacks.push(callback);
    }
}