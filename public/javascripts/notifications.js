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

    },
    mounted() {
        let req = new XMLHttpRequest();

        req.onreadystatechange = function(){
            if(req.readyState === 4 && req.status === 200){
                vueinst.clubs = JSON.parse(req.responseText);
                vueinst.numberOfClubsDisplaying = JSON.parse(req.responseText).length;
            }
        };
        req.open('GET',`/clubs?tag=&club=`);
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

hamburger.addEventListener("click", toggleMenuOn, false);
exit.addEventListener("click", toggleMenuOff, false);
