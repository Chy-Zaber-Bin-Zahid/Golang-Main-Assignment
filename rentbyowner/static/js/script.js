class Property {
    constructor(property) {
        this.property = property;
    }
    
    render () {
        // Create the main container div
        const tile = document.createElement('div');
        tile.className = 'max-w-md bg-white rounded-lg overflow-hidden shadow-lg';

        // Create the relative div
        const relativeDiv = document.createElement('div');
        relativeDiv.className = 'relative';

        // Create the image element
        const img = document.createElement('img');
        img.src = `https://imgservice.rentbyowner.com/640x417/${this.property.FeatureImage}`;
        img.alt = this.property.FeatureImage;
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
        heartIcon.className = 'ph ph-heart-straight text-white text-2xl z-50 relative';
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
    mainDiv.className = 'max-w-md bg-white rounded-lg overflow-hidden shadow-lg flex flex-col';

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
    buttons.forEach((button, index) => {
        const isRed = localStorage.getItem(`heart-${index}`) === 'true';
        if (isRed) {
            button.classList.remove('ph', 'text-white');
            button.classList.add('ph-fill', 'text-red-500');
        } else {
            button.classList.remove('ph-fill', 'text-red-500');
            button.classList.add('ph', 'text-white');
        }
        button.addEventListener('click', () => {
            const exist = localStorage.getItem(`heart-${index}`) === 'true' ? true : false;
            if (exist) {
                if (exist) {
                    button.classList.add('ph', 'text-white');
                    button.classList.remove('ph-fill', 'text-red-500');
                    localStorage.setItem(`heart-${index}`, 'false');
                } else {
                    button.classList.remove('ph', 'text-white');
                    button.classList.add('ph-fill', 'text-red-500');
                    localStorage.setItem(`heart-${index}`, 'true');
                }
            } else {
                button.classList.remove('ph', 'text-white');
                button.classList.add('ph-fill', 'text-red-500');
                localStorage.setItem(`heart-${index}`, 'true');
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

// const dataProperty = JSON.parse(window.properties)


function getQueryParamByName(name) {
    // Get the URLSearchParams object from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get the value of the specified query parameter
    return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', (event) => {
    shimmerFunc()
    const searchValue = getQueryParamByName('search');
    fetchData(searchValue);
});

async function fetchData(searchValue) {
    try {
        const responseFirstApi = await fetch(`/api/v1/keyword/${searchValue}`);
        if (!responseFirstApi.ok) {
            throw new Error('Network responseFirstApi was not ok ' + responseFirstApi.statusText);
        }
        const locations = await responseFirstApi.json();
        const responseSecondApi = await fetch(`/api/v1/locationSlug/${locations}`);
        if (!responseSecondApi.ok) {
            throw new Error('Network responseSecondApi was not ok ' + responseSecondApi.statusText);
        }
        const itemIds = await responseSecondApi.json();
        const queryString = itemIds.join(',');
        const responseThirdApi = await fetch(`/api/v1/itemIds/${queryString}`);
        if (!responseThirdApi.ok) {
            throw new Error('Network responseThirdApi was not ok ' + responseThirdApi.statusText);
        }
        const propertyData = await responseThirdApi.json();
        for (let i = 0; i < propertyData.length; i++) {
            const tile = new Property(propertyData[i].Property);
            tile.render()
        }
        initializeHeartButtons()
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}