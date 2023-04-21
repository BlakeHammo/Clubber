document.addEventListener("DOMContentLoaded", function() {
    // Loading club filter with options
    function loadClubFilter() {
        const clubFilterElement = document.querySelector("select");
        let userFollowedClubs = ["Club 1", "Club 2", "Club 3", "Club 4"]; // To be obtained from database

        for (let club of userFollowedClubs) {
            let option = new Option(club, club);
            clubFilterElement.add(option);
        }
    }

    if (window.location.pathname === "/events.html" || window.location.pathname === "/feed.html" || window.location.pathname === "/clubs.html") {
        loadClubFilter();
    }

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
        // Hamburger menu logic
        hamburger.addEventListener("click", toggleMenuOn, false);
        exit.addEventListener("click", toggleMenuOff, false);
    }

    // Mark a post as read
    function changeToReadIcon() {
        this.querySelector("IMG").src = "./images/mark_as_read.svg";
    }

    function changeToUnreadIcon() {
        this.querySelector("IMG").src = "./images/unread.svg";
    }

    function markAsRead() {
        this.classList.remove("unread");
        this.getAttribute("title");
        this.removeAttribute("title");
        this.querySelector("IMG").remove();
        this.removeEventListener("click", markAsRead, false);
        this.removeEventListener("mouseover", changeToReadIcon);
        this.removeEventListener("mouseleave", changeToUnreadIcon);
    }

    // Reveals more of a post
    function expandPost() {
        if (this.innerHTML === "<u>View more</u>") {
            this.parentElement.querySelector(".post-content").classList.remove("post-content-hidden");
            this.innerHTML = "<u>View less</u>";
        } else {
            this.parentElement.querySelector(".post-content").classList.add("post-content-hidden");
            this.innerHTML = "<u>View more</u>";
        }
    }

    if (window.location.pathname === "/events.html" || window.location.pathname === "/feed.html") {
        // Adding posts
        const rsvp = `
        <select name="rsvp" id="rsvp">
            <option value="" selected hidden disabled>
                rsvp
            </option>
            <option value="attending">ATTENDING</option>
            <option value="not_attending" n>
                NOT ATTENDING
            </option>
            <option value="maybe">MAYBE</option>
        </select>`;
        let posts = [
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 1,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 2,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 3,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: null,
                location: null,
                postId: 4,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 5,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 6,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 7,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 1,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 2,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 3,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: null,
                location: null,
                postId: 4,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 5,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 6,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 7,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 1,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 2,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 3,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: null,
                location: null,
                postId: 4,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 5,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 6,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 7,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 1,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 2,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "13/04/2023 1:45pm",
                eventDate: null,
                location: null,
                postId: 3,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: null,
                location: null,
                postId: 4,
                title: "Welcome to Members!",
                tag: "Post",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 5,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 6,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club A",
                dateCreated: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
                location: "My House",
                postId: 7,
                title: "Welcome to Members!",
                tag: "Event",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            }
        ];

        let postCount = 0;

        for (let post of posts) {
            if (post.tag === "Post" && window.location.pathname === "/events.html") {
                continue;
            }

            const postContainer = document.createElement("DIV");
            postContainer.id = post.postId;
            postContainer.classList.add("post", "unread");
            postContainer.title = "Mark as read";

            const club = document.createElement("H3");
            club.innerText = post.clubName;
            postContainer.appendChild(club);

            if (post.tag === "Post") {
                const postTime = document.createElement("H4");
                postTime.innerHTML = new Date(post.dateCreated);

                const postTitle = document.createElement("H2");
                postTitle.innerText = post.title;

                const postContent = document.createElement("P");
                postContent.innerText = post.content;
                postContent.classList.add("post-content", "post-content-hidden");

                const postButton = document.createElement("BUITTON");
                postButton.type = "button";
                postButton.classList.add("see-more");
                postButton.innerHTML = "<u>View more</u>";

                const tag = document.createElement("DIV");
                tag.classList.add("tag");
                tag.innerText = post.tag;

                const spacer = document.createElement("DIV");
                spacer.classList.add("space");

                postContainer.appendChild(postTime);
                postContainer.appendChild(postTitle);
                postContainer.appendChild(postContent);
                postContainer.appendChild(postButton);
                postContainer.appendChild(tag);
                postContainer.appendChild(spacer);
            } else if (post.tag === "Event") {
                const postTitle = document.createElement("H2");
                postTitle.innerText = post.title;

                const postTime = document.createElement("H4");
                postTime.classList.add("event-details");
                postTime.innerHTML = `<span>When: </span>${post.eventDate}`;

                const location = document.createElement("H4");
                location.classList.add("event-details");
                location.innerHTML = `<span>Where: </span>${post.location}`;

                const postContent = document.createElement("P");
                postContent.innerText = post.content;
                postContent.classList.add("post-content", "post-content-hidden");

                const postButton = document.createElement("BUITTON");
                postButton.type = "button";
                postButton.classList.add("see-more");
                postButton.innerHTML = "<u>View more</u>";

                const tag = document.createElement("DIV");
                tag.classList.add("tag");
                tag.innerText = post.tag;

                const spacer = document.createElement("DIV");
                spacer.classList.add("space");

                const response = document.createElement("DIV");
                response.classList.add("rsvp");
                response.innerHTML = rsvp;

                postContainer.appendChild(postTitle);
                postContainer.appendChild(postTime);
                postContainer.appendChild(location);
                postContainer.appendChild(postContent);
                postContainer.appendChild(postButton);
                postContainer.appendChild(tag);
                postContainer.appendChild(spacer);
                postContainer.appendChild(response);
            }

            const unreadSvg = document.createElement("IMG");
            unreadSvg.src = "./images/unread.svg";
            unreadSvg.alt = "Unread Post";
            postContainer.prepend(unreadSvg);

            postContainer.addEventListener("click", markAsRead, false);
            postContainer.addEventListener("mouseover", changeToReadIcon);
            postContainer.addEventListener("mouseleave", changeToUnreadIcon);

            const viewMore = postContainer.querySelector(".see-more");
            viewMore.addEventListener("click", expandPost, false);

            const postLocation = document.querySelector("#posts");
            postLocation.appendChild(postContainer);

            // Shows 20 on initial load. On load more will show an additional 20
            if (postCount > 0 && postCount % 19 === 0) {
                break;
            }
            postCount++;
        }
    }

    if (window.location.pathname === "/clubs.html") {
        // Adding clubs

        let clubs = [
            {
                clubName: "Club A",
                followers: 20,
                clubId: 1,
                tag: "Sport",
                color: "blue",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club B",
                followers: 5,
                clubId: 2,
                tag: "Technology",
                color: "red",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Club C",
                followers: 0,
                clubId: 3,
                tag: "Faculty",
                color: "green",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            },
            {
                clubName: "Really Long Club Name To See How It Looks Really Long Club Name To See How It Looks",
                followers: 6,
                clubId: 4,
                tag: "Sport",
                color: "grey",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos."
            }
        ];

        let clubCount = 0;

        for (let club of clubs) {
            const postContainer = document.createElement("DIV");
            postContainer.id = club.clubId;
            postContainer.classList.add("post");
            postContainer.title = "Club";

            const colorBand = document.createElement("H3");
            colorBand.innerText = `${club.followers} Followers`;
            colorBand.style.backgroundColor = `${club.color}`;
            postContainer.appendChild(colorBand);

            const clubName = document.createElement("H2");
            clubName.innerText = club.clubName;

            const clubDescription = document.createElement("P");
            clubDescription.innerText = club.description;
            clubDescription.classList.add("post-content", "post-content-hidden");

            const postButton = document.createElement("BUITTON");
            postButton.type = "button";
            postButton.classList.add("see-more");
            postButton.innerHTML = "<u>View more</u>";

            const tag = document.createElement("DIV");
            tag.classList.add("tag");
            tag.innerText = club.tag;

            const spacer = document.createElement("DIV");
            spacer.classList.add("space");

            postContainer.appendChild(clubName);
            postContainer.appendChild(clubDescription);
            postContainer.appendChild(postButton);
            postContainer.appendChild(tag);
            postContainer.appendChild(spacer);

            const viewMore = postContainer.querySelector(".see-more");
            viewMore.addEventListener("click", expandPost, false);

            const postLocation = document.querySelector("#posts");
            postLocation.appendChild(postContainer);

            // Shows 20 on initial load. On load more will show an additional 20
            if (clubCount > 0 && clubCount % 19 === 0) {
                break;
            }
            clubCount++;
        }
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
    // Reveal/hide user login / sign up
    function hideLogin() {
        const signUp = document.querySelector("#login-details");
        const creation = document.querySelector("#creation-details");
        creation.classList.remove("hidden");
        signUp.classList.add("hidden");
    }

    function showLogin() {
        const creation = document.querySelector("#creation-details");
        const signUp = document.querySelector("#login-details");
        signUp.classList.remove("hidden");
        creation.classList.add("hidden");
    }

    if (window.location.pathname === "/index.html" || window.location.pathname !== "") {
        const loginDetails = document.querySelector("#create-account");
        loginDetails.addEventListener("click", hideLogin, false);
        const signInDetails = document.querySelector("#login-account");
        signInDetails.addEventListener("click", showLogin, false);
    }
}, false);
