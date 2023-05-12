// Formats the data correctly
// const formatter = function(array) {
//     let newArray = array.map((v) => ({ ...v, isExpanded: false, isHovered: false, userRead: false }));

//
// };



const vueinst = Vue.createApp({
    data() {
        return {
            // Multiple clubs component
            numberOfClubsDisplaying: 0,
            clubs: [],
            clubTags: [],
            tag_filter_value: "",
            club_filter_value: -1,
            viewing_club: -1,
            viewing_club_name: "",
            // Club posts component
            posts: [],
            filteredPosts: [],
            post_tag_filter_value: "",
            numberOfPostsDisplaying: 0,
            unreadPostImage: "./images/unread.svg",
            unreadPostHoverImage: "./images/mark_as_read.svg",
            // The following capture info for post creation
            show_post_creation: false,
            post_creation_type: "",
            post_type: "",
            title: "",
            eventDate: "",
            location: "",
            post_content: "",
            // The following will reveal club members
            show_club_members: false,
            users: []
        };
    },
    methods: {
        updateNumberOfClubsDisplaying() {
            this.numberOfClubsDisplaying = this.clubs.length;
        },
        updateNumberOfPostsDisplaying() {
            this.numberOfPostsDisplaying = this.posts.length;
        },
        filterClubs() {
            if (this.tag_filter_value === "" && Number(this.club_filter_value) !== -1) {
                this.getClubs();
                this.clubs = this.clubs.filter((club) => club.userFollows == this.club_filter_value);
                this.updateNumberOfClubsDisplaying();
            } else if (Number(this.club_filter_value) === -1 && this.tag_filter_value !== "") {
                this.getClubs();
                this.clubs = this.clubs.filter((club) => club.tag === this.tag_filter_value);
                this.updateNumberOfClubsDisplaying();
            } else if (this.tag_filter_value !== "" && Number(this.club_filter_value) !== -1) {
                this.getClubs();
                this.clubs = this.clubs.filter((club) => club.userFollows == this.club_filter_value && club.tag === this.tag_filter_value);
                this.updateNumberOfClubsDisplaying();
            } else {
                this.getClubs();
                this.updateNumberOfClubsDisplaying();
            }
        },
        filterPosts() {
            if (this.post_tag_filter_value === "") {
                this.getPosts();
                this.posts = this.posts.filter((post) => post.clubId === Number(this.viewing_club));
                this.updateNumberOfPostsDisplaying();
            } else {
                this.getPosts();
                this.posts = this.posts.filter((post) => post.tag === this.post_tag_filter_value && post.clubId === Number(this.viewing_club));
                this.updateNumberOfPostsDisplaying();
            }
        },
        getPostsInitial() {
            document.getElementById("clubs-nav").classList.remove("current-page");
            // This will be an Ajax call to get the correct posts corresponding to the club
            this.filterPosts();
            this.getUsers();
        },
        getPosts() {
            this.posts = posts.filter((post) => post.clubId === (Number(this.viewing_club)));
            this.posts = this.posts.map((v) => ({ ...v, isExpanded: false, isHovered: false }));
            this.posts = this.posts.map((item) => {
                let post = item;

                post.creationDate = new Date(post.creationDate).toLocaleString();
                if (post.tag === 'event') {
                    post.eventDate = new Date(post.eventDate).toLocaleString();
                }

                return post;
            });
        },
        createPost() {
            if (this.post_creation_type === "post") {
                const post = {
                        clubId: this.viewing_club,
                        clubName: this.clubs[this.clubs.findIndex((x) => x.id === this.viewing_club)].name,
                        clubColor: this.clubs[this.clubs.findIndex((x) => x.id === this.viewing_club)].color,
                        postId: posts.length + 1,
                        creationDate: String(new Date().toLocaleString()),
                        eventDate: null,
                        location: null,
                        title: this.title,
                        tag: this.post_creation_type,
                        type: this.post_type,
                        content: this.post_content,
                        eventResponse: null,
                        userRead: false
                };
                posts.unshift(post);

            } else {
                const event = {
                        clubId: this.viewing_club,
                        clubName: this.clubs[this.clubs.findIndex((x) => x.id === this.viewing_club)].name,
                        clubColor: this.clubs[this.clubs.findIndex((x) => x.id === this.viewing_club)].color,
                        postId: posts.length + 1,
                        creationDate: String(new Date().toLocaleString()),
                        eventDate: String(new Date(this.eventDate).toLocaleString()),
                        location: this.location,
                        title: this.title,
                        tag: this.post_creation_type,
                        type: this.post_type,
                        content: this.post_content,
                        eventResponse: -1,
                        userRead: false
                };
                posts.unshift(event);
            }
            this.show_post_creation = false;

            // Need to make an Ajax POST
            this.filterPosts();
            this.eventDate = "";
            this.location = "";
            this.title = "";
            this.post_creation_type = "";
            this.post_type = "";
            this.post_content = "";
        },
        getClubs() {
            this.clubs = clubs.map((v) => ({ ...v, isExpanded: false, userFollows: true }));

            function uniqueClubTags(tag, index, array) {
                return array.indexOf(tag) === index;
            }

            this.clubTags = this.clubs.map((item) => {
                let club = item;
                return club.tag;
            });

            this.clubTags = this.clubTags.filter(uniqueClubTags);
            this.updateNumberOfClubsDisplaying();
        },
        rsvp(post_id, rsvp_number) {
            posts[posts.findIndex((x) => x.postId === post_id)].eventResponse = rsvp_number;
            this.posts[this.posts.findIndex((x) => x.postId === post_id)].eventResponse = rsvp_number;
        },
        markPostAsRead(post_id) {
            if (posts[posts.findIndex((x) => x.postId === post_id)].userRead === true) {
                return;
            }
            posts[posts.findIndex((x) => x.postId === post_id)].userRead = true;
            this.posts[this.posts.findIndex((x) => x.postId === post_id)].userRead = true;
        },
        getUsers() {
            // When fully implemented will only get this specific club's users
            this.users = users;
            this.users = this.users.map((item) => {
                let user = item;

                user.dateJoined = new Date(user.dateJoined).toLocaleString();
                return user;
            });
        }
    },
    mounted() {
        this.getClubs();
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
