import Main from "../main";
import { BlockSettings } from "../types";

class GutenbergInit {
    private readonly fieldContainerSelector = '[data-js-openstreetmap-field]';
    private readonly fieldMapSelector = '[data-js-openstreetmap-map]';
    private readonly fieldTypeSelector = '[data-type="openstreetmap"]';

    private checkedSettings: string[] = [];
    private initiatedBlocksWithField: Record<string, { align: string | undefined; main: Main }> = {};

    constructor(private wp: any) {}

    public init(): void {
        const editor = this.wp.data.select('core/block-editor');

        document.addEventListener('click', () => {
            const selectedBlock = this.wp.data.select('core/block-editor').getSelectedBlock();

            if (selectedBlock && selectedBlock.clientId && this.initiatedBlocksWithField[selectedBlock.clientId]) {
                if (selectedBlock.attributes.align !== this.initiatedBlocksWithField[selectedBlock.clientId].align) {
                    this.initiatedBlocksWithField[selectedBlock.clientId].align = selectedBlock.attributes.align;
                    this.initiatedBlocksWithField[selectedBlock.clientId].main.invalidateSize();
                }
            }
        });

        const observer = new MutationObserver(() => {
            const blocks = editor.getBlocks();
            const newBlocks = blocks.filter((block: any) => !this.checkedSettings.includes(block.clientId));

            if (newBlocks.length > 0) {
                this.handleAddedBlocks(newBlocks);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-block-id', 'data-type', 'style'],
        });

        this.scanExistingBlocks();
    }

    private scanExistingBlocks(): void {
        const editor = this.wp.data.select('core/block-editor');
        const blocks = editor.getBlocks();

        if (blocks.length > 0) {
            this.handleAddedBlocks(blocks);
        }
    }

    private handleAddedBlocks(blocks: any[]): void {
        blocks.forEach((block: any) => {
            if (!block.clientId || this.checkedSettings.includes(block.clientId)) {
                return;
            }

            const settings = this.lookForSettings(block.clientId);

            if (!settings) {
                return;
            }

            this.checkedSettings.push(block.clientId);
            const mapFieldContainer = settings.querySelector(this.fieldContainerSelector);
            const openstreetmapField = settings.querySelector(this.fieldTypeSelector);

            if (mapFieldContainer && openstreetmapField?.getAttribute('data-name')) {
                const wpBlock = openstreetmapField.closest('.wp-block') as HTMLElement | null;

                if (wpBlock) {
                    wpBlock.setAttribute('draggable', 'false');
                }

                const mapInstance = this.createMapInstance(
                    mapFieldContainer as HTMLElement,
                    {
                        blockId: block.clientId,
                        fieldName: openstreetmapField.getAttribute('data-name')!,
                    },
                );

                if (mapInstance) {
                    this.initiatedBlocksWithField[block.clientId] = {
                        align: block.attributes.align,
                        main: mapInstance,
                    };
                }
            }
        });
    }

    private lookForSettings(clientId: string): Element | null {
        return document.querySelector(`[data-block-id="block_${clientId}"]`);
    }

    private createMapInstance(container: HTMLElement, blockId: BlockSettings | null = null): Main | null {
        const map = container.querySelector(this.fieldMapSelector);
        const id = map?.id;

        if (!id) {
            return null;
        }

        return new Main(id, container as HTMLElement, map as HTMLElement, blockId);
    }
}

export default GutenbergInit;