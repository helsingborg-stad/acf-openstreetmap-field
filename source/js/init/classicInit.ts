import Main from "../main";
import { BlockSettings } from "../types";

class ClassicInit {
    private readonly fieldContainerSelector: string = '[data-js-openstreetmap-field]';
    private readonly fieldMapSelector: string = '[data-js-openstreetmap-map]';

    public init() {
        document.querySelectorAll(this.fieldContainerSelector).forEach((container) => {
            this.createMapInstance(container as HTMLElement);
        });
    };
    
    private createMapInstance(
        container: HTMLElement,
        blockId: BlockSettings | null = null
    ): Main | null {
        const map = container.querySelector(this.fieldMapSelector);
        const id = map?.id;
    
        if (!id) {
            return null;
        }
    
        return new Main(id, container as HTMLElement, map as HTMLElement, blockId);
    };
    
}

export default ClassicInit;