// The following are to be obtained from the server

// Only events that have not been responded to or are going/maybe for
let postArray = [
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 5,
        title: "Welcome to Members!",
        tag: "public",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: false
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 6,
        title: "Welcome to Members!",
        tag: "public",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: false
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 7,
        title: "Welcome to Members!",
        tag: "public",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 5,
        title: "Welcome to Members!",
        tag: "public",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 6,
        title: "Welcome to Members!",
        tag: "public",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 7,
        title: "Welcome to Members!",
        tag: "public",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 5,
        title: "Welcome to Members!",
        tag: "public",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 6,
        title: "Welcome to Members!",
        tag: "private",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 7,
        title: "Welcome to Members!",
        tag: "private",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 5,
        title: "Welcome to Members!",
        tag: "private",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 6,
        title: "Welcome to Members!",
        tag: "private",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    },
    {
        id: 1,
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 7,
        title: "Welcome to Members!",
        tag: "private",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    }
];

const map = new Map();

let clubsOfPosts = postArray.filter((club) => {
    if (map.get(club.id)) {
       return false;
    }
    map.set(club.id, club);
    return true;
 });

clubsOfPosts = clubsOfPosts.map((item) => {
    let club = item;
    return { id: club.id, name: club.clubName };
});

// Formats the data correctly
postArray = postArray.map((v) => ({ ...v, isExpanded: false, isHovered: false }));

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
            numberOfPostsDisplaying: 1,
            unreadPostMessage: "Mark as read",
            unreadPostImage: "./images/unread.svg",
            unreadPostHoverImage: "./images/mark_as_read.svg",
            tag_filter_value: "",
            club_filter_value: ""
        };
    },
    computed: {
        updateNumberOfPostsDisplaying() {
            vueinst.numberOfPostsDisplaying = vueinst.posts.length;
        }
    },
    methods: {
        filter() {
            if (vueinst.tag_filter_value === "" && vueinst.club_filter_value !== "") {
                vueinst.posts = postArray.filter((post) => post.id === vueinst.club_filter_value);
            } else if (vueinst.club_filter_value === "" && vueinst.tag_filter_value !== "") {
                vueinst.posts = postArray.filter((post) => post.tag === vueinst.tag_filter_value);
            } else if (vueinst.tag_filter_value !== "" && vueinst.club_filter_value !== "") {
                vueinst.posts = postArray.filter((post) => post.id === vueinst.club_filter_value && post.tag === vueinst.tag_filter_value);
            } else {
                vueinst.posts = postArray;
            }
        }
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
