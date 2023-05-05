// The following are to be obtained from the server

let clubsArray = clubs.map((v) => ({ ...v, isExpanded: false, userFollows: true }));

function uniqueClubTags(tag, index, array) {
    return array.indexOf(tag) === index;
}

let clubTagsArray = clubsArray.map((item) => {
    let club = item;
    return club.tag;
});

clubTagsArray = clubTagsArray.filter(uniqueClubTags);

// Posts and events
let postArray = posts;

// Formats the data correctly
postArray = postArray.map((v) => ({ ...v, isExpanded: false, isHovered: false, userRead: false }));

postArray = postArray.map((item) => {
    let post = item;

    post.creationDate = new Date(post.creationDate).toLocaleString();
    if (post.tag === 'event') {
        post.eventDate = new Date(post.eventDate).toLocaleString();
    }

    return post;
});


const vueinst = Vue.createApp({
    data() {
        return {
            numberOfClubsDisplaying: 0,
            clubs: clubsArray,
            clubTags: clubTagsArray,
            tag_filter_value: "",
            club_filter_value: -1,
            viewing_club: -1,
            club_color: "",
            hamburgerVisible: true,
            numberOfPostsDisplaying: 0,
            posts: postArray,
            unreadPostMessage: "Mark as read",
            unreadPostImage: "./images/unread.svg",
            unreadPostHoverImage: "./images/mark_as_read.svg",
            post_tag_filter_value: "",
            show_post_creation: true,
            post_creation_type: ""
        };
    },
    computed: {
        updateNumberOfClubsDisplaying() {
            this.numberOfClubsDisplaying = vueinst.clubs.length;
        },
        updateNumberOfPostsDisplaying() {
            this.numberOfPostsDisplaying = vueinst.posts.length;
        }
    },
    methods: {
        filterClubs() {
            if (vueinst.tag_filter_value === "" && Number(vueinst.club_filter_value) !== -1) {
                vueinst.clubs = clubsArray.filter((club) => club.userFollows == vueinst.club_filter_value);
                this.updateNumberOfClubsDisplaying();
            } else if (Number(vueinst.club_filter_value) === -1 && vueinst.tag_filter_value !== "") {
                vueinst.clubs = clubsArray.filter((club) => club.tag === vueinst.tag_filter_value);
                this.updateNumberOfClubsDisplaying();
            } else if (vueinst.tag_filter_value !== "" && Number(vueinst.club_filter_value) !== -1) {
                vueinst.clubs = clubsArray.filter((club) => club.userFollows == vueinst.club_filter_value && club.tag === vueinst.tag_filter_value);
                this.updateNumberOfClubsDisplaying();
            } else {
                vueinst.clubs = clubsArray;
                this.updateNumberOfClubsDisplaying();
            }
        },
        filterPosts() {
            if (vueinst.post_tag_filter_value === "") {
                vueinst.posts = postArray.filter((post) => post.clubId === vueinst.viewing_club);
                this.updateNumberOfPostsDisplaying();
            } else {
                vueinst.posts = postArray.filter((post) => post.tag === vueinst.post_tag_filter_value && post.clubId === vueinst.viewing_club);
                this.updateNumberOfPostsDisplaying();
            }
        },
        getPosts() {
            // This will be an Ajax call to get the correct posts corresponding to the club
            document.getElementById("clubs-nav").classList.remove("current-page");
            vueinst.posts = postArray.filter((post) => post.clubId === (Number(vueinst.viewing_club)));
            this.numberOfPostsDisplaying = posts.length;
        }
    },
    mounted() {
        this.numberOfClubsDisplaying = clubsArray.length;
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
