const carouselItems = {};
export class Property {
    constructor(property) {
        this.property = property.Property;
        this.id = property.ID;
    }
    render() {
        carouselItems[this.id] = [this.property.FeatureImage];
        const tile = document.createElement('div');
        tile.className = 'w-full bg-white shadow-lg rounded-lg';
        tile.innerHTML = `
            <div id="${this.id}" class="overflow-hidden relative rounded-t-lg group select-none">
                <div id="${this.id}relative" class="flex transition-transform duration-150 ease-in-out">
                    <img src="https://imgservice.rentbyowner.com/640x417/${this.property.FeatureImage}" alt="${this.property.PropertyName}" class="w-full h-64 object-cover shrink-0 carousel-img" />
                </div>
                <div id="loader-${this.id}" class="absolute flex gap-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 hidden">
                        <div class="bg-blue-600 w-3 h-3 rounded-full animate-custom" style="animation-delay: 0s;"></div>
                        <div class="bg-green-600 w-3 h-3 rounded-full animate-custom" style="animation-delay: .3s;"></div>
                        <div class="bg-blue-600 w-3 h-3 rounded-full animate-custom" style="animation-delay: .6s;"></div>
                </div>
                    <button id="prev" class="absolute flex justify-center items-center top-1/2 left-2 transform -translate-y-1/2 bg-white text-black text-xs p-0 w-8 h-8 rounded-full z-20 hidden opacity-0 max-[1170px]:opacity-100 group-hover:opacity-100">&#10094;</button>
                    <button id="next" class="absolute flex justify-center items-center top-1/2 right-2 transform -translate-y-1/2 bg-white text-black text-xs p-0 w-8 h-8 rounded-full z-20 opacity-0 max-[1170px]:opacity-100 group-hover:opacity-100">&#10095;</button>
                <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 flex justify-center items-center z-20 dots-container h-2">
                    ${Array.from({ length: 5 }, (_, index) => `
                        <button class="rounded-full bg-white transition-all duration-300 ${index === 0 ? 'w-2 h-2' : 'w-1 h-1'}"></button>
                    `).join('')}
                </div>
                <div class="absolute top-4 right-4 flex gap-2">
                    <button class="relative pt-[5px] pb-[1px] px-2 rounded-full overflow-hidden">
                        <i class="ph ph-heart-straight text-white text-2xl z-20 relative" id="${this.id}"></i>
                        <div class="bg-black opacity-20 absolute w-full h-full top-0 left-0 z-10"></div>
                    </button>
                </div>
                <div class="absolute bottom-2 left-2 bg-[#f5f5f5] px-2 py-[2px] pb-0 rounded-[5px] flex items-center justify-center z-20">
                    <span class="text-[15px] font-medium">From $${this.property.Price}</span>
                    <i class="ph ph-info ml-1 text-xl"></i>
                </div>
            </div>
            <div class="px-4 py-2 pb-3 flex flex-col gap-1">
                <div class="flex items-center justify-between">
                    <div class="flex items-center justify-center">
                        <div class="flex items-center">
                            ${this.property.StarRating ? `
                                <div class="pr-2 border-r-2 border-gray-500 mr-2 flex justify-center items-center gap-1">
                                    ${Array.from({ length: this.property.StarRating }, () => `
                                        <i class="ph-fill ph-star text-amber-300 text-[12px] pb-[3px]"></i>
                                    `).join('')}
                                </div>
                            ` : ''}
                            <div class="flex justify-center items-center p-1 text-white text-xs rounded-full ${!this.property.Counts.Reviews ? 'bg-gray-400' : 'bg-blue-700'} mr-1">
                                <i class="ph-fill ph-thumbs-up"></i>
                            </div>
                            ${this.property.Counts.Reviews ? `
                                <span class="text-blue-700 font-medium mr-1">${this.property.ReviewScore}</span>
                            ` : ''}
                        </div>
                        <span class="text-gray-600 text-[12px] font-semibold ${!this.property.Counts.Reviews && 'py-[3px]'}">
                            ${this.property.Counts.Reviews ? `(${this.property.Counts.Reviews} Reviews)` : 'New'}
                        </span>
                    </div>
                    <span class="ml-auto text-[12px] text-gray-700">${this.property.PropertyType}</span>
                </div>
                <h2 class="text-md font-semibold text-gray-800 truncate">${this.property.PropertyName}</h2>
                <div class="flex flex-wrap gap-2 text-[12px] text-gray-800">
                    <span class="flex items-center">${Object.values(this.property.Amenities).slice(0, 3).join(' • ')}</span>
                </div>
                <div class="text-[12px] text-blue-700">Big Bear Lake > Lake Arrowhead</div>
                <div class="flex justify-between items-center gap-2">
                    <img src="https://static.rentbyowner.com/release/28.0.6/static/images/booking.svg" alt="Booking.com" class="w-22 h-4" />
                    <button class="text-md max-w-[210px] w-full font-semibold bg-emerald-500 text-white py-1.5 rounded font-medium hover:bg-emerald-600 transition-colors">View Availability</button>
                </div>
            </div>
        `;
        document.getElementById('tiles').appendChild(tile);
        document.getElementById('shimmer').classList.add('hidden');
        document.getElementById('tiles').classList.remove('hidden');
    }
}
