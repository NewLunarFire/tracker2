export default class CheckStore {
    constructor() {
        this.checks = {}
        this.add_check_callback = []
        this.update_check_callback = []
    }

    add_check(check)
    {
        this.checks[check.id] = check;
        check.in_logic = (check.logic == null);
        check.is_checked = false;

        this.add_check_callback.forEach(callback => callback(check));
    }

    get_all_checks()
    {
        return Object.values(this.checks);
    }

    get_check(id)
    {
        return this.checks[id];
    }

    set_in_logic(id, in_logic)
    {
        const check = this.checks[id];
        if(check.in_logic === in_logic)
            return;

        check.in_logic = in_logic;
        this.update_check_callback.forEach(callback => callback(check));
    }

    set_is_checked(id, is_checked)
    {
        const check = this.checks[id];
        if(check.is_checked === is_checked)
            return;

        check.is_checked = is_checked;
        this.update_check_callback.forEach(callback => callback(check));
    }

    on_check_added(callback)
    {
        this.add_check_callback.push(callback);
    }

    on_check_updated(callback)
    {
        this.update_check_callback.push(callback);
    }
}