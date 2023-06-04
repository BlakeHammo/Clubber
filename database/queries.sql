USE cluber;

INSERT INTO Users (
    first_name,
    last_name,
    username,
    email,
    passwords,
    phone_number,
    system_administrator
) VALUES (
    "Ed",
    "Sellars",
    "edsell",
    "edsell@test.com",
    "1234",
    "1234",
    0
);

INSERT INTO Users (
    first_name,
    last_name,
    username,
    email,
    passwords,
    phone_number,
    system_administrator
) VALUES (
    "Kai",
    "Koo",
    "Teetharecool",
    "kaikoo@test.com",
    "1234",
    "1234",
    0
);

INSERT INTO Users (
    first_name,
    last_name,
    username,
    email,
    passwords,
    phone_number,
    system_administrator
) VALUES (
    "Blake",
    "Hammond",
    "Blake",
    "blake@test.com",
    "1234",
    "1234",
    0
);

INSERT INTO Users (
    first_name,
    last_name,
    username,
    email,
    passwords,
    phone_number,
    system_administrator
) VALUES (
    "Petra",
    "Curdova",
    "Curdice",
    "petra@test.com",
    "1234",
    "1234",
    1
);

INSERT INTO Clubs (
    club_name ,
    club_description,
    club_color,
    club_tag
) Values (
    "Programming Enthusiasts",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "#6CD4FF",
    "technology"
);

INSERT INTO Clubs (
    club_name ,
    club_description,
    club_color,
    club_tag
) Values (
    "Movie Night University Club",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "#251351",
    "entertainment"
);

INSERT INTO Clubs (
    club_name ,
    club_description,
    club_color,
    club_tag
) Values (
    "Mechanical Keyboard Society",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "#E6AA68",
    "technology"
);

INSERT INTO Posts (
    title,
    content,
    creation_date_time,
    tag,
    club_id
) Values (
    "Update 1",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "2023-05-24T09:31:15.168Z",
    "post",
    1
);

INSERT INTO Posts (
    title,
    content,
    creation_date_time,
    tag,
    club_id
) Values (
    "Update 1",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
    "post",
    2
);

INSERT INTO Posts (
    title,
    content,
    creation_date_time,
    tag,
    club_id
) Values (
    "Update 1",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
    "post",
    3
);

INSERT INTO Posts (
    title,
    content,
    creation_date_time,
    tag,
    club_id
) Values (
    "Update 2",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
    "post",
    1
);

INSERT INTO Posts (
    title,
    content,
    creation_date_time,
    tag,
    club_id
) Values (
    "Update 2",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
    "post",
    2
);

INSERT INTO Posts (
    title,
    content,
    creation_date_time,
    tag,
    club_id
) Values (
    "Update 2",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
    "post",
    3
);

INSERT INTO Posts (
    title,
    content,
    creation_date_time,
    event_date_time,
    event_location,
    tag,
    event_type,
    club_id
) Values (
    "Sports Day",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
    "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
    "Outside",
    "event",
    "public",
    1
);

INSERT INTO Posts (
    title,
    content,
    creation_date_time,
    event_date_time,
    event_location,
    tag,
    event_type,
    club_id
) Values (
    "Movie Night",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
    "Thu May 28 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
    "Cinema",
    "event",
    "private",
    2
);

INSERT INTO Posts (
    title,
    content,
    creation_date_time,
    event_date_time,
    event_location,
    tag,
    event_type,
    club_id
) Values (
    "Pub Night",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis sint, doloremque fugiat quia consequatur rem voluptatem aspernatur consectetur molestiae accusantium itaque explicabo, commodi dolor corporis sunt placeat voluptates. Corporis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia facere optio nulla consectetur iste recusandae quasi nisi, sit amet repellendus molestiae quis ut eos soluta hic ipsum ducimus, veritatis quos.",
    "Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)",
    "2024-05-24T09:31:15.168Z",
    "Inside",
    "event",
    "public",
    3
);

INSERT INTO Posts_viewed (
    post_id,
    user_id
) Values (
    1,
    1
);

INSERT INTO Posts_viewed (
    post_id,
    user_id
) Values (
    2,
    1
);

INSERT INTO Posts_viewed (
    post_id,
    user_id
) Values (
    5,
    1
);

INSERT INTO Rsvps (
    post_id,
    user_id,
    rsvp,
    date_responded
) Values (
    9,
    1,
    2,
    "2023-05-24T09:31:15.168Z"
);

INSERT INTO Club_members (
    club_id,
    user_id,
    club_manager,
    date_joined
) VALUES (
    1,
    1,
    1,
    'Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)'
);

INSERT INTO Club_members (
    club_id,
    user_id,
    club_manager,
    date_joined
) VALUES (
    2,
    2,
    1,
    'Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)'
);

INSERT INTO Club_members (
    club_id,
    user_id,
    club_manager,
    date_joined
) VALUES (
    2,
    3,
    1,
    'Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)'
);

INSERT INTO Club_members (
    club_id,
    user_id,
    club_manager,
    date_joined
) VALUES (
    3,
    4,
    1,
    'Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)'
);

INSERT INTO Club_members (
    club_id,
    user_id,
    club_manager,
    date_joined
) VALUES (
    3,
    1,
    0,
    'Thu Apr 13 2023 17:39:14 GMT+0930 (Australian Central Standard Time)'
);
