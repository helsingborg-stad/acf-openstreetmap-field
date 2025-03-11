type IconMap = {
    location: string;
    move: string;
    resize: string;
    edit: string;
}

interface IconFactoryInterface {
    create(icon: string, color: string, size?: number): string;
}