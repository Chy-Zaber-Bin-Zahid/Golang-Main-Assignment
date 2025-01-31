const carouselItems = {}
class Property {
    constructor(property) {
        this.property = property.Property;
        this.id = property.ID;
    }
    
    render () {
        // Create the main container div
        const tile = document.createElement('div');
        tile.className = 'w-full bg-white shadow-lg';

        // Create the relative div
        const mainCarouselDiv = document.createElement('div');
        mainCarouselDiv.id = this.id;
        mainCarouselDiv.className = 'overflow-hidden relative rounded-t-lg';

        const relativeDiv = document.createElement('div');
        relativeDiv.id = this.id + 'relative';
        relativeDiv.className = 'flex transition-transform duration-500 ease-in-out';

        const carousel = document.createElement('div');
        carousel.className = 'absolute flex transition-transform duration-500 ease-in-out';
        
        // Create carousel items (example: images)
        // Ensure carouselItems[this.id] is an array
        carouselItems[this.id] = [this.property.FeatureImage];

        
        // Create navigation buttons
        const prevButton = document.createElement('button');
        prevButton.id = 'prev';
        prevButton.className =
            'absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black text-xs p-[5px] px-2 rounded-full z-30 hidden';
        prevButton.innerHTML = '&#10094;'; // Left arrow
        
        const nextButton = document.createElement('button');
        nextButton.id = 'next';
        nextButton.className =
            'absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black text-xs p-[5px] px-2 rounded-full z-30';
        nextButton.innerHTML = '&#10095;'; // Right arrow

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 flex justify-center items-center z-30 dots-container';

        // Create dots
        const dots = [];
        for (let index = 0; index < 5; index++) {
            const dot = document.createElement('button');
            dot.className = `rounded-full bg-white transition-all duration-300 ${index === 0 ? 'w-2 h-2' : 'w-1 h-1'}`;
            dots.push(dot);
            dotsContainer.appendChild(dot);
        }
        
        // Append everything to the relativeDiv
        mainCarouselDiv.appendChild(carousel);
        mainCarouselDiv.appendChild(prevButton);
        mainCarouselDiv.appendChild(nextButton);
        mainCarouselDiv.appendChild(dotsContainer);

        // Create the image element
        const img = document.createElement('img');
        img.src = `https://imgservice.rentbyowner.com/640x417/${this.property.FeatureImage}`;
        img.alt = this.property.PropertyName;
        img.className = 'w-full h-64 object-cover';
        relativeDiv.appendChild(img);

        // Create the absolute top buttons container
        const topButtonsDiv = document.createElement('div');
        topButtonsDiv.className = 'absolute top-4 right-4 flex gap-2';

        // Create the button
        const button = document.createElement('button');
        button.className = 'relative pt-[5px] pb-[1px] px-2 rounded-full overflow-hidden';

        // Create the heart icon
        const heartIcon = document.createElement('i');
        heartIcon.className = 'ph ph-heart-straight text-white text-2xl z-20 relative';
        heartIcon.id = this.id
        button.appendChild(heartIcon);

        // Create the overlay div
        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'bg-black opacity-20 absolute w-full h-full top-0 left-0 z-10';
        button.appendChild(overlayDiv);

        topButtonsDiv.appendChild(button);
        mainCarouselDiv.appendChild(topButtonsDiv);

        // Create the bottom info container
        const bottomInfoDiv = document.createElement('div');
        bottomInfoDiv.className = 'absolute bottom-2 left-2 bg-[#f5f5f5] px-2 py-[2px] pb-0 rounded-[5px] flex items-center justify-center';

        // Create the span for info text
        const infoSpan = document.createElement('span');
        infoSpan.className = 'text-[15px] font-medium';
        infoSpan.textContent = `From $${this.property.Price}`
        bottomInfoDiv.appendChild(infoSpan);

        // Create the info icon
        const infoIcon = document.createElement('i');
        infoIcon.className = 'ph ph-info ml-1 text-xl';
        bottomInfoDiv.appendChild(infoIcon);

        relativeDiv.appendChild(bottomInfoDiv);
        mainCarouselDiv.appendChild(relativeDiv);
        tile.appendChild(mainCarouselDiv);

        // Create the content container
        const contentDiv = document.createElement('div');
        contentDiv.className = 'px-4 py-2 pb-3 flex flex-col gap-1';

        // Create the top content row
        const topContentDiv = document.createElement('div');
        topContentDiv.className = 'flex items-center justify-between';

        // Create the left content container
        const leftContentDiv = document.createElement('div');
        leftContentDiv.className = 'flex items-center justify-center';
        const leftInnerDiv = document.createElement('div');
        leftInnerDiv.className = 'flex items-center';

        // Create the star
        if (this.property.StarRating) {
            const starDiv = document.createElement('div')
            starDiv.classList = 'pr-2 border-r-2 border-gray-500 mr-2 flex justify-center items-center gap-1'
            for (let i = 0; i < this.property.StarRating; i++) {
                const star = document.createElement('i')
                star.className = 'ph-fill ph-star text-amber-300 text-[12px] pb-[3px]'
                starDiv.appendChild(star)
            }
            leftInnerDiv.appendChild(starDiv);
        }

        // Create like icon
        const likeDiv = document.createElement('div')
        likeDiv.classList = `flex justify-center items-center p-1 text-white text-xs rounded-full ${!this.property.Counts.Reviews ? 'bg-gray-400' : 'bg-blue-700'} mr-1`
        const like = document.createElement('i')
        like.classList = 'ph-fill ph-thumbs-up'
        likeDiv.appendChild(like)
        leftInnerDiv.appendChild(likeDiv);
        
        // Create the blue text span
        if (this.property.Counts.Reviews){
            const blueTextSpan = document.createElement('span');
            blueTextSpan.className = 'text-blue-700 font-medium mr-1';
            blueTextSpan.textContent = this.property.ReviewScore
            leftInnerDiv.appendChild(blueTextSpan);
        }
        leftContentDiv.appendChild(leftInnerDiv);

        // Create the gray text span
        const grayTextSpan = document.createElement('span');
        grayTextSpan.className = `text-gray-600 text-[12px] font-semibold ${!this.property.Counts.Reviews && 'py-[3px]'}`;
        grayTextSpan.textContent = this.property.Counts.Reviews ? `(${this.property.Counts.Reviews} Reviews)` : 'New';
        leftContentDiv.appendChild(grayTextSpan);
        topContentDiv.appendChild(leftContentDiv);

        // Create the right text span
        const rightTextSpan = document.createElement('span');
        rightTextSpan.className = 'ml-auto text-[12px] text-gray-700';
        rightTextSpan.textContent = this.property.PropertyType
        topContentDiv.appendChild(rightTextSpan);

        contentDiv.appendChild(topContentDiv);

        // Create the title
        const title = document.createElement('h2');
        title.className = 'text-md font-semibold text-gray-800 truncate';
        title.textContent = this.property.PropertyName
        contentDiv.appendChild(title);

        // Create the tags container
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'flex flex-wrap gap-2 text-[12px] text-gray-800';
        const amenities = this.property.Amenities;
        const keys = Object.keys(amenities);
        let tagsStore = "";
        for (let i = 0; i < 3; i++) {
            const key = keys[i];
            if (key) {
                if (i === 2) {
                    tagsStore += `${amenities[key]}`;
                } else {
                    tagsStore += `${amenities[key]} • `;
                }
            } else {
                break
            }
        }
        const dotCount = (tagsStore.match(/\./g) || []).length;
        if (dotCount < 3 && tagsStore.endsWith(' • ')) {
            tagsStore = tagsStore.slice(0, -3);
        }
        const tagsSpan = document.createElement('span');
        tagsSpan.className = 'flex items-center';
        tagsSpan.textContent = tagsStore
        tagsDiv.appendChild(tagsSpan);;
        contentDiv.appendChild(tagsDiv);

        // Create the location text
        const locationText = document.createElement('div');
        locationText.className = 'text-[12px] text-blue-700';
        locationText.textContent = 'Big Bear Lake > Lake Arrowhead';
        contentDiv.appendChild(locationText);

        // Create the bottom content row
        const bottomContentDiv = document.createElement('div');
        bottomContentDiv.className = 'flex justify-between items-center gap-2';

        // Create the logo
        const logoImg = document.createElement('img');
        logoImg.src = 'https://static.rentbyowner.com/release/28.0.6/static/images/booking.svg';
        logoImg.alt = 'Booking.com'
        logoImg.className = 'w-22 h-4'
        bottomContentDiv.appendChild(logoImg);

        // Create the view availability button
        const viewButton = document.createElement('button');
        viewButton.className = 'text-md max-w-[210px] w-full font-semibold bg-emerald-500 text-white py-1.5 rounded font-medium hover:bg-emerald-600 transition-colors';
        viewButton.textContent = 'View Availability';
        bottomContentDiv.appendChild(viewButton);

        contentDiv.appendChild(bottomContentDiv);
        tile.appendChild(contentDiv);
        document.getElementById('tiles').appendChild(tile);
        document.getElementById('shimmer').classList.add('hidden');
        document.getElementById('tiles').classList.remove('hidden');
    }
}

