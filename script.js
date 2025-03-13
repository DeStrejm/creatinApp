function powiadomienie() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Hello! 🎉", {
                    body: "To jest testowe powiadomienie!",
                    icon: "icon.png"
                });
            }
        });
    }
}
