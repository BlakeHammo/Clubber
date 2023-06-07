const vueinst = new Vue({
    el: '#app',
    data: {
        username: 'Username',
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        image: '/images/icon.png',
        edit_profile: false,
        profile_page: true
    },
    methods: {
        editProfile() {
            let request = {
                username: this.username,
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                phone_number: this.phone
            };

            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    /* */
                }
            };
            req.open('POST','/users/profile/edit');
            req.setRequestHeader('Content-Type','application/json');
            req.send(JSON.stringify(request));
        },
        fetchProfileData() {
            let req = new XMLHttpRequest();

            req.onreadystatechange = function() {
                if(req.readyState === 4 && req.status === 200){
                    const response = JSON.parse(req.responseText);
                    if (response.length > 0) {
                        const userData = response[0];
                        this.username = userData.username;
                        this.first_name = userData.first_name;
                        this.last_name = userData.last_name;
                        this.email = userData.email;
                        this.phone = userData.phone;
                    }
                }
            }.bind(this);

            req.open('GET', '/users/profile', true);
            req.send();

        }
    },
    mounted: function() {
        this.fetchProfileData();
    }
});

// In menu shows number of unread posts
let unreadPosts = 100;

function updateNotificationBadge() {
    const notificationBadge = document.querySelector("#notifications");
    notificationBadge.innerText = unreadPosts < 100 ? unreadPosts : "99+";
}
if (window.location.pathname !== "/index.html" && window.location.pathname !== "/") {
    updateNotificationBadge();
}

// Marks the current link page as active
if (window.location.pathname === "/clubs.html") {
    document.getElementById("clubs-nav").className = "current-page";
} else if (window.location.pathname === "/feed.html") {
    document.getElementById("feed-nav").className = "current-page";
} else if (window.location.pathname === "/events.html") {
    document.getElementById("events-nav").className = "current-page";
} else if (window.location.pathname === "/profile.html") {
    document.getElementById("profile-nav").className = "current-page";
} else if (window.location.pathname === "/notifications.html") {
    document.getElementById("notifications-nav").className = "current-page";
} else if (window.location.pathname === "/manage-users.html") {
    document.getElementById("manage-users-nav").className = "current-page";
} else if (window.location.pathname === "/manage-clubs.html") {
    document.getElementById("manage-clubs-nav").className = "current-page";
}

// Hamburger Menu Behaviour

const hamburger = document.querySelector("#hamburger");
const exit = document.querySelector("#exit-menu");
const menu = document.querySelector("#popout-menu");

function toggleMenuOn() {
    hamburger.style.display = "none";
    exit.style.display = "inline";
    menu.style.display = "flex";
    document.body.classList.add("stop-scrolling");
}

function toggleMenuOff() {
    menu.style.display = "none";
    exit.style.display = "none";
    hamburger.style.display = "inline";
    document.body.classList.remove("stop-scrolling");
}

if (window.location.pathname !== "/index.html" && window.location.pathname !== "/") {
    hamburger.addEventListener("click", toggleMenuOn, false);
    exit.addEventListener("click", toggleMenuOff, false);
}