function initializeHeartButtons() {
    const buttons = document.querySelectorAll('.ph-heart-straight');
    buttons.forEach((button) => {
        const isRed = localStorage.getItem(`heart-${button.id}`) === 'true';
        if (isRed) {
            button.classList.remove('ph', 'heart-white');
            button.classList.add('ph-fill', 'heart-red');
        } else {
            button.classList.remove('ph-fill', 'heart-red');
            button.classList.add('ph', 'heart-white');
        }
        button.addEventListener('click', () => {
            const exist = localStorage.getItem(`heart-${button.id}`) === 'true' ? true : false;
            if (exist) {
                button.classList.add('ph', 'heart-white');
                button.classList.remove('ph-fill', 'heart-red');
                localStorage.setItem(`heart-${button.id}`, 'false');
            } else {
                button.classList.remove('ph', 'heart-white');
                button.classList.add('ph-fill', 'heart-red');
                localStorage.setItem(`heart-${button.id}`, 'true');
            }
        });
    });
}

export { initializeHeartButtons };