class Shimmer {
    // Function to create a single item
    render() {
    // Create the main div
    const mainDiv = document.createElement('div');
    mainDiv.className = 'w-full bg-white rounded-lg overflow-hidden shadow-lg flex flex-col';

    // Create the animated pulse div
    const pulseDiv = document.createElement('div');
    pulseDiv.className = 'animate-pulse';
    const pulseInnerDiv = document.createElement('div');
    pulseInnerDiv.className = 'w-full h-64 bg-gray-200';
    pulseDiv.appendChild(pulseInnerDiv);

    // Create the content div
    const contentDiv = document.createElement('div');
    contentDiv.className = 'px-4 py-3 flex flex-col gap-3 flex-grow';

    // Create the flex-1 div
    const flex1Div = document.createElement('div');
    flex1Div.className = 'flex-1 flex flex-col gap-3';
    for (let i = 0; i < 3; i++) {
        const innerDiv = document.createElement('div');
        innerDiv.className = 'w-full h-4 bg-gray-200 animate-pulse';
        flex1Div.appendChild(innerDiv);
    }

    // Create the justify-between div
    const justifyBetweenDiv = document.createElement('div');
    justifyBetweenDiv.className = 'flex justify-between items-center gap-2 h-full flex-1';
    const innerDiv1 = document.createElement('div');
    const innerDiv2 = document.createElement('div');
    innerDiv2.className = 'max-w-[210px] w-full h-[50px] bg-gray-200 animate-pulse';
    justifyBetweenDiv.appendChild(innerDiv1);
    justifyBetweenDiv.appendChild(innerDiv2);

    // Append all elements to the content div
    contentDiv.appendChild(flex1Div);
    contentDiv.appendChild(justifyBetweenDiv);

    // Append pulseDiv and contentDiv to the mainDiv
    mainDiv.appendChild(pulseDiv);
    mainDiv.appendChild(contentDiv);
    const shimmer = document.getElementById('shimmer');
    shimmer.appendChild(mainDiv);
    }
}

function initializeHeartButtons() {
    const buttons = document.querySelectorAll('.ph-heart-straight');
    buttons.forEach((button) => {
        const isRed = localStorage.getItem(`heart-${button.id}`) === 'true';
        if (isRed) {
            button.classList.remove('ph', 'text-white');
            button.classList.add('ph-fill', 'text-red-500');
        } else {
            button.classList.remove('ph-fill', 'text-red-500');
            button.classList.add('ph', 'text-white');
        }
        button.addEventListener('click', () => {
            const exist = localStorage.getItem(`heart-${button.id}`) === 'true' ? true : false;
            if (exist) {
                if (exist) {
                    button.classList.add('ph', 'text-white');
                    button.classList.remove('ph-fill', 'text-red-500');
                    localStorage.setItem(`heart-${button.id}`, 'false');
                } else {
                    button.classList.remove('ph', 'text-white');
                    button.classList.add('ph-fill', 'text-red-500');
                    localStorage.setItem(`heart-${button.id}`, 'true');
                }
            } else {
                button.classList.remove('ph', 'text-white');
                button.classList.add('ph-fill', 'text-red-500');
                localStorage.setItem(`heart-${button.id}`, 'true');
            }

        });
    });
}

function shimmerFunc() {
    for (let i = 0; i < 12; i++) {
        const shimmer = new Shimmer();
        shimmer.render()
    }
}


