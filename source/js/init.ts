import Main from "./main";

declare const wp: any;

const fieldContainerSelector = '[data-js-openstreetmap-field]';
const fieldMapSelector = '[data-js-openstreetmap-map]';

const init = () => {
    console.log(wp);
    if (wp && wp.data && wp.data.select('core/edit-post')) {
        initGutenberg();
    } else {
        initClassic();
    }
}

const initGutenberg = () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof Element && node.classList.contains('wp-block')) {
                        setTimeout(() => {
                            const mapField = node.querySelector('[data-js-openstreetmap-field]');
                            console.log(node);
                            console.log(mapField);

                            if (!mapField) {
                                return;
                            }
                            createMapInstance(mapField as HTMLElement);
                        }, 1000);
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

const initClassic = () => {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll(fieldContainerSelector).forEach((container) => {
            createMapInstance(container as HTMLElement);
        });
    });
}

const createMapInstance = (container: HTMLElement) => {
    const map = container.querySelector(fieldMapSelector);
    const id = map?.id;

    if (!id) {
        return;
    }

    new Main(id, container as HTMLElement, map as HTMLElement);
}

init();