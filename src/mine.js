document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop();
    const navButtons = document.querySelectorAll('.bottom-nav button');

    navButtons.forEach((button) => {
        const targetPage = button.getAttribute('data-page');
        if (currentPath === targetPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            window.location.href = targetPage;
        });
    });
});