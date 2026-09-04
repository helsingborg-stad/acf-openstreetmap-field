import GutenbergInit from "./init/gutenbergInit";
import ClassicInit from "./init/classicInit";

declare const wp: any;
declare const acf: any;

document.addEventListener('DOMContentLoaded', () => {
    if (wp && wp.data && wp.data.select('core/edit-post')) {
        new GutenbergInit(wp).init();
    } else {
        new ClassicInit().init();
    }
});