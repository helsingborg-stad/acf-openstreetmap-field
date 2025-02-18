class HandleOptions {
    options: HTMLButtonElement[];

    constructor(private container: HTMLElement) {
        this.options = [...this.container.querySelectorAll('.acf-openstreetmap__option')] as HTMLButtonElement[];

        this.setupClickListeners();
    }

    public getCurrentButtonValue() {
        const selectedButton = this.options.find((option) => option.classList.contains('selected'));
        return selectedButton?.dataset.value;
    }

    private setupClickListeners() {
        this.options.forEach((option) => {
            option.addEventListener('click', () => {
                this.handleClick();
                option.classList.add('selected');
            });
        });
    }

    private handleClick() {
        this.options.forEach((option) => {
            option.classList.remove('selected');
        });
    }
}


export default HandleOptions;