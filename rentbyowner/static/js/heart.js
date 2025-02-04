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

export { initializeHeartButtons };