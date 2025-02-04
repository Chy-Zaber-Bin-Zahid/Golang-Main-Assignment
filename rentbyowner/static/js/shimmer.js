export class Shimmer {
    render() {
        const mainDiv = document.createElement('div');
        mainDiv.className = 'w-full bg-white rounded-lg overflow-hidden shadow-lg flex flex-col';
        mainDiv.innerHTML = `
            <div class="animate-pulse">
                <div class="w-full h-64 bg-gray-200"></div>
            </div>
            <div class="px-4 py-3 flex flex-col gap-3 flex-grow">
                <div class="flex-1 flex flex-col gap-3">
                    ${Array.from({ length: 3 }, () => `
                        <div class="w-full h-4 bg-gray-200 animate-pulse"></div>
                    `).join('')}
                </div>
                <div class="flex justify-between items-center gap-2 h-full flex-1">
                    <div></div>
                    <div class="max-w-[210px] w-full h-[50px] bg-gray-200 animate-pulse"></div>
                </div>
            </div>
        `;
        const shimmer = document.getElementById('shimmer');
        if (shimmer) {
            shimmer.appendChild(mainDiv);
        } else {
            console.warn("Element with ID 'shimmer' not found.");
        }
    }
}


function shimmerFunc() {
    for (let i = 0; i < 12; i++) {
        const shimmer = new Shimmer();
        shimmer.render()
    }
}

export { shimmerFunc };
