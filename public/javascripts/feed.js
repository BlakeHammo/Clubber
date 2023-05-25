const vueinst = Vue.createApp({
    data() {
        return {
            userFollowedClubs: [],
            hamburgerVisible: true,
            numberOfPostsDisplaying: 1,
            posts: [],
            unreadPostMessage: "Mark as read",
            unreadPostImage: "./images/unread.svg",
            unreadPostHoverImage: "./images/mark_as_read.svg",
            tag_filter_value: "",
            club_filter_value: "",
            clubs_obtained: false
        };
    },
    methods: {
        getPosts() {
            const requestData = {
                club_id: this.club_filter_value,
                tag: this.tag_filter_value,
                event_type: ""
            };

            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    vueinst.posts = JSON.parse(req.responseText);
                    vueinst.numberOfPostsDisplaying = JSON.parse(req.responseText).length;

                    if (!vueinst.clubs_obtained) {
                        const map = new Map();

                        let clubsOfPosts = JSON.parse(req.responseText).filter((club) => {
                            if (map.get(club.club_id)) {
                            return false;
                            }
                            map.set(club.club_id, club);
                            return true;
                        });

                        vueinst.userFollowedClubs = clubsOfPosts.map((item) => {
                            let club = item;
                            return { id: club.club_id, name: club.club_name };
                        });
                        vueinst.clubs_obtained = true;
                    }
                }
            };
            req.open('POST','/posts');
            req.setRequestHeader('Content-Type','application/json');
            req.send(JSON.stringify(requestData));
        },
        filter() {
            this.getPosts(this.tag_filter_value, this.club_filter_value, -1);
        },
        rsvp(id, rsvp_number) {
            if (vueinst.posts[vueinst.posts.findIndex((x) => x.id === id)].rsvp === rsvp_number) {
                return;
            }

            vueinst.posts[vueinst.posts.findIndex((x) => x.id === id)].rsvp = rsvp_number;

            const requestData = {
                post_id: id,
                rsvp: rsvp_number,
                date_responded: new Date()
            };

            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    /* */
                }
            };
            req.open('POST','/users/posts/rsvp');
            req.setRequestHeader('Content-Type','application/json');
            req.send(JSON.stringify(requestData));
        },
        markPostAsRead(id) {
            if (vueinst.posts[vueinst.posts.findIndex((x) => x.id === id)].Post_viewed === 1) {
                return;
            }
            vueinst.posts[vueinst.posts.findIndex((x) => x.id === id)].Post_viewed = 1;

            const requestData = {
                post_id: id
            };

            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    /* */
                }
            };
            req.open('POST','/users/posts/mark-as-read');
            req.setRequestHeader('Content-Type','application/json');
            req.send(JSON.stringify(requestData));
        }
    },
    mounted() {
        this.getPosts("", "", "");
    }
}).mount("#app");

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