function getQueryParamByName(name) {
    // Get the URLSearchParams object from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get the value of the specified query parameter
    return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', (event) => {
    // shimmerFunc()
    const searchValue = getQueryParamByName('search');
    let num1 = 0
    let num2 = 0
    if (localStorage.getItem('date')) {
        const [startDate, endDate] = localStorage.getItem('date').split('|');
        const start = new Date(startDate);
        const end = new Date(endDate);
        const options = { month: 'short', day: 'numeric' };
        const formattedStart = start.toLocaleDateString('en-US', options);
        const formattedEnd = end.toLocaleDateString('en-US', options);
        document.getElementById('dates-p').textContent = `${formattedStart} - ${formattedEnd}`
        document.getElementById('dates-cross').classList.remove('hidden')  
        document.getElementById('calendar-left').textContent = formattedStart 
        document.getElementById('calendar-right').textContent = formattedEnd 
    }
    if (localStorage.getItem('guests')) {
        const guestLocalNum = localStorage.getItem('guests');
        if (Number(guestLocalNum) === 0) {
            console.log('ss',guestLocalNum)
            document.getElementById('guest-text').textContent = 'Guests'  
            document.getElementById('guest-cross').classList.add('hidden')
        } else {
            document.getElementById('guest-text').textContent = `${guestLocalNum !== 0 ? 
                `${guestLocalNum > 1 ? `${guestLocalNum} Guests` : `${guestLocalNum} Guest`}` 
                : 'Guests'}`
                document.getElementById('guest-cross').classList.remove('hidden')
        }
        document.getElementById('guest-number').textContent = guestLocalNum  
    }
    if (localStorage.getItem('price')) {
        const price = localStorage.getItem('price');
        if (price === '৳0 - ৳0' || price === '৳9 - ৳2501') {
            document.getElementById('price-p').textContent = `Price`  
            document.getElementById('price-cross').classList.add('hidden')
        } else {
            document.getElementById('price-p').textContent = price
            document.getElementById('price-cross').classList.remove('hidden')
        }
        const numbers = price.match(/\d+/g);

        if (numbers && numbers.length >= 2) {
            num1 = parseInt(numbers[0], 10);
            num2 = parseInt(numbers[1], 10);

            console.log("First Number:", num1);
            console.log("Second Number:", num2);
        }
        priceRangeLow = num1
        priceRangeHigh = num2
    }
    if (localStorage.getItem('more-filter')) {
        if (Number(localStorage.getItem('more-filter')) > 0) {
            document.getElementById('filter-p').textContent = localStorage.getItem('more-filter')
            document.getElementById('filter-cross').classList.remove('hidden')
        }
    }
    if (localStorage.getItem('check')) {
        const check = localStorage.getItem('check').split(',');
        check.forEach(num => {
            const checkbox = document.getElementById(`check-${num}`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }
    fetchData(searchValue, "", "", 0, num1, num2);
});

let initialMaxPrice = 0
let initialMinPrice = 0

async function fetchData(searchValue, selectedValue = "", dates = "", guest = 0, pLow = 0, pHigh = 0) {
    try {
        const sortLocalCheck = localStorage.getItem('filter');
        if (sortLocalCheck) {
            selectedValue = localStorage.getItem('filter')
        } else {
            localStorage.setItem('filter', 'Most Popular')
            selectedValue = 'Most Popular'
        }
        const container = document.getElementById('tiles');
        container.innerHTML = '';
        document.getElementById('shimmer').classList.remove('hidden');
        document.getElementById('tiles').classList.add('hidden');
        shimmerFunc()
        const responseFirstApi = await fetch(`/api/v1/keyword/${searchValue}`);
        if (!responseFirstApi.ok) {
            throw new Error('Network responseFirstApi was not ok ' + responseFirstApi.statusText);
        }
        const locations = await responseFirstApi.json();
        let responseSecondApi;
        const guestLocalCheck = localStorage.getItem('guests')
        const dateLocalCheck = localStorage.getItem('date')
        // const defaultLowPrice = document.getElementById('fromSlider').min
        // const defaultHighPrice = document.getElementById('fromSlider').max
        console.log(pLow, pHigh)
        if (dates.length > 0 || dateLocalCheck) {
            if (dateLocalCheck) {
                dates = dateLocalCheck
                
                const month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                // Extract month and date using regex
                const matches = dates.match(/\d{4}-(\d{2})-(\d{2})\|\d{4}-(\d{2})-(\d{2})/);
                console.log(dates)
                if (matches) {
                    const month1 = month[parseInt(matches[1], 10)];
                    const day1 = matches[2];
                    const month2 = month[parseInt(matches[3], 10)];
                    const day2 = matches[4];
                    document.getElementById('calendar-left').textContent = `${month1} ${day1}` 
                    document.getElementById('calendar-right').textContent = `${month2} ${day2}`
                }

            }
            responseSecondApi = await fetch(`/api/v1/locationSlug/${locations}|${dates}|${guestLocalCheck ? guestLocalCheck : guest}|${pLow}|${pHigh}`);
        } else {
            responseSecondApi = await fetch(`/api/v1/locationSlug/${locations}|${guestLocalCheck ? guestLocalCheck : guest}|${pLow}|${pHigh}`);
        }
        
        if (!responseSecondApi.ok) {
            throw new Error('Network responseSecondApi was not ok ' + responseSecondApi.statusText);
        }
        const itemIds = await responseSecondApi.json();
        console.log(itemIds)
        const queryString = itemIds.join(',');
        const responseThirdApi = await fetch(`/api/v1/itemIds/${queryString}`);
        if (!responseThirdApi.ok) {
            throw new Error('Network responseThirdApi was not ok ' + responseThirdApi.statusText);
        }
        const propertyData = await responseThirdApi.json();
        if (initialMaxPrice === 0) {
            if (localStorage.getItem('price')) {
                const price = localStorage.getItem('price');
                const numbers = price.match(/\d+/g);
        
                if (numbers && numbers.length >= 2) {
                    num1 = parseInt(numbers[0], 10);
                    num2 = parseInt(numbers[1], 10);
        
                    console.log("First Number:", num1);
                    console.log("Second Number:", num2);
                }
                
                if (price === '৳0 - ৳0') {
                    const fromSlide = document.getElementById('fromSlider');
                    const toSlide = document.getElementById('toSlider');
                    document.getElementById('price-high').value = 2501;
                    document.getElementById('price-low').value = 9;
                    fromSlide.value = 0;
                    toSlide.value = 100;
                    const minPrice = Math.round(Math.min(...propertyData.map(item => Number(item.Property.Price))));
                    const maxPrice = Math.round(Math.max(...propertyData.map(item => Number(item.Property.Price))));
                    fromSlide.min = minPrice - 1;
                    fromSlide.max = maxPrice + 1;
                    fromSlide.value = minPrice - 1;
                    
                    toSlide.min = minPrice - 1;
                    toSlide.max = maxPrice + 1;
                    toSlide.value = maxPrice + 1;
                    
                    document.getElementById('price-high').value = maxPrice + 1;
                    document.getElementById('price-low').value = minPrice - 1;
                    initialMaxPrice = maxPrice + 1
                    initialMinPrice = minPrice - 1
                } else {
                    console.log('price', num1)
                    const fromSlide = document.getElementById('fromSlider');
                    const toSlide = document.getElementById('toSlider');
                    
                    console.log('price', fromSlider.value)
                    toSlide.value = num2;
                    fromSlide.min = 9;
                    fromSlide.max = 2501;
                    fromSlide.value = num1;
                    console.log('price', fromSlider.value)
                    toSlide.min = 9;
                    toSlide.max = 2501;
                    toSlide.value = num2;
                    
                    document.getElementById('price-high').value = num2;
                    document.getElementById('price-low').value = num1;
                    initialMaxPrice = 2501
                    initialMinPrice = 9
                }
            } else {
                const fromSlide = document.getElementById('fromSlider');
                const toSlide = document.getElementById('toSlider');
                const minPrice = Math.round(Math.min(...propertyData.map(item => Number(item.Property.Price))));
                const maxPrice = Math.round(Math.max(...propertyData.map(item => Number(item.Property.Price))));
                fromSlide.min = minPrice - 1;
                fromSlide.max = maxPrice + 1;
                fromSlide.value = minPrice - 1;
                
                toSlide.min = minPrice - 1;
                toSlide.max = maxPrice + 1;
                toSlide.value = maxPrice + 1;
                
                document.getElementById('price-high').value = maxPrice + 1;
                document.getElementById('price-low').value = minPrice - 1;
                initialMaxPrice = maxPrice + 1
                initialMinPrice = minPrice - 1
            }
        }
        if (selectedValue === "Lowest Price") {
            propertyData.sort((a, b) => a.Property.Price - b.Property.Price);
        } else if (selectedValue === "Highest Price"){
            propertyData.sort((a, b) => b.Property.Price - a.Property.Price);
        } else if (selectedValue === "Highest Rating"){
            propertyData.sort((a, b) => b.Property.ReviewScore - a.Property.ReviewScore);
        } else if (selectedValue === "Lowest Rating"){
            propertyData.sort((a, b) => a.Property.ReviewScore - b.Property.ReviewScore);
        } 
        for (let i = 0; i < propertyData.length; i++) {
            const tile = new Property(propertyData[i]);
            tile.render()
        }
        initializeHeartButtons()
        next()
        prev()
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

let date
const selectElement = document.getElementById('sortOptions');
if (localStorage.getItem('filter')) {
    selectElement.value = localStorage.getItem('filter')
}
selectElement.addEventListener('change', function() {
    const searchValue = getQueryParamByName('search');
    localStorage.setItem('filter', selectElement.value)
    console.log("this is date", date)
    console.log("this is price", priceRangeLow)
    fetchData(searchValue, selectElement.value, date, guestNumber, priceRangeLow, priceRangeHigh);
});

function modal(state, modal) {
    if (state) {
        const blueOverlay = document.getElementById('blueOverlay-main')
        blueOverlay.classList.remove('hidden')
        if (modal === 'date') {
            document.getElementById('modal-dates').classList.remove('hidden')
        } else if (modal === 'filter') {
            document.getElementById('modal-filter').classList.remove('hidden')
        }
    } else {
        const blueOverlay = document.getElementById('blueOverlay-main')
        blueOverlay.classList.add('hidden')
        document.getElementById('modal-filter').classList.add('hidden')
        document.getElementById('modal-dates').classList.add('hidden')
    }
}

document.getElementById('blueOverlay').addEventListener('click', () => {
    modal(false, 'blueOverlay')
    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
})

document.getElementById('dates').addEventListener('click', () => {
    modal(true, 'date')
})

const filters = document.querySelectorAll('.filter'); 
filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        modal(true, 'filter');
    });
});

