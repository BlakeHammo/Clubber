const vueinst = Vue.createApp({
    data() {
        return {
            notifications_enabled: false,
            clubs: [],
            hamburgerVisible: true,
            club_filter_value: "",
            tag_filter_value: "",
            clubs_obtained: false,
            numberOfClubsDisplaying: 0
        };
    },
    methods: {
        updateNotification(club_id) {
            let notification_setting = -1;

            if (club_id !== -1) {
                const post_setting = document.querySelector(`#a${club_id} .post-setting input`);
                const event_setting = document.querySelector(`#a${club_id} .event-setting input`);

                notification_setting = 0;

                if (post_setting.checked && !event_setting.checked) {
                    notification_setting = 1;
                } else if (!post_setting.checked && event_setting.checked) {
                    notification_setting = 2;
                } else if (post_setting.checked && event_setting.checked) {
                    notification_setting = 3;
                }
            } else if (vueinst.notifications_enabled) {
                return;
            } else {
                vueinst.clubs = vueinst.clubs.map((v) => ({ ...v, post_enabled: false, event_enabled: false}));
            }

            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    /* */
                }
            };
            req.open('POST',`/users/notifications/update?club_id=${club_id}&notification_setting=${notification_setting}`);
            req.send();
        }
    },
    mounted() {
        function setNotificationValue(club) {
            if (Number(club.notification_setting) == 1) {
                club.post_enabled = true;
                club.event_enabled = false;
                vueinst.notifications_enabled = true;
            } else if (Number(club.notification_setting) == 2) {
                club.post_enabled = false;
                club.event_enabled = true;
                vueinst.notifications_enabled = true;
            } else if (Number(club.notification_setting) == 3) {
                club.post_enabled = true;
                club.event_enabled = true;
                vueinst.notifications_enabled = true;
            } else {
                club.post_enabled = false;
                club.event_enabled = false;
            }
        }

        let req = new XMLHttpRequest();

        req.onreadystatechange = function(){
            if(req.readyState === 4 && req.status === 200){
                let clubs_initial = JSON.parse(req.responseText);
                vueinst.numberOfClubsDisplaying = JSON.parse(req.responseText).length;

                clubs_initial.forEach(setNotificationValue);

                vueinst.clubs = clubs_initial;
            }
        };
        req.open('GET',`/users/notifications`);
        req.send();
    }
}).mount("#app");

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

updateNotificationBadge();

// Marks the current link page as active
document.getElementById("notifications-nav").className = "current-page";

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

hamburger.addEventListener("click", toggleMenuOn, false);
exit.addEventListener("click", toggleMenuOff, false);
