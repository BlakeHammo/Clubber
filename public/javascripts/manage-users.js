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
document.getElementById("manage-users-nav").className = "current-page";

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

hamburger.addEventListener("click", toggleMenuOn, false);
exit.addEventListener("click", toggleMenuOff, false);

// To reveal the back to top button
function revealBackToTop() {
    const backButton = document.querySelector("#back-to-top");
    if (window.scrollY > 1000) {
        backButton.style.display = "unset";
    } else {
        backButton.style.display = "none";
    }
}

document.addEventListener("scroll", revealBackToTop, false);

// In menu shows number of unread posts
function updateNotificationBadge() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            const notificationBadge = document.querySelector("#notifications");
            notificationBadge.innerText = req.responseText;
        }
    };
    req.open('GET',`/posts/unread`);
    req.send();
}

//logout AJAX function called when user clicks logout button (implemented in the nav.js folder for feed.html)
function logout()
{

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if(xhttp.readyState === 4 && xhttp.status === 200)
        {
            alert('Logged Out');
            console.log("logged out");
        } else if(xhttp.readyState === 4 && xhttp.status === 403)
        {
            alert('Not logged in');
        }
    };
    xhttp.open('POST','/logout');
    xhttp.send();
}

updateNotificationBadge();