const modalCross = document.querySelectorAll('.modal-cross'); 
modalCross.forEach((filter) => {
    filter.addEventListener('click', () => {
        modal(false, 'cross')
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
    });
});

let input = document.getElementById('input-id');
let datepicker = new HotelDatepicker(input, {
    inline: true,
    clearButton: false,
    showTopbar: false,
});

document.querySelectorAll('.modal-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
    });
});


const table1 = document.getElementById('month-1-input-id')
const table2 = document.getElementById('month-2-input-id')
let child
if (table1.querySelector('.datepicker__month-day--today')) {
    child = table1.querySelector('.datepicker__month-day--today')
    if (table1) {
        function findTextContent15(element) {
            // Base case: Check if the current element's textContent is 15
            if (element.textContent.trim() === String(Number(child.textContent) + 1)) {
                element.classList.add('datepicker__month-day--first-day-selected')
            } else {
                const tdElements = table2.querySelectorAll('td');

                // Iterate through each <td> element
                tdElements.forEach(td => {
                    // Check if the text content is "1"
                    if (td.textContent.trim() === '1') {
                        td.classList.add('datepicker__month-day--first-day-selected');
                    }
                    if (td.textContent.trim() === '2') {
                        td.classList.add('datepicker__month-day--last-day-selected');
                    }
                });
                return
            }

            if (element.textContent.trim() === String(Number(child.textContent) + 2)) {
                element.classList.add('datepicker__month-day--last-day-selected')
            } else {
                const tdElements = table2.querySelectorAll('td');

                // Iterate through each <td> element
                tdElements.forEach(td => {
                    // Check if the text content is "1"
                    if (td.textContent.trim() === '1') {
                        // You can perform additional actions here, such as adding a class
                        td.classList.add('datepicker__month-day--last-day-selected'); // Example: Add a class to highlight the cell
                    }
                });
            }
    
            // Recursively check the child nodes
            for (let child of element.children) {
                if (findTextContent15(child)) {
                    return true; // Stop further checks when a match is found
                }
            }
    
            return false; // No match found in this branch
        }
    
        if (!findTextContent15(table1)) {
            console.log('No element with textContent 15 found.');
        }
    } else {
        console.log('Table not found!');
    }
} else {
    child = table2.querySelector('.datepicker__month-day--today')
    if (table2) {
        function findTextContent15(element) {
            // Base case: Check if the current element's textContent is 15
            if (element.textContent.trim() === String(Number(child.textContent) + 1)) {
                element.classList.add('datepicker__month-day--first-day-selected')
            }

            if (element.textContent.trim() === String(Number(child.textContent) + 2)) {
                element.classList.add('datepicker__month-day--last-day-selected')
            }
    
            // Recursively check the child nodes
            for (let child of element.children) {
                if (findTextContent15(child)) {
                    return true; // Stop further checks when a match is found
                }
            }
    
            return false; // No match found in this branch
        }
    
        if (!findTextContent15(table2)) {
            console.log('No element with textContent 15 found.');
        }
    } else {
        console.log('Table not found!');
    }
}


