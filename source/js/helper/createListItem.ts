class ListItemHelper {
    constructor(private iconFactoryInstance: IconFactoryInterface) {}

    createListItem(title: string): HTMLLIElement {
        const li = document.createElement('li');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;

        
        const editIconSpan = document.createElement('span');
        editIconSpan.setAttribute('data-js-edit-icon', '');
        editIconSpan.style.display = 'inline-flex';
        editIconSpan.innerHTML = this.iconFactoryInstance.create('edit', '#000', 20, false);

        li.appendChild(titleSpan);
        li.appendChild(editIconSpan);

        return li;
    }
}

export default ListItemHelper;