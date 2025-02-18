import Main from "./main";
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-js-openstreetmap-field]').forEach((container) => {
        const map = container.querySelector('[data-js-openstreetmap-map]');
        const id = map?.id;

        if (!id) {
            return;
        }

        new Main(id, container as HTMLElement, map as HTMLElement);
    });
});