class ListItemHelper {
    constructor(private iconFactoryInstance: IconFactoryInterface) {}

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
}

export default ListItemHelper;