function getToolText () {
    const dateCells = document.querySelectorAll('td.datepicker__month-day--valid');

    if (dateCells.length > 0) {
    // Loop through each matched <td> element
    dateCells.forEach((cell) => {
        cell.addEventListener('click', (event) => {
        // Use event.target to get the element that was clicked
        const clickedCell = event.target;
        const classes = clickedCell.classList;
        const check = classes.contains('datepicker__month-day--hovering')
        if (check) {
            const tool = document.getElementById('tooltip-input-id').textContent;
            document.getElementById('night').textContent = tool;
        }
        });
    });
    } else {
    console.error('No valid date cells found.');
    }
}

getToolText()


const targetElement1 = document.getElementById('month-1-input-id');
const targetElement2 = document.getElementById('month-2-input-id');

// Check if the elements exist
if (targetElement1 && targetElement2) {
  // Create a MutationObserver instance
  const observer = new MutationObserver((mutationsList) => {
    // Loop through each mutation
    mutationsList.forEach((mutation) => {
      // Check if the mutation is related to child elements
      if (mutation.type === 'childList') {
        console.log('A change was detected in the child elements!');
        // Call the function here
        getToolText();
      }
    });
  });

  // Configure the observer to watch for child changes
  const config = { childList: true, subtree: true };

  // Start observing both elements
  observer.observe(targetElement1, config);
  observer.observe(targetElement2, config);
} else {
  console.error('Elements not found.');
}
console.log('Elements not found.');
const months = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}
const firstDaySelectedDefault = table1.querySelector('.datepicker__month-day--first-day-selected') ||
                                table2.querySelector('.datepicker__month-day--first-day-selected');
const firstDayMonthDefault = firstDaySelectedDefault.ariaLabel.split(',')[1].trim().slice(0, 3);
const firstDayYearDefault = firstDaySelectedDefault.ariaLabel.split(',')[2].trim().slice(0, 4);
const firstDayIndexDefault = firstDaySelectedDefault.textContent
const lastDaySelectedDefault = table1.querySelector('.datepicker__month-day--last-day-selected') || 
                               table2.querySelector('.datepicker__month-day--last-day-selected');
const lastDayMonthDefault = lastDaySelectedDefault.ariaLabel.split(',')[1].trim().slice(0, 3);
const lastDayYearDefault = lastDaySelectedDefault.ariaLabel.split(',')[2].trim().slice(0, 4);
const lastDayIndexDefault = lastDaySelectedDefault.textContent

let firstDaySelected, firstDayMonth, firstDayYear, firstDayIndex, lastDaySelected, lastDayMonth, lastDayYear, lastDayIndex
const nightBtn = document.getElementById('night-btn')
nightBtn.addEventListener('click', () => {
    nightBtnClick()
})

