class ListItemHelper {
    constructor(private iconFactoryInstance: IconFactoryInterface) {}

    createListItem(title: string, editText: string|null = null): HTMLLIElement {
        const li = document.createElement('li');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;
        
        const editIconSpan = this.createEditIcon(editText);

        li.appendChild(titleSpan);
        li.appendChild(editIconSpan);

        return li;
    }

    private createEditIcon(editText: string|null = null): HTMLSpanElement {
        const span = document.createElement('span');
        if (editText) {
            span.innerHTML = editText;
        } else {
            span.setAttribute('data-js-edit-icon', '');
            span.style.display = 'inline-flex';
            span.innerHTML = this.iconFactoryInstance.create('edit', '#000', 20, false);
        }

        return span;
    }
}

export default ListItemHelper;