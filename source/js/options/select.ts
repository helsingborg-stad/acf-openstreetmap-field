class Select implements SelectInterface {
    constructor() {

    }

    public onOptionUpdated(value: string|undefined): void {
        console.log("new")
    }
}

export default Select;