document.getElementById('takeCreatineBtn').addEventListener('click', function() {
    document.getElementById('reminderStatus').innerText = 'Wzięto kreatynę! 🏋️‍♂️';

    // Zapisujemy informację w lokalnym storage (możesz to rozbudować)
    localStorage.setItem('creatineTaken', 'true');
    
    // Zamykamy powiadomienie o przypomnieniu
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Kreatyna wzięta! 🎉", {
                    body: "Dziękujemy za regularność! 😎",
                    icon: "icon.png"
                });
            }
        });
    }
});

if (localStorage.getItem('creatineTaken') === 'true') {
    document.getElementById('reminderStatus').innerText = 'Kreatyna już wzięta dzisiaj!';
}
