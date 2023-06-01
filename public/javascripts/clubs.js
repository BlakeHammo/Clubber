const vueinst = Vue.createApp({
    data() {
        return {
            // Multiple clubs component
            numberOfClubsDisplaying: 0,
            clubs: [],
            clubTags: [],
            tag_filter_value: "",
            club_filter_value: "",
            viewing_club: -1,
            viewing_club_name: "",
            // Club posts component
            posts: [],
            post_tag_filter_value: "",
            numberOfPostsDisplaying: 0,
            unreadPostImage: "./images/unread.svg",
            unreadPostHoverImage: "./images/mark_as_read.svg",
            clubs_obtained: false,
            club_manager: false,
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
            users: [],
            // The following will show rsvps for certain events
            show_rsvps: false,
            // Misc
            user_id: ""
        };
    },
    methods: {
        filterClubs() {
            this.getClubs();
        },
        filterPosts() {
            this.getPosts();
        },
        getPostsInitial() {
            document.getElementById("clubs-nav").classList.remove("current-page");
            // This will be an Ajax call to get the correct posts corresponding to the club
            this.filterPosts();
            if (this.user_id === "") {
                const filter = document.querySelector("#tags");
                filter.remove();
            }
            window.scroll(0,0);
            this.checkClubManagerAndMember();
        },
        getPosts() {
            const requestData = {
                club_id: this.viewing_club,
                tag: this.post_tag_filter_value,
                event_type: "",
                club_page: true
            };

            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    vueinst.posts = JSON.parse(req.responseText).map((item) => {
                        let post = item;

                        const formatter = new Intl.DateTimeFormat(navigator.language, {
                            dateStyle: "short",
                            timeStyle: "short"
                        });

                        post.creation_date_time = formatter.format(new Date(post.creation_date_time));
                        if (post.tag === 'event') {
                            post.event_date_time = formatter.format(new Date(post.event_date_time));
                        }

                        return post;
                    });
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
        async createPost() {
            let post = "";
            if (this.post_creation_type === "post") {
                post = {
                        clubId: this.viewing_club,
                        eventDate: null,
                        location: null,
                        title: this.title,
                        tag: this.post_creation_type,
                        type: this.post_type,
                        content: this.post_content
                };
            } else {
                post = {
                        clubId: this.viewing_club,
                        eventDate: new Date(this.eventDate).toISOString(),
                        location: this.location,
                        title: this.title,
                        tag: this.post_creation_type,
                        type: this.post_type,
                        content: this.post_content
                };
            }

            let req = new XMLHttpRequest();

            req.onreadystatechange = await function(){
                if(req.readyState === 4 && req.status === 200){
                    /* */
                }
            };
            req.open('POST','/users/posts/create');
            req.setRequestHeader('Content-Type','application/json');
            req.send(JSON.stringify(post));

            this.show_post_creation = false;
            this.eventDate = "";
            this.location = "";
            this.title = "";
            this.post_creation_type = "";
            this.post_type = "";
            this.post_content = "";
            this.filterPosts();
        },
        getClubs() {
            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    vueinst.clubs = JSON.parse(req.responseText);
                    vueinst.numberOfClubsDisplaying = JSON.parse(req.responseText).length;
                }
            };
            req.open('GET',`/clubs?tag=${vueinst.tag_filter_value}&club=${vueinst.club_filter_value}`);
            req.send();
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

            const notificationBadge = document.querySelector("#notifications");
            notificationBadge.innerText = Number(notificationBadge.innerText) - 1;
        },
        getClubMembers() {
            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    vueinst.users = JSON.parse(req.responseText).map((item) => {
                        let user = item;
                        const formatter = new Intl.DateTimeFormat(navigator.language, {
                            dateStyle: "short",
                            timeStyle: "short"
                        });

                        user.date_joined = formatter.format(new Date(user.date_joined));

                        return user;
                    });
                }
            };
            req.open('GET',`/users/clubs/members?id=${vueinst.viewing_club}`);
            req.send();
        },
        getRsvps(id) {
            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    vueinst.users = JSON.parse(req.responseText).map((item) => {
                        let user = item;
                        const formatter = new Intl.DateTimeFormat(navigator.language, {
                            dateStyle: "short",
                            timeStyle: "short"
                        });

                        user.date_responded = formatter.format(new Date(user.date_responded));

                        return user;
                    });
                }
            };
            req.open('GET',`/users/posts/rsvp-users?id=${id}`);
            req.send();
        },
        getUserInfo() {
            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    vueinst.user_id = req.responseText;
                    if (req.responseText === "") {
                        const club_filter = document.querySelector("#club-filter");
                        club_filter.remove();

                        const profile = document.querySelector("#profile-nav");
                        profile.remove();

                        const notifications = document.querySelector("#notifications-nav");
                        notifications.remove();

                        const manage_users = document.querySelector("#manage-users-nav");
                        manage_users.remove();

                        const manage_clubs = document.querySelector("#manage-clubs-nav");
                        manage_clubs.remove();

                        const logout = document.querySelector("#logout");
                        logout.innerText = "Log In/Sign Up";
                        logout.title = "Log In or Sign Up";
                    }
                }
            };
            req.open('GET',`/users/info`);
            req.send();
        },
        checkClubManagerAndMember() {
            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    const result = req.responseText;
                    if (result === "Neither") {
                        const club_manager_add = document.querySelector("#add-club-button");
                        club_manager_add.remove();

                        const club_manager_view = document.querySelector("#view-members-button");
                        club_manager_view.remove();

                        const rsvp_buttons = document.querySelectorAll(".view-rsvps-button");
                        for (const button of rsvp_buttons) {
                            button.remove();
                        }
                        vueinst.club_manager = false;
                    } else if(result === "Member" || result === "Public") {
                        const club_manager_add = document.querySelector("#add-club-button");
                        club_manager_add.remove();

                        const club_manager_view = document.querySelector("#view-members-button");
                        club_manager_view.remove();

                        const rsvp_buttons = document.querySelectorAll(".view-rsvps-button");
                        for (const button of rsvp_buttons) {
                            button.remove();
                        }

                        const join_club = document.querySelector("#join-club-button");
                        join_club.remove();
                        vueinst.club_manager = false;
                    } else if (result === "Both") {
                        const join_club = document.querySelector("#join-club-button");
                        join_club.remove();
                        vueinst.club_manager = true;
                    }
                }
            };
            req.open('GET',`/users/info/club-manager?club_id=${this.viewing_club}`);
            req.send();
        },
        joinClub() {
            let request = {
                club_id: this.viewing_club
            };

            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    /* */
                }
            };
            req.open('POST','/users/clubs/join');
            req.setRequestHeader('Content-Type','application/json');
            req.send(JSON.stringify(request));

            const join_club = document.querySelector("#join-club-button");
            join_club.remove();
        }
    },
    mounted() {
        function uniqueClubTags(tag, index, array) {
            return array.indexOf(tag) === index;
        }

        let req = new XMLHttpRequest();

        req.onreadystatechange = function(){
            if(req.readyState === 4 && req.status === 200){
                vueinst.clubs = JSON.parse(req.responseText);
                vueinst.numberOfClubsDisplaying = JSON.parse(req.responseText).length;

                vueinst.clubTags = JSON.parse(req.responseText).map((item) => {
                    let club = item;
                    return club.club_tag;
                });

                vueinst.clubTags = vueinst.clubTags.filter(uniqueClubTags);
            }
        };
        req.open('GET',`/clubs?tag=&club=`);
        req.send();
        this.getUserInfo();
    }
}).mount("#app");

// Marks the current link page as active
document.getElementById("clubs-nav").className = "current-page";

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

updateNotificationBadge();
