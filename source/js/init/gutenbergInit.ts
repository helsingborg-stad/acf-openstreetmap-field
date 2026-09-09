import Main from "../main";
import { StaticBlockDataStore } from "../save";
import { BlockSettings } from "../types";

class GutenbergInit {
    private readonly fieldContainerSelector = '[data-js-openstreetmap-field]';
    private readonly fieldMapSelector = '[data-js-openstreetmap-map]';
    private readonly fieldTypeSelector = '[data-type="openstreetmap"]';
    private readonly blockIdAttribute = 'data-block-id';

    private initiatedBlocksWithField: Record<string, { align: string | undefined; main: Main }> = {};
    private initializedContainers = new WeakSet<HTMLElement>();
    private domObserver: MutationObserver | null = null;

    constructor(private wp: any) {}

    public init(): void {
        document.addEventListener('click', () => {
            const selectedBlock = this.wp.data.select('core/block-editor').getSelectedBlock();
            const selectedBlockId = selectedBlock?.clientId ?? null;
            StaticBlockDataStore.setActiveBlockId(selectedBlockId);

            if (selectedBlock && selectedBlock.clientId && this.initiatedBlocksWithField[selectedBlock.clientId]) {
                if (selectedBlock.attributes.align !== this.initiatedBlocksWithField[selectedBlock.clientId].align) {
                    this.initiatedBlocksWithField[selectedBlock.clientId].align = selectedBlock.attributes.align;
                    this.initiatedBlocksWithField[selectedBlock.clientId].main.invalidateSize();
                }
            }
        });

        this.domObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
                    this.scanNodeForFieldContainers(mutation.target);
                }

                mutation.addedNodes.forEach((addedNode) => {
                    this.scanNodeForFieldContainers(addedNode);
                });
            });
        });

        this.domObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [this.blockIdAttribute, 'data-type'],
        });

        this.scanNodeForFieldContainers(document.body);
    }

    private scanNodeForFieldContainers(node: Node): void {
        if (!(node instanceof HTMLElement)) {
            return;
        }

        if (node.matches(this.fieldContainerSelector)) {
            this.initializeFieldContainer(node);
        }

        node.querySelectorAll(this.fieldContainerSelector).forEach((containerNode) => {
            if (containerNode instanceof HTMLElement) {
                this.initializeFieldContainer(containerNode);
            }
        });
    }

    private initializeFieldContainer(container: HTMLElement): void {
        if (this.initializedContainers.has(container)) {
            return;
        }

        const wpBlock = container.closest('.wp-block');
        if (wpBlock instanceof HTMLElement) {
            wpBlock.setAttribute('draggable', 'false');
        }

        const blockContext = this.getBlockContextFromContainer(container);
        const mapInstance = this.createMapInstance(container, blockContext);

        if (!mapInstance) {
            return;
        }

        this.initializedContainers.add(container);

        if (blockContext) {
            this.initiatedBlocksWithField[blockContext.blockId] = {
                align: this.getBlockAlign(blockContext.blockId),
                main: mapInstance,
            };
        }
    }

    private getBlockContextFromContainer(container: HTMLElement): BlockSettings | null {
        const settingsElement = container.closest(`[${this.blockIdAttribute}]`);

        if (!(settingsElement instanceof HTMLElement)) {
            return null;
        }

        const blockIdAttribute = settingsElement.getAttribute(this.blockIdAttribute);
        const blockId = this.normalizeBlockId(blockIdAttribute);
        const openstreetmapField = settingsElement.querySelector(this.fieldTypeSelector);
        const fieldName = openstreetmapField?.getAttribute('data-name');

        if (!blockId || !fieldName) {
            return null;
        }

        return {
            blockId,
            fieldName,
        };
    }

    private normalizeBlockId(rawBlockId: string | null): string | null {
        if (!rawBlockId) {
            return null;
        }

        if (rawBlockId.startsWith('block_')) {
            return rawBlockId.slice(6);
        }

        return rawBlockId;
    }

    private getBlockAlign(blockId: string): string | undefined {
        const editor = this.wp.data.select('core/block-editor');
        const block = editor?.getBlock?.(blockId);

        return block?.attributes?.align;
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