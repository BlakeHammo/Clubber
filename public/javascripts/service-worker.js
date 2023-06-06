self.addEventListener("push", (e) => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
        body: data.main_content,
        icon: "/public/images/icon.png"
    });
});
