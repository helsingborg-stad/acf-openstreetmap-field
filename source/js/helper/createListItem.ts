class ListItemHelper {
    constructor(private iconFactoryInstance: IconFactoryInterface) {}

    public createListItem(title: string, editText: string|null = null): HTMLLIElement {
        const li = document.createElement('li');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;
        
        const editIconSpan = this.createEditIcon(editText);

        li.appendChild(titleSpan);
        li.appendChild(editIconSpan);

        return li;
    }

    public createLayerGroupListItem(title: string): HTMLLIElement {
        const li = document.createElement('li');
        li.classList.add('button');
        li.innerHTML = `<span style="display: flex; justify-content: space-between; align-items: center; width: 100%;"><span data-js-title>${title}</span><span data-js-edit>edit</span></span>`;

        return li;
    }

    public createMarkerListItem(title: string, color: string): HTMLLIElement {
        const li = document.createElement('li');
        li.innerHTML = `<span style="display: flex; align-items: center; gap: .25rem;"><span style="border-radius: 50%; width: .25rem; height: .25rem; background-color:${color};"></span>${title}</span>`;

        return li;
    }

    public createImageOverlayListItem(title: string): HTMLLIElement {
        const li = document.createElement('li');
        li.innerHTML = `<span style="border-radius: 50%; width: .25rem; height: .25rem;">${title}</span>`;

        return li;
    }


    private createEditIcon(editText: string|null = null): HTMLSpanElement {
        const span = document.createElement('span');
        if (editText) {
            span.innerHTML = `<span data-js-edit>${editText}</span>`;
        } else {
            span.setAttribute('data-js-edit', '');
            span.style.display = 'inline-flex';
            span.innerHTML = this.iconFactoryInstance.create('edit', '#000', 20, false);
        }

        return span;
    }
}

export default ListItemHelper;