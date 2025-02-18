import Main from "./main";
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-js-openstreetmap-field]').forEach((element) => {
        const id = element.id;

        if (!id) {
            return;
        }

        new Main(id, element as HTMLElement);
    });
});