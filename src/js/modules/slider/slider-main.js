import Slider from "./slider";

export default class MainSlider extends Slider {
    

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        Array.from(this.slides).forEach(slide => {
            // slide.classList.add('animated');
            slide.style.display = 'none';
            // slide.style.opacity = '0';
        });



        // this.slides[this.slideIndex - 1].classList.add('slideInUp');
        // this.slides[this.slideIndex - 1].style.opacity = '1';
        this.slides[this.slideIndex - 1].style.display = 'block';

        try{
            this.hanson.style.opacity = '0';
            if(n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                    // console.log(this);
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e){}
        
    }

    plusSlide(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        if (this.container) {

        try {
        this.hanson = document.querySelector('.hanson');
        } catch(e){}

        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.plusSlide(1);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.showSlides(this.slideIndex);}

        this.prevModul.forEach(item => {
            item.addEventListener('click', (e) =>{
                e.stopPropagation();
                e.preventDefault();
                this.plusSlide(-1);
            });
        });

        this.nextModul.forEach(item => {
            item.addEventListener('click', (e) =>{
                e.stopPropagation();
                e.preventDefault();
                this.plusSlide(1);
            });
        });
    }
}