function nightBtnClick(param = "") {
    if (param.length > 0) {
        firstDaySelectedDefault.click();
        lastDaySelectedDefault.click();
        return
    }
    if (table1.querySelector('.datepicker__month-day--last-day-selected') === null && table2.querySelector('.datepicker__month-day--last-day-selected') === null) {
        firstDaySelectedDefault.click();
        firstDaySelectedDefault.click();
        lastDaySelectedDefault.click();
        modal(false, 'nightBtn')
        document.getElementById('dates-p').textContent = `${firstDayMonthDefault} ${firstDayIndexDefault} - ${lastDayMonthDefault} ${lastDayIndexDefault}`
        document.getElementById('dates-cross').classList.remove('hidden')
        document.getElementById('night').textContent = '1 Night'
        const searchValue = getQueryParamByName('search');
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
        localStorage.setItem('date', `${firstDayYearDefault}-0${months[firstDayMonthDefault]}-${firstDayIndexDefault.length < 2 ? `0${firstDayIndexDefault}` : firstDayIndexDefault}|${lastDayYearDefault}-0${months[lastDayMonthDefault]}-${lastDayIndexDefault.length < 2 ? `0${lastDayIndexDefault}` : lastDayIndexDefault}`)
        fetchData(searchValue)
        return
    }
    firstDaySelected = undefined;
    firstDayMonth = undefined;
    firstDayYear = undefined;
    firstDayIndex = undefined;
    lastDaySelected = undefined;
    lastDayMonth = undefined;
    lastDayYear = undefined;
    lastDayIndex = undefined;
    setTimeout(() => {
        if (table1.querySelector('.datepicker__month-day--first-day-selected')) {
            firstDaySelected = table1.querySelector('.datepicker__month-day--first-day-selected')
                if (firstDaySelected.ariaLabel.split(',').length > 3) {
                    firstDayMonth = firstDaySelected.ariaLabel.split(',')[2].trim().slice(0, 3);
                    firstDayYear = firstDaySelected.ariaLabel.split(',')[3].trim().slice(0, 4);
                } else {
                    firstDayMonth = firstDaySelected.ariaLabel.split(',')[1].trim().slice(0, 3);
                    firstDayYear = firstDaySelected.ariaLabel.split(',')[2].trim().slice(0, 4);
                }
                firstDayIndex = firstDaySelected.textContent
        } else if (table2.querySelector('.datepicker__month-day--first-day-selected')) {
            firstDaySelected = table2.querySelector('.datepicker__month-day--first-day-selected')
                if (firstDaySelected.ariaLabel.split(',').length > 3) {
                    firstDayMonth = firstDaySelected.ariaLabel.split(',')[2].trim().slice(0, 3);
                    firstDayYear = firstDaySelected.ariaLabel.split(',')[3].trim().slice(0, 4);
                } else {
                    firstDayMonth = firstDaySelected.ariaLabel.split(',')[1].trim().slice(0, 3);
                    firstDayYear = firstDaySelected.ariaLabel.split(',')[2].trim().slice(0, 4);
                }
                firstDayIndex = firstDaySelected.textContent
        }
        if (table1.querySelector('.datepicker__month-day--last-day-selected')) {
            lastDaySelected = table1.querySelector('.datepicker__month-day--last-day-selected')
                if (lastDaySelected.ariaLabel.split(',').length > 3) {
                    lastDayMonth = lastDaySelected.ariaLabel.split(',')[2].trim().slice(0, 3);
                    lastDayYear = lastDaySelected.ariaLabel.split(',')[3].trim().slice(0, 4);
                } else {
                    lastDayMonth = lastDaySelected.ariaLabel.split(',')[1].trim().slice(0, 3);
                    lastDayYear = lastDaySelected.ariaLabel.split(',')[2].trim().slice(0, 4);
                }
                lastDayIndex = lastDaySelected.textContent
            
        } else if (table2.querySelector('.datepicker__month-day--last-day-selected')) {
            lastDaySelected = table2.querySelector('.datepicker__month-day--last-day-selected')
                if (lastDaySelected.ariaLabel.split(',').length > 3) {
                    lastDayMonth = lastDaySelected.ariaLabel.split(',')[2].trim().slice(0, 3);
                    lastDayYear = lastDaySelected.ariaLabel.split(',')[3].trim().slice(0, 4);
                } else {
                    lastDayMonth = lastDaySelected.ariaLabel.split(',')[1].trim().slice(0, 3);
                    lastDayYear = lastDaySelected.ariaLabel.split(',')[2].trim().slice(0, 4);
                }
                lastDayIndex = lastDaySelected.textContent
        } else {
            firstDayMonth = firstDayMonthDefault
            firstDayYear = firstDayYearDefault
            firstDayIndex = firstDayIndexDefault
            lastDayMonth = lastDayMonthDefault
            lastDayYear = lastDayYearDefault
            lastDayIndex = lastDayIndexDefault
            nightBtnClick('dateCross')
            document.getElementById('night').textContent = '1 Night'
        }
        modal(false, 'nightBtn')
        document.getElementById('dates-p').textContent = `${firstDayMonth} ${firstDayIndex} - ${lastDayMonth} ${lastDayIndex}`
        document.getElementById('dates-cross').classList.remove('hidden')
        document.getElementById('filter-cross').classList.remove('hidden')
        const searchValue = getQueryParamByName('search');
        console.log(lastDayMonth)
        date = `${firstDayYear}-0${months[firstDayMonth]}-${firstDayIndex.length < 2 ? `0${firstDayIndex}` : firstDayIndex}|${lastDayYear}-0${months[lastDayMonth]}-${lastDayIndex.length < 2 ? `0${lastDayIndex}` : lastDayIndex}`
        localStorage.setItem('date', date)
        if (date.length > 0 && filterDates !== true) {
            filterDates = true
            filterNumber += 1
        }
        if (filterNumber > 0) {
            localStorage.setItem('more-filter', filterNumber)
        }
        document.getElementById('filter-p').textContent = filterNumber
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
        console.log('date', firstDayYearDefault, lastDayYearDefault)
        fetchData(searchValue, "", date)
    }, 500);
}

document.getElementById('dates-cross').addEventListener('click', () => {
    event.stopPropagation();
    modal(false, 'nightBtnCross')
    document.getElementById('dates-cross').classList.add('hidden')
    document.getElementById('dates-p').textContent = 'Dates'
    nightBtnClick('dateCross')
    document.getElementById('night').textContent = '1 Night'
    date = ""
    const searchValue = getQueryParamByName('search');
    filterDates = false
    filterNumber -= 1
    if (filterNumber <= 0) {
        document.getElementById('filter-cross').classList.add('hidden')
        localStorage.setItem('more-filter', filterNumber)
    } else {
        localStorage.setItem('more-filter', filterNumber)
    }
    document.getElementById('filter-p').textContent = filterNumber
    localStorage.removeItem('date')
    fetchData(searchValue, "", date)
    document.getElementById('calendar-left').textContent = '' 
    document.getElementById('calendar-right').textContent = '' 
})

let guestNumber = 0
let priceRangeLow = 0
let priceRangeHigh = 0
document.getElementById('increment-btn').addEventListener('click', () => {
    const number = Number(document.getElementById('guest-number').textContent)
    if (number < 30) {
        document.getElementById('guest-number').textContent = Number(document.getElementById('guest-number').textContent) + 1
        guestNumber = Number(document.getElementById('guest-number').textContent)
    }
})

document.getElementById('decrement-btn').addEventListener('click', () => {
    const number = Number(document.getElementById('guest-number').textContent)
    if (number > 0) {
        document.getElementById('guest-number').textContent = number - 1
        guestNumber = Number(document.getElementById('guest-number').textContent)
    }
})

let check = []
let filterCheck = check.length

