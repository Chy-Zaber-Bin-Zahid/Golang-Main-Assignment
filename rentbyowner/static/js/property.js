const carouselItems = {};
export class Property {
    constructor(property) {
        this.property = property.Property;
        this.id = property.ID;
    }
    render() {
        carouselItems[this.id] = [this.property.FeatureImage];
        const tile = document.createElement('div');
        tile.className = 'property-tile';
        tile.innerHTML = `
            <div id="${this.id}" class="carousel-container">
                <div id="${this.id}relative" class="carousel-inner carousel-div">
                    <img src="https://imgservice.rentbyowner.com/640x417/${this.property.FeatureImage}" alt="${this.property.PropertyName}" class="carousel-image" />
                </div>
                <div id="loader-${this.id}" class="loader">
                    <div class="loader-dot delay-0"></div>
                    <div class="loader-dot delay-1"></div>
                    <div class="loader-dot delay-2"></div>
                </div>
                <button id="prev" class="carousel-button prev">&#10094;</button>
                <button id="next" class="carousel-button next">&#10095;</button>
                <div class="dots-container">
                    ${Array.from({ length: 5 }, (_, index) => `
                        <button class="dot ${index === 0 ? 'active' : ''}"></button>
                    `).join('')}
                </div>
                <div class="favorite-button-container">
                    <button class="favorite-button">
                        <i id="${this.id}" class="ph ph-heart-straight favorite-icon"></i>
                        <div class="favorite-overlay"></div>
                    </button>
                </div>
                <div class="price-container">
                    <span class="price-text">From $${this.property.Price}</span>
                    <i class="ph ph-info info-icon"></i>
                </div>
            </div>
            <div class="property-details">
                <div class="rating-container">
                    <div class="rating-inner">
                        ${this.property.StarRating ? `
                            <div class="star-rating">
                                ${Array.from({ length: this.property.StarRating }, () => `
                                    <i class="ph-fill ph-star star-icon"></i>
                                `).join('')}
                            </div>
                        ` : ''}
                        <div class="reviews-container ${!this.property.Counts.Reviews ? 'bg-gray' : 'bg-blue'}">
                            <i class="ph-fill ph-thumbs-up thumbs-up-icon"></i>
                        </div>
                        ${this.property.Counts.Reviews ? `
                            <span class="review-score">${this.property.ReviewScore}</span>
                        ` : ''}
                        <span class="reviews-text ${!this.property.Counts.Reviews && 'py-[3px]'}">
                            ${this.property.Counts.Reviews ? `(${this.property.Counts.Reviews} Reviews)` : 'New'}
                        </span>
                    </div>
                    <span class="property-type">${this.property.PropertyType}</span>
                </div>
                <h2 class="property-name">${this.property.PropertyName}</h2>
                <div class="amenities">
                    <span class="amenities-text">${Object.values(this.property.Amenities).slice(0, 3).join(' • ')}</span>
                </div>
                <div class="location">Big Bear Lake > Lake Arrowhead</div>
                <div class="booking-container">
                    <img src="https://static.rentbyowner.com/release/28.0.6/static/images/booking.svg" alt="Booking.com" class="booking-logo" />
                    <button class="availability-button">View Availability</button>
                </div>
            </div>
        `;
        document.getElementById('tiles').appendChild(tile);
        document.getElementById('shimmer').classList.add('hidden');
        document.getElementById('tiles').classList.remove('hidden');
    }
}
