class Edit implements EditInterface {
    private activeEditable: Editable|null = null;
    constructor(private container: HTMLElement) {
        this.setupCancel();
        this.setupSave();
        this.setupDelete();
    }

    private setupDelete() {
        this.container.querySelector('[data-js-field-edit-delete]')?.addEventListener('click', () => {
            if (this.getActiveEditable()) {
                this.getActiveEditable()!.delete();
            }
        });
    }

    private setupSave() {
        this.container.querySelector('[data-js-field-edit-save]')?.addEventListener('click', () => {
            if (this.getActiveEditable()) {
                this.getActiveEditable()!.save();
            }
        });
    }

    private setupCancel() {
        this.container.querySelector('[data-js-field-edit-cancel]')?.addEventListener('click', () => {
            if (this.getActiveEditable()) {
                this.getActiveEditable()!.cancel();
            }
        });
    }

    public setActiveEditable(editable: Editable|null) {
        if (this.getActiveEditable()) {
            this.getActiveEditable()!.hideFields();
        }

        this.activeEditable = editable;
    }

    public getActiveEditable() {
        return this.activeEditable;
    }
}

export default Edit;