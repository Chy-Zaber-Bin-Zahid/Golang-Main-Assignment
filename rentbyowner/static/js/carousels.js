export class CarouselController {
    constructor() {
        this.nextSlide = [];
        this.currentIndex = {};
        this.carouselItems = {};
        this.isDragging = {};
        this.startPos = {};
        this.currentTranslate = {};
        this.prevTranslate = {};
        this.animationID = {};
        this.currentCarouselWidth = {};

        this.updateCarousel = this.updateCarousel.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    touchStart(carouselId, event) {
        if (!this.nextSlide.includes(carouselId)) return;
        
        this.isDragging[carouselId] = true;
        this.startPos[carouselId] = this.getPositionX(event);
    
        this.currentTranslate[carouselId] = -this.currentIndex[carouselId] * this.currentCarouselWidth[carouselId];
        this.prevTranslate[carouselId] = this.currentTranslate[carouselId];
    
        this.animationID[carouselId] = requestAnimationFrame(() => this.animation(carouselId));
        
        const carouselTrack = document.getElementById(`${carouselId}relative`);
        carouselTrack.style.transition = 'none';
    }
    
    touchEnd(carouselId) {
        if (!this.nextSlide.includes(carouselId)) return;
        
        this.isDragging[carouselId] = false;
        cancelAnimationFrame(this.animationID[carouselId]);

        const movedBy = this.currentTranslate[carouselId] - this.prevTranslate[carouselId];
        const threshold = this.currentCarouselWidth[carouselId] * 0.2;

        const carouselTrack = document.getElementById(`${carouselId}relative`);
        const totalSlides = carouselTrack.querySelectorAll('img').length;

        if (Math.abs(movedBy) > threshold) {
            if (movedBy < 0 && this.currentIndex[carouselId] < totalSlides - 1) {
                this.currentIndex[carouselId]++;
            } else if (movedBy > 0 && this.currentIndex[carouselId] > 0) {
                this.currentIndex[carouselId]--;
            }
        }

        this.currentIndex[carouselId] = Math.max(0, Math.min(this.currentIndex[carouselId], totalSlides - 1));
        this.updateButtonsVisibility(carouselId, totalSlides);
        this.setPositionByIndex(carouselId);

        carouselTrack.style.cursor = 'grab';
        carouselTrack.style.transition = 'transform 0.3s ease-out';
    }

    touchMove(carouselId, event) {
        if (!this.isDragging[carouselId] || !this.nextSlide.includes(carouselId)) return;

        const currentPosition = this.getPositionX(event);
        const currentMove = currentPosition - this.startPos[carouselId];
        this.currentTranslate[carouselId] = this.prevTranslate[carouselId] + currentMove;

        const carouselTrack = document.getElementById(`${carouselId}relative`);
        const totalSlides = carouselTrack.querySelectorAll('img').length;
        const maxTranslate = 0;
        const minTranslate = -(totalSlides - 1) * this.currentCarouselWidth[carouselId];

        this.currentTranslate[carouselId] = Math.max(minTranslate, Math.min(maxTranslate, this.currentTranslate[carouselId]));
    }

    getPositionX(event) {
        return event.touches[0].clientX;
    }

    animation(carouselId) {
        if (this.isDragging[carouselId]) {
            this.setSliderPosition(carouselId);
            requestAnimationFrame(() => this.animation(carouselId));
        }
    }

    setSliderPosition(carouselId) {
        const carouselTrack = document.getElementById(`${carouselId}relative`);
        carouselTrack.style.transform = `translateX(${this.currentTranslate[carouselId]}px)`;
    }

    setPositionByIndex(carouselId) {
        this.currentTranslate[carouselId] = this.currentIndex[carouselId] * -this.currentCarouselWidth[carouselId];
        this.prevTranslate[carouselId] = this.currentTranslate[carouselId];
        this.updateCarousel(carouselId);
    }

    updateButtonsVisibility(carouselId, totalSlides) {
        const parentDiv = document.getElementById(carouselId);
        const prevButton = parentDiv.querySelector('#prev');
        const nextButton = parentDiv.querySelector('#next');

        prevButton.classList.toggle('hidden', this.currentIndex[carouselId] === 0);
        nextButton.classList.toggle('hidden', this.currentIndex[carouselId] === totalSlides - 1);
    }

    updateCarousel(carouselId) {
        const carouselTrack = document.getElementById(`${carouselId}relative`);
        const offset = -this.currentIndex[carouselId] * this.currentCarouselWidth[carouselId];
        carouselTrack.style.transform = `translateX(${offset}px)`;

        const dots = document.querySelectorAll(`#${carouselId} .dots-container button`);
        dots.forEach((dot, index) => {
            dot.className = index === this.currentIndex[carouselId] ? 'rounded-full bg-white transition-all duration-300 w-2 h-2' : 'rounded-full bg-white transition-all duration-300 w-1 h-1';
        });
    }

    setupTouchEvents(carouselId) {
        const carouselTrack = document.getElementById(`${carouselId}relative`);
        this.currentCarouselWidth[carouselId] = carouselTrack.clientWidth;
        
        carouselTrack.addEventListener('touchstart', (e) => this.touchStart(carouselId, e));
        carouselTrack.addEventListener('touchend', () => this.touchEnd(carouselId));
        carouselTrack.addEventListener('touchmove', (e) => this.touchMove(carouselId, e));
        carouselTrack.addEventListener('contextmenu', (e) => e.preventDefault());
        
        this.currentTranslate[carouselId] = 0;
        this.prevTranslate[carouselId] = 0;
        this.isDragging[carouselId] = false;
    }

    next() {
        document.querySelectorAll('#next').forEach(button => {
            button.addEventListener('click', async (event) => {
                button.disabled = true;
                button.style.pointerEvents = 'none';
                const parentDiv = event.target.parentElement;
                document.getElementById(`loader-${parentDiv.id}`).style.visibility = 'visible';
                if (!parentDiv || !parentDiv.id) {
                    console.warn("Parent element does not have an ID.");
                    return;
                }
                const carouselId = parentDiv.id;
                try {
                    if (!this.nextSlide.includes(carouselId)) {
                        this.nextSlide.push(carouselId);
                        console.log("Fetching images for:", carouselId);
                        const responseImageApi = await fetch(`/api/v1/propertyId/${carouselId}`);
                        if (!responseImageApi.ok) {
                            throw new Error(`API error: ${responseImageApi.status} ${responseImageApi.statusText}`);
                        }
                        const images = await responseImageApi.json();
                        if (!Array.isArray(this.carouselItems[carouselId])) {
                            this.carouselItems[carouselId] = [];
                        }
                        
                        const mainDiv = document.getElementById(`${carouselId}relative`);
                        this.carouselItems[carouselId].push(...images.map(image => image));
    
                        const imageLoadPromises = this.carouselItems[carouselId].map(imageUrl => {
                            return new Promise((resolve, reject) => {
                                const img = new Image();
                                img.onload = () => resolve(imageUrl);
                                img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
                                img.src = `https://imgservice.rentbyowner.com/640x417/${imageUrl}`;
                            });
                        });
    
                        await Promise.all(imageLoadPromises);
    
                        this.carouselItems[carouselId].forEach(imageUrl => {
                            const img = document.createElement('img');
                            img.src = `https://imgservice.rentbyowner.com/640x417/${imageUrl}`;
                            img.alt = imageUrl;
                            img.className = 'w-full h-64 object-cover shrink-0 carousel-img opacity-0 transition-opacity duration-300';
                            mainDiv.appendChild(img);
                            setTimeout(() => img.classList.remove('opacity-0'), 50);
                        });

                        // Setup touch events after images are loaded
                        this.setupTouchEvents(carouselId);
                    }
    
                    const carouselTrack = document.getElementById(`${carouselId}relative`);
                    const imagesAll = carouselTrack.querySelectorAll('img');
                    const totalImages = imagesAll.length;
                    parentDiv.querySelector('#prev').style.display = 'block';
                    
                    if (!this.currentIndex[carouselId]) {
                        this.currentIndex[carouselId] = 0;
                    }
                    
                    document.getElementById(`loader-${parentDiv.id}`).style.visibility = 'hidden';
                    
                    if (this.currentIndex[carouselId] < totalImages - 1) {
                        this.currentIndex[carouselId]++;
                        if (this.currentIndex[carouselId] === totalImages - 1) {
                            event.target.classList.add('hidden');
                        }
                    }
                    this.updateCarousel(carouselId);
                } catch (error) {
                    console.error("Error fetching images:", error);
                    document.getElementById(`loader-${parentDiv.id}`).style.visibility = 'hidden';
                } finally {
                    button.disabled = false;
                    button.style.pointerEvents = 'auto';
                    }
            });
        });
    }

    prev() {
        document.querySelectorAll('#prev').forEach(button => {
            button.addEventListener('click', (event) => {
                const parentDiv = event.target.parentElement;

                if (!parentDiv || !parentDiv.id) {
                    console.warn("Parent element does not have an ID.");
                    return;
                }

                const carouselId = parentDiv.id;

                parentDiv.querySelector('#next').classList.remove('hidden');

                if (!this.currentIndex[carouselId]) {
                    this.currentIndex[carouselId] = 0;
                }

                if (this.currentIndex[carouselId] > 0) {
                    this.currentIndex[carouselId]--;
                    this.updateCarousel(carouselId);

                    if (this.currentIndex[carouselId] === 0) {
                        event.target.classList.add('hidden');
                    }
                }
            });
        });
    }

    init() {
        this.next();
        this.prev();
    }
}