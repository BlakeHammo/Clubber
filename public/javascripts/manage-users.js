const vueinst = new Vue({
    el: '#app',
    data: {
        users: users,
        selected_user: -1,
        delete_modal_visible: false,
        edit_modal_visible: false,
        edit_username: "",
        edit_first_name: "",
        edit_last_name: "",
        edit_email: "",
        edit_phone_number: "",
        edit_role: "",
        username_filter: "",
        user_role_filter: "all roles"
    },
    methods: {
        deleteUser: function() {
            users.splice(this.getSelectedUserIndex(), 1);
            this.users = users;
            this.filterUsers();

            this.selected_user = -1;
            this.delete_modal_visible = false;
        },
        showEditModal: function(userId) {
            this.edit_modal_visible = true;
            this.selected_user = userId;

            this.setEditValues();
        },
        setEditValues: function() {
            if (this.selected_user === -1) {
                this.edit_username = "";
                this.edit_first_name = "";
                this.edit_last_name = "";
                this.edit_email = "";
                this.edit_phone_number = "";
                this.edit_role = "";
            } else {
                this.edit_username = users[this.getSelectedUserIndex()].username;
                this.edit_first_name = users[this.getSelectedUserIndex()].firstName;
                this.edit_last_name = users[this.getSelectedUserIndex()].lastName;
                this.edit_email = users[this.getSelectedUserIndex()].email;
                this.edit_phone_number = users[this.getSelectedUserIndex()].phoneNumber;
                this.edit_role = users[this.getSelectedUserIndex()].role;
            }
        },
        editUser: function() {
            users[this.getSelectedUserIndex()].username = this.edit_username;
            users[this.getSelectedUserIndex()].firstName = this.edit_first_name;
            users[this.getSelectedUserIndex()].lastName = this.edit_last_name;
            users[this.getSelectedUserIndex()].email = this.edit_email;
            users[this.getSelectedUserIndex()].phoneNumber = this.edit_phone_number;
            users[this.getSelectedUserIndex()].role = this.edit_role;

            this.users = users;
            this.filterUsers();

            this.selected_user = -1;
            this.edit_modal_visible = false;
            this.setEditValues();
        },
        filterUsers: function() {
            this.users = users.filter((user) => user.username.includes(this.username_filter));
            if (this.user_role_filter !== "all roles") {
                this.users = this.users.filter((user) => user.role === this.user_role_filter);
            }
        },
        getSelectedUserIndex: function() {
            return users.findIndex((user) => user.id === this.selected_user);
        },
        getSelectedUser: function() {
            return users[this.getSelectedUserIndex()];
        }
    }
});

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

// To reveal the back to top button
function revealBackToTop() {
    const backButton = document.querySelector("#back-to-top");
    if (window.scrollY > 1000) {
        backButton.style.display = "unset";
    } else {
        backButton.style.display = "none";
    }
}

if (window.location.pathname === "/feed.html" || window.location.pathname === "/events.html" || window.location.pathname === "/clubs.html") {
    document.addEventListener("scroll", revealBackToTop, false);
}

// In menu shows number of unread posts
let unreadPosts = 100;

function updateNotificationBadge() {
    const notificationBadge = document.querySelector("#notifications");
    notificationBadge.innerText = unreadPosts < 100 ? unreadPosts : "99+";
}
if (window.location.pathname !== "/index.html" && window.location.pathname !== "/") {
    updateNotificationBadge();
}
