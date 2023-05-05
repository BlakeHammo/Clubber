const vueinst = Vue.createApp({
    data() {
        return {
            userFollowedClubs: [],
            hamburgerVisible: true,
            posts: [],
            numberOfPostsDisplaying: 0,
            unreadPostMessage: "Mark as read",
            unreadPostImage: "./images/unread.svg",
            unreadPostHoverImage: "./images/mark_as_read.svg",
            tag_filter_value: "",
            club_filter_value: ""
        };
    },
    methods: {
        updateNumberOfPostsDisplaying() {
            this.numberOfPostsDisplaying = this.posts.length;
        },
        getPosts() {
            // Ajax call
            this.posts = posts.filter((post) => post.tag === "event");
            // Formats the data correctly
            this.posts = this.posts.map((v) => ({ ...v, isExpanded: false, isHovered: false, userRead: false }));

            this.posts = this.posts.map((item) => {
                let post = item;

                post.creationDate = new Date(post.creationDate).toLocaleString();
                post.eventDate = new Date(post.eventDate).toLocaleString();

                return post;
            });
            this.numberOfPostsDisplaying = this.posts.length;
        },
        filter() {
            if (this.tag_filter_value === "" && this.club_filter_value !== "") {
                this.getPosts();
                this.posts = this.posts.filter((post) => post.clubId === vueinst.club_filter_value);
                this.updateNumberOfPostsDisplaying();
            } else if (this.club_filter_value === "" && this.tag_filter_value !== "") {
                this.getPosts();
                this.posts = this.posts.filter((post) => post.type === this.tag_filter_value);
                this.updateNumberOfPostsDisplaying();
            } else if (this.tag_filter_value !== "" && this.club_filter_value !== "") {
                this.getPosts();
                this.posts = this.posts.filter((post) => post.clubId === this.club_filter_value && post.type === this.tag_filter_value);
                this.updateNumberOfPostsDisplaying();
            } else {
                this.getPosts();
                this.getPosts();
                this.updateNumberOfPostsDisplaying();
            }
        }
    },
    mounted() {
        this.getPosts();
        this.updateNumberOfPostsDisplaying();

        const map = new Map();

        let clubsOfPosts = this.posts.filter((club) => {
            if (map.get(club.clubId)) {
            return false;
            }
            map.set(club.clubId, club);
            return true;
        });

        this.userFollowedClubs = clubsOfPosts.map((item) => {
            let club = item;
            return { id: club.clubId, name: club.clubName };
        });
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