document.getElementById('search').addEventListener('click', () => {
    modal(false, 'search')
    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
    if (guestNumber !== 0) {
            document.getElementById('guest-text').textContent = `${guestNumber > 1 ? `${guestNumber} Guests` : `${guestNumber} Guest`}`
            document.getElementById('guest-cross').classList.remove('hidden')
    }
    console.log('price', priceRangeLow, priceRangeHigh)
    if (priceRangeLow > document.getElementById('price-low').min || priceRangeHigh < document.getElementById('price-high').max) {
        if (Number(priceRangeLow) === 9 && Number(priceRangeHigh) === 2501) {
            document.getElementById('price-p').textContent = `Price`
            document.getElementById('price-cross').classList.add('hidden')
        } else {
            document.getElementById('price-p').textContent = `৳${priceRangeLow} - ৳${priceRangeHigh}`
            document.getElementById('price-cross').classList.remove('hidden')
        }
    }
    const searchValue = getQueryParamByName('search');
    localStorage.setItem('guests', guestNumber)
    if (Number(priceRangeHigh) === 2501 && Number(priceRangeLow) === 9) {
        localStorage.setItem('price', `৳0 - ৳0`)
    } else {
        localStorage.setItem('price', `৳${priceRangeLow} - ৳${priceRangeHigh}`)
    }
    if (guestNumber !== 0 || 
        (Number(priceRangeLow) !== 9 && Number(priceRangeLow) !== 0) || 
        (Number(priceRangeHigh) !== 2501 && Number(priceRangeHigh) !== 0) || check.length >= 0) {
        if (guestNumber !== 0 && filterGuest !== true) {
            filterGuest = true
            filterNumber += 1
        }
        if (((Number(priceRangeLow) !== 9 && Number(priceRangeLow) !== 0) || 
        (Number(priceRangeHigh) !== 2501 && Number(priceRangeHigh) !== 0)) && filterPrice !== true) {
            filterPrice = true;
            filterNumber += 1;
        }
        console.log(filterCheck, check)
        if (check.length !== filterCheck) {
            filterNumber -= filterCheck;
            filterCheck = check.length
            filterNumber += filterCheck;
        }

        if (check.length === 0) {
            console.log('check', check)
            if (filterNumber < 0) {
                filterNumber = 0
            }
            filterNumber -= filterCheck;
            filterCheck = 0
            console.log('filterNumber--->', filterNumber)
        }
        if (filterNumber <= 0) {
            document.getElementById('filter-cross').classList.add('hidden')
        } else {
            document.getElementById('filter-cross').classList.remove('hidden')
        }
        
        document.getElementById('filter-p').textContent = filterNumber
    }
    console.log('asdasd', filterNumber)
    if (filterNumber > 0) {
        localStorage.setItem('more-filter', filterNumber)
    }
    localStorage.setItem('check', check)
    fetchData(searchValue, "", date, guestNumber, priceRangeLow, priceRangeHigh)
})

document.getElementById('guest-cross').addEventListener('click', () => {
    event.stopPropagation();
    document.getElementById('guest-text').textContent = 'Guests'
    guestNumber = 0
    document.getElementById('guest-number').textContent = String(guestNumber)
    document.getElementById('guest-cross').classList.add('hidden')
    filterGuest = false
    filterNumber -= 1
    if (filterNumber <= 0) {
        document.getElementById('filter-cross').classList.add('hidden')
        localStorage.setItem('more-filter', filterNumber)
    } else {
        localStorage.setItem('more-filter', filterNumber)
    }
    document.getElementById('filter-p').textContent = filterNumber
    const searchValue = getQueryParamByName('search');
    localStorage.removeItem('guests')
    fetchData(searchValue, "", date, guestNumber)
})

document.getElementById('price-cross').addEventListener('click', () => {
    event.stopPropagation();
    document.getElementById('price-p').textContent = 'Price'
    document.getElementById('price-cross').classList.add('hidden')
    const searchValue = getQueryParamByName('search');
    localStorage.removeItem('price')
    console.log('initial', initialMinPrice)
    document.getElementById('fromSlider').value = 9;
    document.getElementById('toSlider').value = 2501;
    document.getElementById('price-low').value = 9;
    document.getElementById('price-high').value = 2501;
    filterPrice = false
    filterNumber -= 1
    if (filterNumber <= 0) {
        document.getElementById('filter-cross').classList.add('hidden')
        localStorage.setItem('more-filter', filterNumber)
    } else {
        localStorage.setItem('more-filter', filterNumber)
    }
    document.getElementById('filter-p').textContent = filterNumber
    initialMinPrice = 0
    initialMaxPrice = 0
    priceRangeLow = 0
    priceRangeHigh = 0
    fetchData(searchValue, "", date, guestNumber, initialMinPrice, initialMaxPrice)
})

const fromSlider = document.getElementById('fromSlider');
const toSlider = document.getElementById('toSlider');
const priceLow = document.getElementById('price-low');
const priceHigh = document.getElementById('price-high');

fromSlider.addEventListener('input', () => {
    let fromValue = Number(fromSlider.value);
    let toValue = Number(toSlider.value);

    if (fromValue >= toValue) {
        priceLow.value = toSlider.value;
        priceHigh.value = fromSlider.value;
        priceRangeLow = toSlider.value;
        priceRangeHigh = fromSlider.value;
    } else {
        priceLow.value = fromSlider.value;
        priceHigh.value = toSlider.value;
        priceRangeLow = fromSlider.value;
        priceRangeHigh = toSlider.value;
    }

    
});

toSlider.addEventListener('input', () => {
    let fromValue = Number(fromSlider.value);
    let toValue = Number(toSlider.value);

    if (toValue <= fromValue) {
        priceLow.value = toSlider.value;
        priceHigh.value = fromSlider.value;
        priceRangeLow = toSlider.value;
        priceRangeHigh = fromSlider.value;
    } else {
        priceLow.value = fromSlider.value;
        priceHigh.value = toSlider.value;
        priceRangeLow = fromSlider.value;
        priceRangeHigh = toSlider.value;
    }


});


let filterNumber = 0
let filterGuest = false
let filterPrice = false
let filterDates = false

document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checkedNumbers = Array.from(document.querySelectorAll('.checkbox:checked'))
            .map(cb => cb.id.replace('check-', ''));

        for (let i = 1; i <= 21; i++) {
            if (checkedNumbers.includes(i.toString())) {
                if (!check.includes(i)) {
                    check.push(i); // Add i if it's not already in the array
                }
            } else {
                const index = check.indexOf(i);
                if (index > -1) {
                    check.splice(index, 1); // Remove i if it's unchecked
                }
            }
        }

        console.log('Current check array:', check);
    });
});

document.getElementById('clear').addEventListener('click', () => {
    filterGuest = false
    filterPrice = false
    filterDates = false
    guestNumber = 0
    priceRangeHigh = 0
    priceRangeLow = 0
    check.forEach(num => {
        const checkbox = document.getElementById(`check-${num}`);
        if (checkbox) {
            checkbox.checked = false;
        }
    });
    document.getElementById('filter-p').textContent = filterNumber
    document.getElementById('filter-cross').classList.add('hidden')
    document.getElementById('guest-text').textContent = 'Guests'
    document.getElementById('guest-cross').classList.add('hidden')
    document.getElementById('price-p').textContent = 'Price'
    document.getElementById('price-cross').classList.add('hidden')
    document.getElementById('dates-p').textContent = 'Dates'
    document.getElementById('dates-cross').classList.add('hidden')
    nightBtnClick('dateCross')
    document.getElementById('night').textContent = '1 Night'
    date = ""
    document.getElementById('calendar-left').textContent = ''
    document.getElementById('calendar-right').textContent = ''
    document.getElementById('guest-number').textContent = '0'
    document.getElementById('fromSlider').value = 9;
    document.getElementById('toSlider').value = 2501;
    document.getElementById('price-low').value = 9;
    document.getElementById('price-high').value = 2501;
    check = [];
    console.log(check)
    localStorage.removeItem('guests')
    localStorage.removeItem('price')
    localStorage.removeItem('date')
    localStorage.setItem('more-filter', 0)
    localStorage.removeItem('check', check)
    filterNumber = 0
})

