export class Slides {
    activeClass = " active";

    constructor(slideIDPrefix, slideCount) {
        this.slideIDPrefix = slideIDPrefix;
        this.slideCount = slideCount;
        this.slideIndex = 1;
    }

    goNext() {
        this.#hideSlide(this.slideIndex);
        this.#moveIndexNext();
        this.#showSlide(this.slideIndex);
    }

    goPrevious() {
        this.#hideSlide(this.slideIndex);
        this.#moveIndexPrevious();
        this.#showSlide(this.slideIndex);
    }

    #showSlide(i) {
        let slide = this.#getSlide(i);
        slide.className = `${slide.className}${this.activeClass}`;
    }

    #hideSlide(i) {
        let slide = this.#getSlide(i);
        slide.className = slide.className.replace(this.activeClass, '');
    }

    #moveIndexNext() {
        this.slideIndex++;
        if (this.slideIndex > this.slideCount) { this.slideIndex = 1 }
    }

    #moveIndexPrevious() {
        this.slideIndex = this.slideIndex - 1 == 0 ? slideCount : this.slideIndex - 1;
    }

    #getSlide(i) {
        return document.getElementById(`${this.slideIDPrefix}${i}`);
    }
}

export function reproduceAuto(slidesObj, interval) {
    setTimeout(function (){
        slidesObj.goNext();
        reproduceAuto(slidesObj, interval);
    }, interval);
}