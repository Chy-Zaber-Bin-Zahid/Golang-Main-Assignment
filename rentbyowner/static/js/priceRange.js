export class PriceRangeSlider {
    constructor(fromSliderId, toSliderId, priceLowId, priceHighId) {
        // Initialize DOM elements
        this.fromSlider = document.getElementById(fromSliderId);
        this.toSlider = document.getElementById(toSliderId);
        this.priceLow = document.getElementById(priceLowId);
        this.priceHigh = document.getElementById(priceHighId);
        this.slidersControl = this.fromSlider.parentElement;

        // Create progress element for the colored portion
        this.sliderProgress = document.createElement('div');
        this.sliderProgress.className = 'slider-progress';
        this.slidersControl.appendChild(this.sliderProgress);

        // Initialize price range values
        this.priceRangeLow = 0;
        this.priceRangeHigh = 0;
        this.isDownArrowPressed = false;
        this.isUpArrowPressed = false;
        this.isDragging = false;
        this.draggingSlider = null; // 'from' or 'to' when dragging thumb

        // Bind event listeners
        this.fromSlider.addEventListener('input', () => {
            this.handleFromSliderInput();
            this.updateSliderProgress();
        });
        this.toSlider.addEventListener('input', () => {
            this.handleToSliderInput();
            this.updateSliderProgress();
        });
        this.priceLow.addEventListener('input', () => {
            this.handlePriceLowInput();
            this.updateSliderProgress();
        });
        this.priceHigh.addEventListener('input', () => {
            this.handlePriceHighInput();
            this.updateSliderProgress();
        });

        // Mouse event listeners for dragging
        this.fromSlider.addEventListener('mousedown', this.startDragging.bind(this, 'from'));
        this.toSlider.addEventListener('mousedown', this.startDragging.bind(this, 'to'));
        this.slidersControl.addEventListener('mousedown', this.handleSliderTrackClick.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));

        // Touch event listeners for dragging
        this.fromSlider.addEventListener('touchstart', this.startTouchDragging.bind(this, 'from'));
        this.toSlider.addEventListener('touchstart', this.startTouchDragging.bind(this, 'to'));
        this.slidersControl.addEventListener('touchstart', this.handleSliderTrackTouchStart.bind(this));

        this.setupEventListeners();
        this.updateSliderProgress();
    }

    getPriceRangeLow() {
        return this.priceRangeLow;
    }

    setPriceRangeLow(value) {
        this.priceRangeLow = value;
    }

    getPriceRangeHigh() {
        return this.priceRangeHigh;
    }

    setPriceRangeHigh(value) {
        this.priceRangeHigh = value;
    }

    updateSliderProgress() {
        const fromValue = Number(this.fromSlider.value);
        const toValue = Number(this.toSlider.value);
        const max = Number(this.toSlider.max);
        
        const lowerValue = Math.min(fromValue, toValue);
        const higherValue = Math.max(fromValue, toValue);
        
        const leftPercent = (lowerValue / max) * 100;
        const widthPercent = ((higherValue - lowerValue) / max) * 100;
        
        this.sliderProgress.style.left = `${leftPercent}%`;
        this.sliderProgress.style.width = `${widthPercent}%`;
    }

    startDragging(slider, event) {
        this.isDragging = true;
        this.draggingSlider = slider;
        
        const handleMouseMove = () => {
            this.updateSliderProgress();
        };
        
        const handleMouseUp = () => {
            this.isDragging = false;
            this.draggingSlider = null;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    startTouchDragging(slider, event) {
        event.preventDefault(); // Prevent default touch behavior
        this.isDragging = true;
        this.draggingSlider = slider;

        const rect = this.slidersControl.getBoundingClientRect();
        const trackWidth = rect.width;
        const max = Number(this.toSlider.max);

        const handleTouchMove = (moveEvent) => {
            moveEvent.preventDefault();
            const touchX = moveEvent.targetTouches[0].clientX - rect.left;
            const percentage = Math.min(Math.max(touchX / trackWidth, 0), 1);
            const newValue = Math.round(percentage * max);

            if (this.draggingSlider === 'from') {
                this.fromSlider.value = newValue;
                this.priceLow.value = newValue;
                this.handleFromSliderInput();
            } else if (this.draggingSlider === 'to') {
                this.toSlider.value = newValue;
                this.priceHigh.value = newValue;
                this.handleToSliderInput();
            }
            this.updateSliderProgress();
        };
        
        const handleTouchEnd = () => {
            this.isDragging = false;
            this.draggingSlider = null;
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
        
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
    }

    handleSliderTrackClick(event) {
        if (event.target === this.fromSlider || event.target === this.toSlider) {
            return;
        }
        
        const rect = this.slidersControl.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left;
        const trackWidth = rect.width;
        const percentage = clickPosition / trackWidth;
        const max = Number(this.toSlider.max);
        const newValue = Math.round(percentage * max);
        
        // Always move toSlider when clicking the track
        this.isDragging = true;
        this.draggingSlider = 'to';
        this.toSlider.value = newValue;
        this.priceHigh.value = newValue;
        this.handleToSliderInput();
        this.updateSliderProgress();
    }

    handleSliderTrackTouchStart(event) {
        event.preventDefault(); // Prevent scrolling on touch devices
        
        if (event.targetTouches[0].target === this.fromSlider || event.targetTouches[0].target === this.toSlider) {
            return;
        }
        
        const rect = this.slidersControl.getBoundingClientRect();
        const touchPosition = event.targetTouches[0].clientX - rect.left;
        const trackWidth = rect.width;
        const percentage = Math.min(Math.max(touchPosition / trackWidth, 0), 1);
        const max = Number(this.toSlider.max);
        const newValue = Math.round(percentage * max);
        
        // Always move toSlider when touching the track
        this.isDragging = true;
        this.draggingSlider = 'to';
        this.toSlider.value = newValue;
        this.priceHigh.value = newValue;
        this.handleToSliderInput();
        this.updateSliderProgress();

        // Add touchmove and touchend listeners
        const handleTouchMove = (moveEvent) => {
            moveEvent.preventDefault();
            const touchX = moveEvent.targetTouches[0].clientX - rect.left;
            const newPercentage = Math.min(Math.max(touchX / trackWidth, 0), 1);
            const updatedValue = Math.round(newPercentage * max);
            
            // Only move toSlider when dragging on the track
            this.toSlider.value = updatedValue;
            this.priceHigh.value = updatedValue;
            this.handleToSliderInput();
            this.updateSliderProgress();
        };

        const handleTouchEnd = () => {
            this.isDragging = false;
            this.draggingSlider = null;
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
    }

    handleMouseMove(event) {
        if (this.isDragging && this.draggingSlider) {
            const rect = this.slidersControl.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const trackWidth = rect.width;
            const percentage = Math.min(Math.max(mouseX / trackWidth, 0), 1);
            const max = Number(this.toSlider.max);
            const newValue = Math.round(percentage * max);
            
            if (this.draggingSlider === 'from') {
                this.fromSlider.value = newValue;
                this.priceLow.value = newValue;
                this.handleFromSliderInput();
            } else if (this.draggingSlider === 'to') {
                this.toSlider.value = newValue;
                this.priceHigh.value = newValue;
                this.handleToSliderInput();
            }
            this.updateSliderProgress();
        }
    }

    handleMouseUp() {
        this.isDragging = false;
        this.draggingSlider = null;
    }

    setupEventListeners() {
        this.priceHigh.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown') {
                this.isDownArrowPressed = true;
            }
        });
        this.priceHigh.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowDown') {
                this.isDownArrowPressed = false;
            }
        });
        this.priceLow.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') {
                this.isUpArrowPressed = true;
            }
        });
        this.priceLow.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowUp') {
                this.isUpArrowPressed = false;
            }
        });
    }

    handleFromSliderInput() {
        let fromValue = Number(this.fromSlider.value);
        let toValue = Number(this.toSlider.value);
        if (fromValue > (Number(this.toSlider.max) - 1) && toValue === Number(this.toSlider.max)) {
            this.fromSlider.value = Number(this.toSlider.max) - 1;
            this.priceLow.value = Number(this.toSlider.max) - 1;
            fromValue = Number(this.toSlider.max) - 1;
        }
    
        if (fromValue === Number(this.toSlider.max) || toValue === Number(this.toSlider.max)) {
            document.getElementById('max-p').textContent = 'Max price(+)';
            this.priceHigh.value = fromValue;
        } else {
            document.getElementById('max-p').textContent = 'Max price';
            this.priceHigh.value = fromValue;
        }
    
        if (toValue === 0 && fromValue === 0) {
            this.toSlider.value = 1;
            this.priceHigh.value = 1;
            toValue = 1;
        }
        if (fromValue >= toValue) {
            this.priceLow.value = this.toSlider.value;
            this.priceHigh.value = this.fromSlider.value;
            this.priceRangeLow = this.toSlider.value;
            this.priceRangeHigh = this.fromSlider.value;
        } else {
            this.priceLow.value = this.fromSlider.value;
            this.priceHigh.value = this.toSlider.value;
            this.priceRangeLow = this.fromSlider.value;
            this.priceRangeHigh = this.toSlider.value;
        }
    }

    handleToSliderInput() {
        let fromValue = Number(this.fromSlider.value);
        let toValue = Number(this.toSlider.value);
    
        if (toValue < 1 && fromValue === 0) {
            this.toSlider.value = 1;
            this.priceHigh.value = 1;
            toValue = 1;
        }
    
        if (fromValue === Number(this.toSlider.max) || toValue === Number(this.toSlider.max)) {
            document.getElementById('max-p').textContent = 'Max price(+)';
            this.priceHigh.value = toValue;
        } else {
            document.getElementById('max-p').textContent = 'Max price';
            this.priceHigh.value = toValue;
        }
    
        if (toValue === Number(this.toSlider.max) && fromValue === Number(this.toSlider.max)) {
            this.fromSlider.value = Number(this.toSlider.max) - 1;
            this.priceLow.value = Number(this.toSlider.max) - 1;
            fromValue = Number(this.toSlider.max) - 1;
        }

        if (toValue <= fromValue) {
            this.priceLow.value = this.toSlider.value;
            this.priceHigh.value = this.fromSlider.value;
            this.priceRangeLow = this.toSlider.value;
            this.priceRangeHigh = this.fromSlider.value;
        } else {
            this.priceLow.value = this.fromSlider.value;
            this.priceHigh.value = this.toSlider.value;
            this.priceRangeLow = this.fromSlider.value;
            this.priceRangeHigh = this.toSlider.value;
        }
    }

    handlePriceLowInput() {
        let fromValue = Number(this.fromSlider.value);
        let toValue = Number(this.toSlider.value);
        const priceLowValue = Number(this.priceLow.value);
        const priceHighValue = Number(this.priceHigh.value);
        if (priceLowValue < 0) {
            console.log("Price is too low!");
            this.priceLow.value = 0;
        } else {
            this.priceLow.value = priceLowValue;
        }
        if (priceLowValue >= Number(this.toSlider.max)) {
            console.log("Price is too high!");
            this.priceLow.value = Number(this.toSlider.max) - 1;
        }
        if (fromValue > toValue && Number(this.priceRangeHigh) !== fromValue) {
            this.toSlider.value = priceLowValue;
            this.priceRangeLow = priceLowValue;
            this.priceHigh.value = priceLowValue + 1;
            this.priceRangeHigh = priceLowValue + 1;
        } else if (priceLowValue >= priceHighValue && !this.isUpArrowPressed) {
            this.toSlider.value = Number(this.priceHigh.value);
            this.fromSlider.value = Number(this.priceHigh.value) - 1;
            this.priceRangeLow = Number(this.priceHigh.value) - 1;
            this.priceLow.value = Number(this.priceHigh.value) - 1;
        } else if (fromValue > toValue && Number(this.priceRangeHigh) === fromValue) {
            this.toSlider.value = priceLowValue;
            this.priceRangeLow = priceLowValue;
        } else {
            this.fromSlider.value = this.priceLow.value;
            this.priceRangeLow = this.priceLow.value;
            this.priceRangeHigh = this.toSlider.value;
        }
    }

    handlePriceHighInput() {
        let fromValue = Number(this.fromSlider.value);
        let toValue = Number(this.toSlider.value);
        const priceHighValue = Number(this.priceHigh.value);
        const priceLowValue = Number(this.priceLow.value);
        if (priceHighValue >= Number(this.toSlider.max)) {
            document.getElementById('max-p').textContent = 'Max price(+)';
            this.priceHigh.value = priceHighValue;
            this.toSlider.max = priceHighValue;
            this.fromSlider.max = priceHighValue;
        } else {
            document.getElementById('max-p').textContent = 'Max price';
            this.priceHigh.value = priceHighValue;
        }
        if (priceHighValue < 1) {
            console.log("Price is too low!");
            this.priceHigh.value = 1;
        }
        if (fromValue > toValue && Number(this.priceRangeLow) !== toValue) {
            this.fromSlider.value = priceHighValue;
            this.priceRangeHigh = priceHighValue;
            this.priceLow.value = priceHighValue - 1;
            this.priceRangeLow = priceHighValue - 1;
        } else if (priceHighValue <= priceLowValue && !this.isDownArrowPressed) {
            this.toSlider.value = Number(this.priceLow.value) + 1;
            this.fromSlider.value = Number(this.priceLow.value);
            this.priceRangeHigh = Number(this.priceLow.value) + 1;
            this.priceHigh.value = Number(this.priceLow.value) + 1;
        } else if (fromValue > toValue && Number(this.priceRangeHigh) >= fromValue) {
            this.fromSlider.value = priceHighValue;
            this.priceRangeHigh = priceHighValue;
        } else {
            this.toSlider.value = this.priceHigh.value;
            this.priceRangeHigh = this.priceHigh.value;
            this.priceRangeLow = this.fromSlider.value;
        }
    }
}