export default class Slider {
    constructor({container = null,
         btns = null,
         prevModul = null,
         nextModul = null,
         next = null,
         prev = null,
         activeClass = '',
         animate,
         autoplay} = {}) {
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch (e){}
        this.btns = document.querySelectorAll(btns);
        this.prevModul = document.querySelectorAll(prevModul);
        this.nextModul = document.querySelectorAll(nextModul);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
} 