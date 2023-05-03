// The following are to be obtained from the server

let userFollowedClubs = [
    {
        clubId: 1,
        clubName: "Club 1"
    },
    {
        clubId: 2,
        clubName: "Club 2"
    },
    {
        clubId: 3,
        clubName: "Club 3"
    },
    {
        clubId: 4,
        clubName: "Club 4"
    }
];

// Posts and events
let postArray = [
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: null,
        location: null,
        postId: 1,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
        read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: null,
        location: null,
        postId: 2,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: null,
        location: null,
        postId: 3,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: false
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: null,
        location: null,
        postId: 4,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 5,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: false
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 6,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: false
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 7,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "13/04/2023 1:45pm",
        eventDate: null,
        location: null,
        postId: 1,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "13/04/2023 1:45pm",
        eventDate: null,
        location: null,
        postId: 2,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "13/04/2023 1:45pm",
        eventDate: null,
        location: null,
        postId: 3,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: null,
        location: null,
        postId: 4,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 5,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 6,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 7,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "13/04/2023 1:45pm",
        eventDate: null,
        location: null,
        postId: 1,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "13/04/2023 1:45pm",
        eventDate: null,
        location: null,
        postId: 2,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "13/04/2023 1:45pm",
        eventDate: null,
        location: null,
        postId: 3,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: null,
        location: null,
        postId: 4,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 5,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 6,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 7,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "13/04/2023 1:45pm",
        eventDate: null,
        location: null,
        postId: 1,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "13/04/2023 1:45pm",
        eventDate: null,
        location: null,
        postId: 2,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "13/04/2023 1:45pm",
        eventDate: null,
        location: null,
        postId: 3,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: null,
        location: null,
        postId: 4,
        title: "Welcome to Members!",
        tag: "Post",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 5,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 6,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    },
    {
        clubName: "Club A",
        creationDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        eventDate: "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
        location: "My House",
        postId: 7,
        title: "Welcome to Members!",
        tag: "Event",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
            read: true
    }
];

// Formats the data correctly
postArray = postArray.map((v) => ({ ...v, isExpanded: false, isHovered: false }));

postArray = postArray.map((item) => {
    let post = item;

    post.creationDate = new Date(post.creationDate).toLocaleString();
    if (post.tag === 'Event') {
        post.eventDate = new Date(post.eventDate).toLocaleString();
    }

    return post;
});

const vueinst = Vue.createApp({
    data() {
        return {
            userFollowedClubs: userFollowedClubs,
            hamburgerVisible: true,
            numberOfPostsDisplaying: 1,
            posts: postArray,
            unreadPostMessage: "Mark as read",
            unreadPostImage: "./images/unread.svg",
            unreadPostHoverImage: "./images/mark_as_read.svg"
        };
    },
    computed: {
        updateNumberOfPostsDisplaying() {
            vueinst.numberOfPostsDisplaying = vueinst.posts.length;
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
