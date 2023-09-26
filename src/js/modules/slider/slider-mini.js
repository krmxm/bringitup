import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor({container = null, btns = null, next = null, prev = null, activeClass = '', animate, autoplay} = {}) {
        super({ container, btns, next, prev, activeClass, animate, autoplay });
        this.paused = false;
    }
    

    decorizeSlides() {
        Array.from(this.slides).forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if(!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);

        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';

        } 

        // console.log(this.slides);
    }

    nextSlide() {
        if(this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.container.appendChild(this.slides[2]); // Btn
            this.decorizeSlides();
        } else if (this.slides[1].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }

        // for(let i=1; i < this.slides.length; i++) {
        //     if (this.slides[i].tagName !== "BUTTON") {
        //         this.container.appendChild(this.slides[0]);
        //         this.decorizeSlides();
        //         break;
        //     } else {
        //         this.container.appendChild(this.slides[i]);
        //         i--;
        //     }
        // }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if(this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    autoPlayMethod() {
        if(this.autoplay) {
            this.paused = setInterval(() => this.nextSlide(), 5000);
        }
    }

    slideMouse() {
        this.container.addEventListener('mouseenter', () => {
            clearInterval(this.paused);
        });
        this.next.addEventListener('mouseenter', () => {
            clearInterval(this.paused);
        });
        this.prev.addEventListener('mouseenter', () => {
            clearInterval(this.paused);
        });

        this.container.addEventListener('mouseleave', () => {
            this.autoPlayMethod();
        });
        this.next.addEventListener('mouseleave', () => {
            this.autoPlayMethod();
        });
        this.prev.addEventListener('mouseleave', () => {
            this.autoPlayMethod();
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        this.autoPlayMethod();
        this.slideMouse();
    }
}