export function createListItem(title: string): HTMLLIElement {
    const li = document.createElement('li');

    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;

    const editIconSpan = document.createElement('span');
    editIconSpan.className = 'dashicons dashicons-edit';

    li.appendChild(titleSpan);
    li.appendChild(editIconSpan);

    return li;
}