document.querySelectorAll('#check-in, #check-out').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('modal-dates').classList.remove('hidden')
        document.getElementsByTagName('body')[0].classList.add('overflow-hidden');  
        document.getElementById('blueOverlay-main').classList.remove('hidden')
        document.getElementById('modal-filter').classList.add('hidden')
    });
});


document.getElementById("price-low").addEventListener("input", () => {
    console.log("Price Low changed!");
    if (Number(document.getElementById("price-low").value) < 9) {
        console.log("Price is too low!");
        document.getElementById("price-low").value = 9; // Set it to 9 if lower
    }
    if (Number(document.getElementById("price-low").value) > 2500) {
        console.log("Price is too low!");
        document.getElementById("price-low").value = 2500; // Set it to 9 if lower
    }
    fromSlider.value = document.getElementById("price-low").value;
});


document.getElementById("price-high").addEventListener("input", () => {
    console.log("Price high changed!");
    if (Number(document.getElementById("price-high").value) > 2501) {
        console.log("Price is too high!");
        document.getElementById("price-high").value = 2501; // Set it to 9 if lower
    }
    if (Number(document.getElementById("price-high").value) < 10) {
        console.log("Price is too high!");
        document.getElementById("price-high").value = 10; // Set it to 9 if lower
    }
    toSlider.value = document.getElementById("price-high").value;
});










let nextSlide = [];
let currentIndex = {}; // Object to store current indices for each carousel

function next() {
    document.querySelectorAll('#next').forEach(button => {
        button.addEventListener('click', async (event) => {
            const parentDiv = event.target.parentElement;

            if (!parentDiv || !parentDiv.id) {
                console.warn("Parent element does not have an ID.");
                return;
            }

            const carouselId = parentDiv.id;

            try {
                if (!nextSlide.includes(carouselId)) {
                    nextSlide.push(carouselId);
                    console.log("Fetching images for:", carouselId);
                    const responseImageApi = await fetch(`/api/v1/propertyId/${carouselId}`);

                    if (!responseImageApi.ok) {
                        throw new Error(`API error: ${responseImageApi.status} ${responseImageApi.statusText}`);
                    }

                    const images = await responseImageApi.json();

                    if (!Array.isArray(carouselItems[carouselId])) {
                        carouselItems[carouselId] = [];
                    }

                    const mainDiv = document.getElementById(`${carouselId}relative`);
                    console.log(mainDiv);
                    const imgElement = mainDiv.querySelector("img");

                    if (imgElement) {
                        mainDiv.removeChild(imgElement);
                    }

                    carouselItems[carouselId].push(...images.map(image => image));

                    for (let i = 0; i < carouselItems[carouselId].length; i++) {
                        const img = document.createElement('img');
                        img.src = `https://imgservice.rentbyowner.com/640x417/${carouselItems[carouselId][i]}`;
                        img.alt = carouselItems[carouselId][i];
                        img.className = 'w-full h-64 object-cover shrink-0 carousel-img';
                        mainDiv.appendChild(img);
                    }
                }

                const carouselTrack = document.getElementById(`${carouselId}relative`);
                const imagesAll = carouselTrack.querySelectorAll('img');
                const totalImages = imagesAll.length;
                parentDiv.querySelector('#prev').classList.remove('hidden');

                if (!currentIndex[carouselId]) {
                    currentIndex[carouselId] = 0;
                }

                function updateCarousel() {
                    const offset = -currentIndex[carouselId] * carouselTrack.clientWidth;
                    carouselTrack.style.transform = `translateX(${offset}px)`;
                    
                    // Update dots
                    const dots = document.querySelectorAll(`#${carouselId} .dots-container button`);
                    dots.forEach((dot, index) => {
                        if (index === currentIndex[carouselId]) {
                            dot.className = 'rounded-full bg-white transition-all duration-300 w-2 h-2';
                        } else {
                            dot.className = 'rounded-full bg-white transition-all duration-300 w-1 h-1';
                        }
                    });
                }

                if (currentIndex[carouselId] < totalImages - 1) {
                    currentIndex[carouselId]++;
                    if (currentIndex[carouselId] === totalImages - 1) {
                        event.target.classList.add('hidden');
                    }
                }
                updateCarousel();

            } catch (error) {
                console.error("Error fetching images:", error);
            }
        });
    });
}

function prev() {
    document.querySelectorAll('#prev').forEach(button => {
        button.addEventListener('click', (event) => {
            const parentDiv = event.target.parentElement;

            if (!parentDiv || !parentDiv.id) {
                console.warn("Parent element does not have an ID.");
                return;
            }

            const carouselId = parentDiv.id;

            const carouselTrack = document.getElementById(`${carouselId}relative`);
            const imagesAll = carouselTrack.querySelectorAll('img');
            const totalImages = imagesAll.length;

            parentDiv.querySelector('#next').classList.remove('hidden');

            if (!currentIndex[carouselId]) {
                currentIndex[carouselId] = 0;
            }

            function updateCarousel() {
                const offset = -currentIndex[carouselId] * carouselTrack.clientWidth;
                carouselTrack.style.transform = `translateX(${offset}px)`;
                
                // Update dots
                const dots = document.querySelectorAll(`#${carouselId} .dots-container button`);
                dots.forEach((dot, index) => {
                    if (index === currentIndex[carouselId]) {
                        dot.className = 'rounded-full bg-white transition-all duration-300 w-2 h-2';
                    } else {
                        dot.className = 'rounded-full bg-white transition-all duration-300 w-1 h-1';
                    }
                });
            }

            if (currentIndex[carouselId] > 0) {
                currentIndex[carouselId]--;
                updateCarousel();

                if (currentIndex[carouselId] === 0) {
                    event.target.classList.add('hidden');
                }
            }
        });
    });
}