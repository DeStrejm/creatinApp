let isClicked = localStorage.getItem("isClicked") === "true"; // Odczytujemy stan z localStorage
const notificationStatus = document.getElementById("notificationStatus");
const takeCreatineBtn = document.getElementById("takeCreatineBtn");
const resetBtn = document.getElementById("resetBtn");

// Funkcja do wysyłania powiadomienia
function wyslijPowiadomienie(title, body) {
    if ("Notification" in window) {
        // Jeśli zgoda na powiadomienia nie została jeszcze udzielona
        if (Notification.permission === "default") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(title, {
                        body: body,
                        icon: "/creatinApp/icon-180.png" // Upewnij się, że ścieżka do ikony jest poprawna
                    });
                }
            });
        } else if (Notification.permission === "granted") {
            // Jeśli zgoda została już udzielona, natychmiast wysyłamy powiadomienie
            new Notification(title, {
                body: body,
                icon: "/creatinApp/icon-180.png"
            });
        }
    }
}

// Funkcja do wysyłania powiadomienia po kliknięciu przycisku
function powiadomieniePoKliknieciu() {
    // Sprawdzamy, czy powiadomienie zostało już wysłane
    if (!isClicked) {
        wyslijPowiadomienie("Powiadomienia zostały włączone", "Pamiętaj, aby wziąć kreatynę! 💪");
        localStorage.setItem("isClicked", "true"); // Zapisujemy stan, że przycisk został kliknięty
        isClicked = true;  // Ustawiamy flagę na kliknięte
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

// Zapytanie o zgodę na powiadomienia po załadowaniu strony
if (Notification.permission === "default") {
    // Zapytanie o zgodę na powiadomienia natychmiast po załadowaniu aplikacji
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("Zgoda na powiadomienia została udzielona.");
        } else {
            console.log("Zgoda na powiadomienia została odrzucona.");
        }
    });
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

// Funkcja, która wywołuje powiadomienia o 15:00
function setReminderFor15_00() {
    const now = new Date();
    const targetHour = 15;
    const targetMinute = 0;
    
    let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, 0, 0);
    
    // Jeśli już minęło 15:00, ustawiamy przypomnienie na następny dzień
    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeUntilReminder = targetTime - now;  // Obliczanie czasu do powiadomienia

    setTimeout(() => {
        wyslijPowiadomienie("Czas na kreatynę! 💪", "Pamiętaj, aby wziąć kreatynę!"); // Wywołanie funkcji powiadomienia o 15:00
    }, timeUntilReminder); // Ustawiamy timeout na czas do 15:00
}

// Uruchamiamy przypomnienie
setReminderFor15_00();

// Podpinamy funkcję do kliknięcia przycisku
takeCreatineBtn.addEventListener("click", powiadomieniePoKliknieciu);
