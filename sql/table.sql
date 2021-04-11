CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    fname VARCHAR(200) NOT NULL,
    lname VARCHAR(200) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(200) NOT NULL,
    joindate TIMESTAMPTZ NOT NULL,
    profilephoto VARCHAR(200),
    UNIQUE (username)
);

CREATE TABLE plants(
    id SERIAL PRIMARY KEY,
    sciname varchar(100) NOT NULL,
    comname varchar(100) NOT NULL,
    description TEXT NOT NULL,
    plantinstr TEXT,
    growinstr TEXT,
    careinstr TEXT,
    hardiness TEXT,
    exposure TEXT,
    waterNeed TEXT,
    plantphoto VARCHAR(200),
    UNIQUE (sciname)
);

CREATE TABLE plantdiseases(
    diseaseName VARCHAR(100) PRIMARY KEY,
    description TEXT
);

CREATE TABLE plantpests(
    pestName VARCHAR(100) PRIMARY KEY,
    description TEXT
);

CREATE TABLE posts(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    sortingid SERIAL,
    dateTime TIMESTAMPTZ NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    location VARCHAR(200),
    imageurl VARCHAR(200),
    numoflikes INTEGER DEFAULT 0 NOT NULL,
    numofcomments INTEGER DEFAULT 0 NOT NULL,
    authorname VARCHAR(200),
    tags TEXT[],
    userid uuid references users(id)
        ON DELETE CASCADE
);

CREATE TABLE tags(
    name VARCHAR(50) PRIMARY KEY
);

CREATE TABLE likes(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    val INTEGER, /*Integer restrictued to 1, -1*/
    PRIMARY KEY(userid, postid)
);

CREATE TABLE followers(
    follower uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    followee uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (follower, followee)
);

CREATE TABLE comments(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dateTime TIMESTAMPTZ NOT NULL,
    numoflikes INTEGER DEFAULT 0 NOT NULL,
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    content TEXT
);

CREATE TABLE likescomment(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    commentid uuid REFERENCES comments(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    val INTEGER, /*Integer restrictued to 1, -1*/
    PRIMARY KEY(userid, commentid, postid)
);

CREATE TABLE saves(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    PRIMARY KEY(userId, postId)
);