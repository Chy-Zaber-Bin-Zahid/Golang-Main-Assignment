import { Property } from './property.js';
import { CarouselController } from './carousel.js';
import { shimmerFunc } from './shimmer.js';
import { initializeHeartButtons } from './heart.js';

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
        const limitedIds = itemIds.length > 64 ? itemIds.slice(0, 64) : itemIds;
        const queryString = limitedIds.join(',');
        console.log(queryString)
        const responseThirdApi = await fetch(`/api/v1/itemIds/${queryString}`);
        if (!responseThirdApi.ok) {
            throw new Error('Network responseThirdApi was not ok ' + responseThirdApi.statusText);
        }
        const propertyData = await responseThirdApi.json();
        let num1 = 0;
        let num2 = 0;
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
        const errorMessageElement = document.getElementById('error-message');
        if (errorMessageElement) {
            errorMessageElement.remove();
        }
        initializeHeartButtons()
        const carousel = new CarouselController();
        carousel.init();
    } catch (error) {
        if (error.message.includes('500')) {
            console.log(error)
            showErrorMessage(error);
        } else {
            console.log(error)
            showErrorMessage(error);
        }
    }
}

function showErrorMessage(message) {
    // Create the HTML string with the error message and styles
    if (document.getElementById('error-message')) {
        document.getElementById('error-message').remove();
    }
    const errorHTML = `
        <div class="error-message" style="background-color: #f8d7da; color: #721c24; 
            border: 1px solid #f5c6cb; border-radius: 5px; padding: 20px; text-align: center; 
            margin-top: 20px; font-size: 16px; display: flex; align-items: center; justify-content: space-between;">
            <span style="flex: 1;">Oops! Something Went Wrong!</span>
        </div>
    `;
    // Add the error message to the body or a specific container
    document.getElementById('shimmer').classList.add('hidden');
    const div = document.createElement('div');
    div.id = 'error-message';
    div.innerHTML = errorHTML;
    document.body.appendChild(div);
}

export { fetchData, showErrorMessage };
