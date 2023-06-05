const vueinst = new Vue({
    el: '#app',
    data: {
        clubs: clubs,
        selected_club: -1,
        delete_modal_visible: false,
        edit_modal_visible: false,
        add_modal_visible: false,
        edit_color: "",
        edit_name: "",
        edit_managers: [],
        edit_description: "",
        manager_dropdown_visible: false,
        new_manager: "",
        available_managers: [],
    },
    methods: {
        getClubManagers: function(clubId) {
            var club = clubs.find((c) => c.id === clubId);

            let clubManagers = "";
            for (let i in club.managers) {
                if (i === "0") {
                    clubManagers += club.managers[i].username;
                } else {
                    clubManagers += ", ";
                    clubManagers += club.managers[i].username;
                }
            }
            return clubManagers;
        },
        deleteClub: function() {
            clubs.splice(this.getSelectedClubIndex(), 1);
            this.clubs = clubs;

            this.selected_club = -1;
            this.delete_modal_visible = false;
        },
        showEditModal: function(clubId) {
            this.edit_modal_visible = true;
            this.selected_club = clubId;
            this.setEditValues();
        },
        editClub: function() {
            clubs[this.getSelectedClubIndex()].color = this.edit_color;
            clubs[this.getSelectedClubIndex()].name = this.edit_name;
            clubs[this.getSelectedClubIndex()].managers = JSON.parse(
                JSON.stringify(this.edit_managers)
            );
            clubs[this.getSelectedClubIndex()].description = this.edit_description;

            this.clubs = clubs;
            this.edit_modal_visible = false;
            this.selected_club = -1;
            this.resetEditValues();
        },
        setEditValues: function() {
            if (this.selected_club === -1) {
                this.resetEditValues();
            } else {
                this.edit_color = this.getSelectedClub().color;
                this.edit_name = this.getSelectedClub().name;
                this.edit_managers = JSON.parse(JSON.stringify(this.getSelectedClub().managers));
                this.new_manager = "";
                this.manager_dropdown_visible = false;
                this.available_managers = [];
                this.edit_description = this.getSelectedClub().description;
            }
        },
        getSelectedClubIndex: function() {
            return clubs.findIndex((club) => club.id === this.selected_club);
        },
        getSelectedClub: function() {
            return clubs[this.getSelectedClubIndex()];
        },
        removeManager: function(index) {
            this.edit_managers.splice(index, 1);
            this.updateAvailableManagers();
        },
        updateAvailableManagers: function() {
            let not_available_managers = [];
            for (let manager of this.edit_managers) {
                not_available_managers.push(manager.username);
            }

            this.available_managers = users.filter(
                (user) => user.role === "CLUB MANAGER" && !not_available_managers.includes(user.username)
            );
        },
        showManagerDropdownOrAddManager: function() {
            if (this.new_manager === "") {
                this.updateAvailableManagers();
                this.manager_dropdown_visible = true;
            } else {
                this.addManager();
            }
        },
        addManager: function() {
            let manager = users.find((user) => user.username === this.new_manager);
            this.edit_managers.push(manager);
            this.manager_dropdown_visible = false;
            this.new_manager = "";
        },
        resetEditValues: function() {
            this.edit_color = "#000000";
            this.edit_name = "";
            this.edit_managers = [];
            this.new_manager = "";
            this.manager_dropdown_visible = false;
            this.available_managers = [];
            this.edit_description = "";
        },
        showAddModal: function() {
            this.add_modal_visible = true;
            this.resetEditValues();
        },
        addClub: function() {
            let new_club = {
                id: clubs.length + 1,
                color: this.edit_color,
                name: this.edit_name,
                managers: JSON.parse(JSON.stringify(this.edit_managers)),
                description: this.edit_description
            };

            clubs.push(new_club);
            this.clubs = clubs;
            this.add_modal_visible = false;
            this.resetEditValues();
        }
    }
});

// Marks the current link page as active
document.getElementById("manage-clubs-nav").className = "current-page";

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
