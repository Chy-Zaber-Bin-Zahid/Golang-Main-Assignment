export class PriceRangeSlider {
    constructor(fromSliderId, toSliderId, priceLowId, priceHighId) {
        // Initialize DOM elements
        this.fromSlider = document.getElementById(fromSliderId);
        this.toSlider = document.getElementById(toSliderId);
        this.priceLow = document.getElementById(priceLowId);
        this.priceHigh = document.getElementById(priceHighId);

        // Initialize price range values
        this.priceRangeLow = 0;
        this.priceRangeHigh = 0;

        // Bind event listeners
        this.fromSlider.addEventListener('input', () => this.handleFromSliderInput());
        this.toSlider.addEventListener('input', () => this.handleToSliderInput());
        this.priceLow.addEventListener('input', () => this.handlePriceLowInput());
        this.priceHigh.addEventListener('input', () => this.handlePriceHighInput());
    }

    getPriceRangeLow() {
        return this.priceRangeLow;
    }

    // Setter for priceRangeLow
    setPriceRangeLow(value) {
        this.priceRangeLow = value;
    }

    getPriceRangeHigh() {
        return this.priceRangeHigh;
    }

    // Setter for priceRangeLow
    setPriceRangeHigh(value) {
        this.priceRangeHigh = value;
    }


    // Handle input event for the "from" slider
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
    
        if (toValue === 13 && fromValue === 13) {
            this.toSlider.value = 14; // Reset the slider value to 14
            this.priceHigh.value = 14; // Update the high price input field
            toValue = 14; // Update the toValue variable
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

    // Handle input event for the "to" slider
    handleToSliderInput() {
        let fromValue = Number(this.fromSlider.value);
        let toValue = Number(this.toSlider.value); // Use `let` to allow reassignment
    
        // Ensure toValue is not smaller than 14
        if (toValue < 14 && fromValue === 13) {
            this.toSlider.value = 14; // Reset the slider value to 14
            this.priceHigh.value = 14; // Update the high price input field
            toValue = 14; // Update the toValue variable
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
            this.fromSlider.value = Number(this.toSlider.max) - 1; // Reset the slider value to 14
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

    // Handle input event for the "price low" input field
    handlePriceLowInput() {
        let fromValue = Number(this.fromSlider.value);
        let toValue = Number(this.toSlider.value);
        const priceLowValue = Number(this.priceLow.value);
        if (priceLowValue < 13) {
            console.log("Price is too low!");
            this.priceLow.value = 13; // Set it to 13 if lower
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
        } else if (fromValue > toValue && Number(this.priceRangeHigh) === fromValue) {
            this.toSlider.value = priceLowValue;
            this.priceRangeLow = priceLowValue;
        } else {
            this.fromSlider.value = this.priceLow.value;
            this.priceRangeLow = this.priceLow.value;
            this.priceRangeHigh = this.toSlider.value;
        }
    }

    // Handle input event for the "price high" input field
    handlePriceHighInput() {
        let fromValue = Number(this.fromSlider.value);
        let toValue = Number(this.toSlider.value);
        const priceHighValue = Number(this.priceHigh.value);
        if (priceHighValue >= Number(this.toSlider.max)) {
            document.getElementById('max-p').textContent = 'Max price(+)'
            this.priceHigh.value = priceHighValue;
            this.toSlider.max = priceHighValue;
            this.fromSlider.max = priceHighValue;
        } else {
            document.getElementById('max-p').textContent = 'Max price'
            this.priceHigh.value = priceHighValue;
        }
        if (priceHighValue < 14) {
            console.log("Price is too low!");
            this.priceHigh.value = 14; // Set it to 14 if lower
        }
        if (fromValue > toValue && Number(this.priceRangeLow) !== toValue) {
            this.fromSlider.value = priceHighValue;
            this.priceRangeHigh = priceHighValue;
            this.priceLow.value = priceHighValue - 1;
            this.priceRangeLow = priceHighValue - 1;
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