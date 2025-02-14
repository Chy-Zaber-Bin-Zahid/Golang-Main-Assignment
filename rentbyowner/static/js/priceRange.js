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
        const fromValue = Number(this.fromSlider.value);
        const toValue = Number(this.toSlider.value);

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
        const fromValue = Number(this.fromSlider.value);
        const toValue = Number(this.toSlider.value);

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
        const priceLowValue = Number(this.priceLow.value);

        if (priceLowValue < 9) {
            console.log("Price is too low!");
            this.priceLow.value = 9; // Set it to 9 if lower
        }
        if (priceLowValue > 2500) {
            console.log("Price is too high!");
            this.priceLow.value = 2500; // Set it to 2500 if higher
        }

        this.fromSlider.value = this.priceLow.value;
    }

    // Handle input event for the "price high" input field
    handlePriceHighInput() {
        const priceHighValue = Number(this.priceHigh.value);

        if (priceHighValue > 2501) {
            console.log("Price is too high!");
            this.priceHigh.value = 2501; // Set it to 2501 if higher
        }
        if (priceHighValue < 10) {
            console.log("Price is too low!");
            this.priceHigh.value = 10; // Set it to 10 if lower
        }

        this.toSlider.value = this.priceHigh.value;
    }
}