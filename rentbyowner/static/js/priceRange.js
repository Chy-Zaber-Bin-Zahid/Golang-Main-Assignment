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

        // Add mouse/touch event listeners for real-time updates during dragging
        this.fromSlider.addEventListener('mousedown', this.startDragging.bind(this, 'from'));
        this.toSlider.addEventListener('mousedown', this.startDragging.bind(this, 'to'));
        this.fromSlider.addEventListener('touchstart', this.startTouchDragging.bind(this, 'from'));
        this.toSlider.addEventListener('touchstart', this.startTouchDragging.bind(this, 'to'));

        // Add click handler for the slider track
        this.slidersControl.addEventListener('mousedown', this.handleSliderTrackClick.bind(this));
        this.slidersControl.addEventListener('touchstart', this.handleSliderTrackTouchStart.bind(this));

        // Add mouse move event to entire document for dragging functionality
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));

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
        
        // Determine the smaller and larger values regardless of which slider they come from
        const lowerValue = Math.min(fromValue, toValue);
        const higherValue = Math.max(fromValue, toValue);
        
        // Calculate left and width of the colored portion
        const leftPercent = (lowerValue / max) * 100;
        const rightValue = higherValue;
        const widthPercent = ((rightValue - lowerValue) / max) * 100;
        
        // Apply styles to the progress element
        this.sliderProgress.style.left = `${leftPercent}%`;
        this.sliderProgress.style.width = `${widthPercent}%`;
    }

    startDragging(slider, event) {
        const handleMouseMove = (moveEvent) => {
            // Update the progress bar in real-time during the drag
            this.updateSliderProgress();
        };
        
        const handleMouseUp = () => {
            // Clean up event listeners when drag ends
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        
        // Add document-level event listeners to track movement even outside the slider
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    startTouchDragging(slider, event) {
        const handleTouchMove = (moveEvent) => {
            // Update the progress bar in real-time during touch drag
            this.updateSliderProgress();
        };
        
        const handleTouchEnd = () => {
            // Clean up event listeners when drag ends
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
        
        // Add document-level event listeners to track movement
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }

    handleSliderTrackClick(event) {
        // Prevent handling if click is on a thumb
        if (event.target === this.fromSlider || event.target === this.toSlider) {
            return;
        }
        
        // Calculate click position relative to the sliders
        const rect = this.slidersControl.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left;
        const trackWidth = rect.width;
        
        // Calculate percentage of the click position
        const percentage = clickPosition / trackWidth;
        
        // Convert to slider value
        const max = Number(this.toSlider.max);
        const newValue = Math.round(percentage * max);
        
        // Update toSlider to clicked position
        this.toSlider.value = newValue;
        this.priceHigh.value = newValue;
        
        // Set dragging state to true
        this.isDragging = true;
        
        // Handle edge cases and validation
        this.handleToSliderInput();
        
        // Update the visual progress bar
        this.updateSliderProgress();
    }

    handleSliderTrackTouchStart(event) {
        // Similar to handleSliderTrackClick but for touch events
        if (event.targetTouches[0].target === this.fromSlider || event.targetTouches[0].target === this.toSlider) {
            return;
        }
        
        const rect = this.slidersControl.getBoundingClientRect();
        const clickPosition = event.targetTouches[0].clientX - rect.left;
        const trackWidth = rect.width;
        
        const percentage = clickPosition / trackWidth;
        const max = Number(this.toSlider.max);
        const newValue = Math.round(percentage * max);
        
        this.toSlider.value = newValue;
        this.priceHigh.value = newValue;
        
        this.isDragging = true;
        this.handleToSliderInput();
        this.updateSliderProgress();
    }

    handleMouseMove(event) {
        if (this.isDragging) {
            const rect = this.slidersControl.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const trackWidth = rect.width;
            
            // Ensure mouseX is within slider bounds
            const percentage = Math.min(Math.max(mouseX / trackWidth, 0), 1);
            
            // Convert to slider value
            const max = Number(this.toSlider.max);
            const newValue = Math.round(percentage * max);
            
            // Update toSlider value and corresponding display
            this.toSlider.value = newValue;
            this.priceHigh.value = newValue;
            
            this.handleToSliderInput();
            this.updateSliderProgress();
        }
    }

    handleMouseUp() {
        // Reset dragging state
        this.isDragging = false;
    }

    setupEventListeners() {
        // Handle down arrow key for priceHigh
        this.priceHigh.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown') {
                this.isDownArrowPressed = true; // Set flag to true
            }
        });

        this.priceHigh.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowDown') {
                this.isDownArrowPressed = false; // Reset flag on keyup
            }
        });

        // Handle up arrow key for priceLow
        this.priceLow.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') {
                this.isUpArrowPressed = true; // Set flag to true
            }
        });

        this.priceLow.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowUp') {
                this.isUpArrowPressed = false; // Reset flag on keyup
            }
        });
    }

    handleFromSliderInput() {
        let fromValue = Number(this.fromSlider.value);
        let toValue = Number(this.toSlider.value);
        // Ensure fromValue does not exceed 2500
        if (fromValue > (Number(this.toSlider.max) -1) && toValue === Number(this.toSlider.max)) {
            this.fromSlider.value = Number(this.toSlider.max) -1;
            this.priceLow.value = Number(this.toSlider.max) -1;   // Update the low price input field
            fromValue = Number(this.toSlider.max) -1;            // Update the fromValue variable
        }
    
        // Update the "Max price(+)" label
        if (fromValue === Number(this.toSlider.max) || toValue === Number(this.toSlider.max)) {
            document.getElementById('max-p').textContent = 'Max price(+)';
            this.priceHigh.value = fromValue;
        } else {
            document.getElementById('max-p').textContent = 'Max price';
            this.priceHigh.value = fromValue;
        }
    
        if (toValue === 0 && fromValue === 0) {
            this.toSlider.value = 1; // Reset the slider value to 1
            this.priceHigh.value = 1; // Update the high price input field
            toValue = 1; // Update the toValue variable
        }
        // Ensure fromValue does not exceed toValue
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
        let toValue = Number(this.toSlider.value); // Use `let` to allow reassignment
    
        // Ensure toValue is not smaller than 1
        if (toValue < 1 && fromValue === 0) {
            this.toSlider.value = 1; // Reset the slider value to 1
            this.priceHigh.value = 1; // Update the high price input field
            toValue = 1; // Update the toValue variable
        }
    
        // Update the "Max price(+)" label
        if (fromValue === Number(this.toSlider.max) || toValue === Number(this.toSlider.max)) {
            document.getElementById('max-p').textContent = 'Max price(+)';
            this.priceHigh.value = toValue;
        } else {
            document.getElementById('max-p').textContent = 'Max price';
            this.priceHigh.value = toValue;
        }
    
        if (toValue === Number(this.toSlider.max) && fromValue === Number(this.toSlider.max)) {
            this.fromSlider.value = Number(this.toSlider.max) - 1; // Reset the slider value to 1
            this.priceLow.value = Number(this.toSlider.max) - 1; // Update the high price input field
            fromValue = Number(this.toSlider.max) - 1; // Update the toValue variable
        }

        // Ensure toValue does not go below fromValue
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
            this.priceLow.value = 0; // Set it to 0 if lower
        } else {
            this.priceLow.value = priceLowValue;
        }
        if (priceLowValue >= Number(this.toSlider.max)) {
            console.log("Price is too high!");
            this.priceLow.value = Number(this.toSlider.max)-1; // Set it to 2500 if higher
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