let isClicked = localStorage.getItem("isClicked") === "true"; // Odczytujemy stan z localStorage
const notificationStatus = document.getElementById("notificationStatus");
const takeCreatineBtn = document.getElementById("takeCreatineBtn");
const resetBtn = document.getElementById("resetBtn");

// Funkcja do obsługi powiadomienia
function powiadomienie() {
    if (!isClicked) {
        isClicked = true;

        // Zapisujemy stan w localStorage
        localStorage.setItem("isClicked", "true");

        // Sprawdzamy, czy dostępne są powiadomienia w przeglądarce
        if ("Notification" in window) {
            // Żądanie zgody na wyświetlanie powiadomień (tylko jeśli nie zostało wcześniej udzielone)
            if (Notification.permission === "default") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification("Czas na kreatynę! 💪", {
                            body: "Pamiętaj, aby wziąć kreatynę!",
                            icon: "/creatinApp/icon-180.png" // Upewnij się, że ścieżka do ikony jest poprawna
                        });
                    }
                });
            } else if (Notification.permission === "granted") {
                // Jeśli zgoda już została udzielona, natychmiast wysyłamy powiadomienie
                new Notification("Czas na kreatynę! 💪", {
                    body: "Pamiętaj, aby wziąć kreatynę!",
                    icon: "/creatinApp/icon-180.png"
                });
            }
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

// Funkcja do resetowania przycisku
function resetPrzycisk() {
    isClicked = false;  // Resetujemy flagę
    localStorage.setItem("isClicked", "false");  // Zapisujemy stan w localStorage

    notificationStatus.style.display = "none";  // Ukrywamy status powiadomienia
    takeCreatineBtn.disabled = false;  // Przywracamy aktywność przycisku
    takeCreatineBtn.style.backgroundColor = "#4CAF50"; // Przywracamy domyślny kolor
    
    // Ukrywamy przycisk resetowania
    resetBtn.style.display = "none";
}

// Sprawdzamy stan przycisku po załadowaniu strony
if (isClicked) {
    notificationStatus.innerText = "Przypomnienie ustawione na dzisiaj!";
    notificationStatus.style.display = "block";
    takeCreatineBtn.disabled = true;
    takeCreatineBtn.style.backgroundColor = "#ccc"; // Zmieniamy kolor przycisku
    resetBtn.style.display = "block";
} else {
    // Jeżeli aplikacja jest uruchamiana po raz pierwszy lub po zresetowaniu stanu
    notificationStatus.style.display = "none"; 
    takeCreatineBtn.disabled = false;
    takeCreatineBtn.style.backgroundColor = "#4CAF50";
    resetBtn.style.display = "none";
}

// Funkcja, która wywołuje powiadomienia o 14:45
function setReminderFor14_45() {
    const now = new Date();
    const targetHour = 14;
    const targetMinute = 45;
    
    let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, 0, 0);
    
    // Jeśli już minęło 14:45, ustawiamy przypomnienie na następny dzień
    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeUntilReminder = targetTime - now;  // Obliczanie czasu do powiadomienia

    setTimeout(() => {
        powiadomienie(); // Wywołanie funkcji powiadomienia o 14:45
    }, timeUntilReminder); // Ustawiamy timeout na czas do 14:45
}

// Uruchamiamy przypomnienie
setReminderFor14_45();
