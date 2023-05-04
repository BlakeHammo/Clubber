// Only events that have not been responded to or are going/maybe for
let postArray = posts.filter((post) => post.tag === "event");

const map = new Map();

let clubsOfPosts = postArray.filter((club) => {
    if (map.get(club.clubId)) {
       return false;
    }
    map.set(club.clubId, club);
    return true;
 });

clubsOfPosts = clubsOfPosts.map((item) => {
    let club = item;
    return { id: club.clubId, name: club.clubName };
});

// Formats the data correctly
postArray = postArray.map((v) => ({ ...v, isExpanded: false, isHovered: false, userRead: false }));

postArray = postArray.map((item) => {
    let post = item;

    post.creationDate = new Date(post.creationDate).toLocaleString();
    post.eventDate = new Date(post.eventDate).toLocaleString();

    return post;
});

const vueinst = Vue.createApp({
    data() {
        return {
            userFollowedClubs: clubsOfPosts,
            hamburgerVisible: true,
            posts: postArray,
            numberOfPostsDisplaying: 0,
            unreadPostMessage: "Mark as read",
            unreadPostImage: "./images/unread.svg",
            unreadPostHoverImage: "./images/mark_as_read.svg",
            tag_filter_value: "",
            club_filter_value: ""
        };
    },
    computed: {
        updateNumberOfPostsDisplaying() {
            this.numberOfPostsDisplaying = vueinst.posts.length;
        }
    },
    methods: {
        filter() {
            if (vueinst.tag_filter_value === "" && vueinst.club_filter_value !== "") {
                vueinst.posts = postArray.filter((post) => post.clubId === vueinst.club_filter_value);
                this.updateNumberOfPostsDisplaying();
            } else if (vueinst.club_filter_value === "" && vueinst.tag_filter_value !== "") {
                vueinst.posts = postArray.filter((post) => post.eventType === vueinst.tag_filter_value);
                this.updateNumberOfPostsDisplaying();
            } else if (vueinst.tag_filter_value !== "" && vueinst.club_filter_value !== "") {
                vueinst.posts = postArray.filter((post) => post.clubId === vueinst.club_filter_value && post.eventType === vueinst.tag_filter_value);
                this.updateNumberOfPostsDisplaying();
            } else {
                vueinst.posts = postArray;
                this.updateNumberOfPostsDisplaying();
            }
        }
    },
    mounted() {
        this.numberOfPostsDisplaying = postArray.length;
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
