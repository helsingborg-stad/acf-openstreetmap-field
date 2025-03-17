class HandleSelected implements HandleSelectedInterface {
    options: HTMLButtonElement[];
    currentSelected: string|undefined;

    constructor(private container: HTMLElement) {
        this.options = [...this.container.querySelectorAll('[acf-openstreetmap-option]')] as HTMLButtonElement[];

        this.setupClickListeners();
    }

    private setupClickListeners(): void {
        this.options.forEach((option) => {
            console.log(option);
            option.addEventListener('click', () => {
                if (option.classList.contains('selected')) {
                    option.classList.remove('selected');
                    this.currentSelected = undefined;
                    return;
                }

                this.clearSelected();
                option.classList.add('selected');
                this.currentSelected = option.dataset.jsValue;
            });
        });
    }

    public clearSelected(): void {
        this.options.forEach((option) => {
            option.classList.remove('selected');
        });

        this.currentSelected = undefined;
    }

    public getCurrentSelectedValue(): string|undefined {
        return this.currentSelected;
    }
}


export default HandleSelected;