import Main from "./main";
import { BlockSettings } from "./types";

declare const wp: any;

const fieldContainerSelector = '[data-js-openstreetmap-field]';
const fieldMapSelector = '[data-js-openstreetmap-map]';
const fieldTypeSelector = '[data-type="openstreetmap"]';

let checkWhenSettings: string[] = [];
let checkedSettings: string[] = [];

const init = () => {
    if (wp && wp.data && wp.data.select('core/edit-post')) {
        initGutenberg();
    } else {
        initClassic();
    }
}

const initGutenberg = () => {
    const editor = wp.data.select('core/block-editor');

    wp.data.subscribe(() => {
        const blocks = editor.getBlocks();
        const selectedBlock = editor.getSelectedBlock();

        handleSelectedBlock(selectedBlock);
        handleAddedBlocks(blocks);
    });
};

const handleSelectedBlock = (selectedBlock: any) => {
    if (selectedBlock && checkWhenSettings.includes(selectedBlock.clientId)) {
        const selectedSettings = lookForSettings(selectedBlock.clientId);
        if (selectedSettings && !checkedSettings.includes(selectedBlock.clientId)) {
            checkWhenSettings = checkWhenSettings.filter((clientId) => clientId !== selectedBlock.client);
            checkedSettings.push(selectedBlock.clientId);
            const selectedMapFieldContainer = selectedSettings.querySelector(fieldContainerSelector);
            const openstreetmapField = selectedSettings.querySelector(fieldTypeSelector);

            if (selectedMapFieldContainer && openstreetmapField?.getAttribute('data-name')) {
                createMapInstance(selectedMapFieldContainer as HTMLElement, { blockId: selectedBlock.clientId, fieldName: openstreetmapField.getAttribute('data-name')! });
            }
        }
    }
}

const handleAddedBlocks = (blocks: any) => {
    blocks.forEach((block: any) => {
        if (!block.clientId) {
            return;
        }

        const settings = lookForSettings(block.clientId);

        if (checkedSettings.includes(block.clientId)) {
            return;
        }

        if (!settings) {
            checkWhenSettings.push(block.clientId);
            return;
        } 

        checkedSettings.push(block.clientId);
        const mapFieldContainer = settings.querySelector(fieldContainerSelector);
        const openstreetmapField = settings.querySelector(fieldTypeSelector);

        if (mapFieldContainer && openstreetmapField?.getAttribute('data-name')) {
            createMapInstance(mapFieldContainer as HTMLElement, { blockId: block.clientId, fieldName: openstreetmapField.getAttribute('data-name')! });
        }
    });
}

const lookForSettings = (clientId: string): Element|null => {
    return document.querySelector(`[data-block-id="block_${clientId}"]`);
}

const initClassic = () => {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll(fieldContainerSelector).forEach((container) => {
            createMapInstance(container as HTMLElement);
        });
    });
}

const createMapInstance = (container: HTMLElement, blockId: BlockSettings|null = null) => {
    const map = container.querySelector(fieldMapSelector);
    const id = map?.id;

    if (!id) {
        return;
    }

    new Main(id, container as HTMLElement, map as HTMLElement, blockId);
}

init();