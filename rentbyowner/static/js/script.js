class Property {
    constructor(property) {
        console.log(property);
        this.property = property;
    }
    
    // render () {
    //     // Create the main container div
    //     const tile = document.createElement('div');
    //     tile.className = 'max-w-md bg-white rounded-lg overflow-hidden shadow-lg hidden';

    //     // Create the relative div
    //     const relativeDiv = document.createElement('div');
    //     relativeDiv.className = 'relative';

    //     // Create the image element
    //     const img = document.createElement('img');
    //     img.src = property.FeatureImage;
    //     img.alt = '';
    //     img.className = 'w-full h-64 object-cover';
    //     relativeDiv.appendChild(img);

    //     // Create the absolute top buttons container
    //     const topButtonsDiv = document.createElement('div');
    //     topButtonsDiv.className = 'absolute top-4 right-4 flex gap-2';

    //     // Create the button
    //     const button = document.createElement('button');
    //     button.className = 'relative pt-[5px] pb-[1px] px-2 rounded-full overflow-hidden';

    //     // Create the heart icon
    //     const heartIcon = document.createElement('i');
    //     heartIcon.className = 'ph ph-heart text-white text-xl z-50 relative';
    //     button.appendChild(heartIcon);

    //     // Create the overlay div
    //     const overlayDiv = document.createElement('div');
    //     overlayDiv.className = 'bg-black opacity-20 absolute w-full h-full top-0 left-0';
    //     button.appendChild(overlayDiv);

    //     topButtonsDiv.appendChild(button);
    //     relativeDiv.appendChild(topButtonsDiv);

    //     // Create the bottom info container
    //     const bottomInfoDiv = document.createElement('div');
    //     bottomInfoDiv.className = 'absolute bottom-2 left-2 bg-[#f5f5f5] px-2 py-[2px] pb-0 rounded-[5px] flex items-center justify-center';

    //     // Create the span for info text
    //     const infoSpan = document.createElement('span');
    //     infoSpan.className = 'text-[15px] font-medium';
    //     bottomInfoDiv.appendChild(infoSpan);

    //     // Create the info icon
    //     const infoIcon = document.createElement('i');
    //     infoIcon.className = 'ph ph-info ml-1 text-xl';
    //     bottomInfoDiv.appendChild(infoIcon);

    //     relativeDiv.appendChild(bottomInfoDiv);
    //     tile.appendChild(relativeDiv);

    //     // Create the content container
    //     const contentDiv = document.createElement('div');
    //     contentDiv.className = 'px-4 py-2 pb-3 flex flex-col gap-1';

    //     // Create the top content row
    //     const topContentDiv = document.createElement('div');
    //     topContentDiv.className = 'flex items-center justify-between';

    //     // Create the left content container
    //     const leftContentDiv = document.createElement('div');
    //     leftContentDiv.className = 'flex items-center justify-center';
    //     const leftInnerDiv = document.createElement('div');
    //     leftInnerDiv.className = 'flex items-center';

    //     // Create the blue text span
    //     const blueTextSpan = document.createElement('span');
    //     blueTextSpan.className = 'text-blue-700 font-medium';
    //     leftInnerDiv.appendChild(blueTextSpan);

    //     leftContentDiv.appendChild(leftInnerDiv);

    //     // Create the gray text span
    //     const grayTextSpan = document.createElement('span');
    //     grayTextSpan.className = 'text-gray-600 text-[12px] ml-2 font-semibold';
    //     leftContentDiv.appendChild(grayTextSpan);

    //     topContentDiv.appendChild(leftContentDiv);

    //     // Create the right text span
    //     const rightTextSpan = document.createElement('span');
    //     rightTextSpan.className = 'ml-auto text-[12px] text-gray-700';
    //     topContentDiv.appendChild(rightTextSpan);

    //     contentDiv.appendChild(topContentDiv);

    //     // Create the title
    //     const title = document.createElement('h2');
    //     title.className = 'text-md font-semibold text-gray-800 truncate';
    //     contentDiv.appendChild(title);

    //     // Create the tags container
    //     const tagsDiv = document.createElement('div');
    //     tagsDiv.className = 'flex flex-wrap gap-2 text-[12px] text-gray-800';
    //     const tagsSpan = document.createElement('span');
    //     tagsSpan.className = 'flex items-center';
    //     tagsDiv.appendChild(tagsSpan);
    //     contentDiv.appendChild(tagsDiv);

    //     // Create the location text
    //     const locationText = document.createElement('div');
    //     locationText.className = 'text-[12px] text-blue-700';
    //     locationText.textContent = 'Big Bear Lake > Lake Arrowhead';
    //     contentDiv.appendChild(locationText);

    //     // Create the bottom content row
    //     const bottomContentDiv = document.createElement('div');
    //     bottomContentDiv.className = 'flex justify-between items-center gap-2';

    //     // Create the logo
    //     const logo = document.createElement('h1');
    //     logo.textContent = 'Logo';
    //     bottomContentDiv.appendChild(logo);

    //     // Create the view availability button
    //     const viewButton = document.createElement('button');
    //     viewButton.className = 'text-md max-w-[250px] w-full font-semibold bg-emerald-500 text-white py-2 rounded font-medium hover:bg-emerald-600 transition-colors';
    //     viewButton.textContent = 'View Availability';
    //     bottomContentDiv.appendChild(viewButton);

    //     contentDiv.appendChild(bottomContentDiv);
    //     tile.appendChild(contentDiv);
    //     document.getElementById('tiles').appendChild(tile);
    // }
}

const dataProperty = JSON.parse(window.properties)

for (let i = 0; i < window.properties.length; i++) {
    const tile = new Property(dataProperty[0]);
    // tile.render()
}
