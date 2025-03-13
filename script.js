let isClicked = false; // Flaga, czy przycisk został kliknięty
const notificationStatus = document.getElementById("notificationStatus");
const takeCreatineBtn = document.getElementById("takeCreatineBtn");
const resetBtn = document.getElementById("resetBtn");

// Funkcja do obsługi powiadomienia
function powiadomienie() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (!isClicked) {
        isClicked = true;

        // Sprawdzamy, czy dostępne są powiadomienia w przeglądarce
        if ("Notification" in window) {
            // Żądanie zgody na wyświetlanie powiadomień
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("Czas na kreatynę! 💪", {
                        body: "Pamiętaj, aby wziąć kreatynę!",
                        icon: "icon.png"
                    });
                }
            });
        }

        // Zmiana tekstu statusu przypomnienia
        notificationStatus.innerText = "Przypomnienie ustawione na dzisiaj!";
        notificationStatus.style.display = "block";

        // Wyłączenie przycisku po kliknięciu
        takeCreatineBtn.disabled = true;
        takeCreatineBtn.style.backgroundColor = "#ccc"; // Zmiana koloru przycisku po kliknięciu
        
        // Pokazanie przycisku resetowania
        resetBtn.style.display = "block";
    }
}

// Funkcja do resetowania przycisku codziennie o północy
function resetPrzycisk() {
    isClicked = false;  // Resetujemy flagę
    notificationStatus.style.display = "none";  // Ukrywamy status powiadomienia
    takeCreatineBtn.disabled = false;  // Przywracamy aktywność przycisku
    takeCreatineBtn.style.backgroundColor = "#4CAF50"; // Przywracamy domyślny kolor
    
    // Ukrywamy przycisk resetowania
    resetBtn.style.display = "none";
}
