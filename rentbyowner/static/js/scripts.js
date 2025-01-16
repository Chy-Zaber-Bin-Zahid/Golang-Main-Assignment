class Property {
    constructor(property) {
        this.property = property.Property;
        this.id = property.ID;
    }
    
    render () {
        // Create the main container div
        const tile = document.createElement('div');
        tile.className = 'w-full bg-white rounded-lg overflow-hidden shadow-lg';

        // Create the relative div
        const relativeDiv = document.createElement('div');
        relativeDiv.className = 'relative';

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
        heartIcon.className = 'ph ph-heart-straight text-white text-2xl z-10 relative';
        heartIcon.id = this.id
        button.appendChild(heartIcon);

        // Create the overlay div
        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'bg-black opacity-20 absolute w-full h-full top-0 left-0';
        button.appendChild(overlayDiv);

        topButtonsDiv.appendChild(button);
        relativeDiv.appendChild(topButtonsDiv);

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
        tile.appendChild(relativeDiv);

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
    if (localStorage.getItem('date')) {
        const [startDate, endDate] = localStorage.getItem('date').split('|');
        const start = new Date(startDate);
        const end = new Date(endDate);
        const options = { month: 'short', day: 'numeric' };
        const formattedStart = start.toLocaleDateString('en-US', options);
        const formattedEnd = end.toLocaleDateString('en-US', options);
        document.getElementById('dates-p').textContent = `${formattedStart} - ${formattedEnd}`
        document.getElementById('dates-cross').classList.remove('hidden')   
    }
    fetchData(searchValue);
});

async function fetchData(searchValue, selectedValue = "", dates = "") {
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
        const dateLocalCheck = localStorage.getItem('date')
        if (dates.length > 0 || dateLocalCheck) {
            if (dateLocalCheck) {
                dates = dateLocalCheck
            }
            responseSecondApi = await fetch(`/api/v1/locationSlug/${locations}|${dates}`);
        } else {
            responseSecondApi = await fetch(`/api/v1/locationSlug/${locations}`);
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
    fetchData(searchValue, selectElement.value, date)
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

const months = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}
const firstDaySelectedDefault = table1.querySelector('.datepicker__month-day--first-day-selected')
const firstDayMonthDefault = firstDaySelectedDefault.ariaLabel.split(',')[1].trim().slice(0, 3);
const firstDayYearDefault = firstDaySelectedDefault.ariaLabel.split(',')[2].trim().slice(0, 4);
const firstDayIndexDefault = firstDaySelectedDefault.textContent
const lastDaySelectedDefault = table1.querySelector('.datepicker__month-day--last-day-selected')
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
        const searchValue = getQueryParamByName('search');
        console.log(lastDayMonth)
        date = `${firstDayYear}-0${months[firstDayMonth]}-${firstDayIndex.length < 2 ? `0${firstDayIndex}` : firstDayIndex}|${lastDayYear}-0${months[lastDayMonth]}-${lastDayIndex.length < 2 ? `0${lastDayIndex}` : lastDayIndex}`
        localStorage.setItem('date', date)
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
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
    localStorage.removeItem('date')
    fetchData(searchValue, "", date)
})