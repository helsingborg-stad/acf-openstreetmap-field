class NullIconFactory implements IconFactoryInterface {
    public create(icon: string, color: string): string {
        return "";
    }
}

export default NullIconFactory;