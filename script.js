document.addEventListener('DOMContentLoaded', function() {
    const takeCreatineButton = document.getElementById('takeCreatineButton');
    const resetButton = document.getElementById('resetButton');

    // Obsługa kliknięcia przycisku "Wziąłem kreatynę"
    takeCreatineButton.addEventListener('click', function() {
        takeCreatineButton.classList.add('active'); // Aktywuj "wciśnięty" stan
        resetButton.style.display = 'block'; // Pokaż przycisk do cofnęcia
    });

    // Obsługa kliknięcia przycisku "Cofnij"
    resetButton.addEventListener('click', function() {
        takeCreatineButton.classList.remove('active'); // Cofnij stan "wciśnięty"
        resetButton.style.display = 'none'; // Ukryj przycisk "Cofnij"
    });
});
