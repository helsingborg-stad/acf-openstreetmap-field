class HandleSelected implements HandleSelectedInterface {
    options: HTMLButtonElement[];

    constructor(private container: HTMLElement, private selectInstance: SelectInterface) {
        this.options = [...this.container.querySelectorAll('.acf-openstreetmap__option')] as HTMLButtonElement[];

        this.setupClickListeners();
    }

    private setupClickListeners(): void {
        this.options.forEach((option) => {
            option.addEventListener('click', () => {
                if (option.classList.contains('selected')) {
                    return;
                }

                this.handleClick();
                option.classList.add('selected');
                this.selectInstance.onOptionUpdated(option.value);
            });
        });
    }

    private handleClick(): void {
        this.options.forEach((option) => {
            option.classList.remove('selected');
        });
    }

    public getSelectedOption(): string|undefined {
        const selected = this.options.find((option) => option.classList.contains('selected'));
        return selected?.value;
    }
}


export default HandleSelected;