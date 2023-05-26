-- criando tabelas --
CREATE TABLE "Musicas" (
    "id" INT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "artista" VARCHAR(100) NOT NULL,
    "imgpath" VARCHAR(100) not null,
    "audiopath" VARCHAR(100) not null,
    CONSTRAINT "PK_Musicas" PRIMARY KEY ("id")
);

CREATE TABLE "Accounts" (
    "id" INT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    CONSTRAINT "PK_Accounts" PRIMARY KEY ("id")
);

CREATE TABLE "userPlaylists" (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  musics INT[],
  userid INT
);

-- inserindo dados --

INSERT INTO "userPlaylists" (id, name, musics, userid)
VALUES
  (1, 'Rockzao', ARRAY[19, 20, 18, 2], 1),
  (2, 'Play admin', ARRAY[15, 14, 20], 1),
  (3, 'Playlist do Samuel', ARRAY[10, 7, 18, 13], 3);


INSERT INTO "Accounts" ("id", "username", "email", "password")
VALUES (1, 'admin', 'admin', '123');

INSERT INTO "Accounts" ("id", "username", "email", "password")
VALUES (2, 'Tester', 'a', 'a');

INSERT INTO "Accounts" ("id", "username", "email", "password")
VALUES (3, 'Sarmuns', 'samuel@gmail.com', '123');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (1, 'eye of the tiger', 'survivor', 'img/eyeoftiger.png', 'music/linkinpark_givenup.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (2, 'sweet child o'' mine', 'guns n'' roses', 'img/sweetchild.png', 'music/linkinpark_givenup.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (3, 'billie jean', 'michael jackson', 'img/billiejean.png', 'music/linkinpark_givenup.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (4, 'bohemian rhapsody', 'queen', 'img/bohemian.jpg', 'music/linkinpark_givenup.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (5, 'hotel california', 'eagles', 'img/hotelcalifornia.jpg', 'music/linkinpark_givenup.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (6, 'back in black', 'ac/dc', 'img/backinblack.png', 'music/linkinpark_givenup.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (7, 'smells like teen spirit', 'nirvana', 'img/smellslike.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (8, 'stairway to heaven', 'led zeppelin', 'img/stairway.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (9, 'imagine', 'john lennon', 'img/imagine.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (10, 'thunderstruck', 'ac/dc', 'img/thunderstruck.png', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (11, 'another brick in the wall', 'pink floyd', 'img/thewall.png', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (12, 'livin'' on a prayer', 'bon jovi', 'img/livinon.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (13, 'november rain', 'guns n'' roses', 'img/november.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (14, 'don''t stop believin''', 'journey', 'img/dontstop.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (15, 'purple rain', 'prince', 'img/purplerain.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (16, 'kashmir', 'led zeppelin', 'img/kashmir.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (17, 'my heart will go on', 'celine dion', 'img/myheartwill.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (18, 'like a rolling stone', 'bob dylan', 'img/likearolling.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (19, 'the sound of silence', 'simon & garfunkel', 'img/thesound.jpg', 'music/soad_chopsuey.mp3');

INSERT INTO "Musicas" ("id", "nome", "artista", "imgpath", "audiopath")
VALUES (20, 'paint it black', 'the rolling stones', 'img/paintitblack.jpg', 'music/soad_chopsuey.mp3');
