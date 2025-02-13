import { fetchData } from './apiCalls.js';


function getQueryParamByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', (event) => {
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
            document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
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
    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
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
            if (table1.querySelector('.datepicker__month-day--today')) {
                const tdElements = table1.querySelectorAll('td');
                // Iterate through each <td> element
                tdElements.forEach(td => {
                    // Check if the text content is "1"
                    if (Number(td.textContent.trim()) === (Number(table1.querySelector('.datepicker__month-day--today').textContent)+1)) {
                        td.classList.add('datepicker__month-day--first-day-selected');
                    }
                });
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

            if (table1.querySelector('.datepicker__month-day--today')) {
                const tdElements = table1.querySelectorAll('td');
                // Iterate through each <td> element
                tdElements.forEach(td => {
                    if (Number(td.textContent.trim()) === (Number(table1.querySelector('.datepicker__month-day--today').textContent)+2)) {
                        td.classList.add('datepicker__month-day--last-day-selected');
                    }
                });
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
    initialMaxPrice = 0
    priceRangeLow = 0
    priceRangeHigh = 0
    fetchData(searchValue, "", date, guestNumber, 0, initialMaxPrice)
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