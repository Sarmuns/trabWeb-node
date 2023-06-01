-- Create the freePlaylists table
CREATE TABLE freePlaylists (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  fotoplaylist VARCHAR(255) NOT NULL
);

-- Create the freeMusicas table
CREATE TABLE freeMusicas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  artista VARCHAR(255) NOT NULL,
  album VARCHAR(255) NOT NULL,
  genero VARCHAR(255) NOT NULL,
  fotoalbum VARCHAR(255) NOT NULL,
  audiofile VARCHAR(255) NOT NULL
);

-- Create the auxiliary table to establish the many-to-many relationship
CREATE TABLE freePlaylist_Musicas (
  playlist_id INTEGER REFERENCES freePlaylists(id),
  musica_id INTEGER REFERENCES freeMusicas(id),
  PRIMARY KEY (playlist_id, musica_id)
);

-- Insert data into the freePlaylists table
INSERT INTO freePlaylists (id, nome, fotoplaylist) VALUES
  (0, 'rock alternativo', 'playlist/rockalternativo.jpg'),
  (1, 'rock internacional', '/playlist/rockinternacional.jpg'),
  (2, 'linkin park', '/playlist/linkinpark.jpg'),
  (3, 'para malhar', '/playlist/paramalhar.jpg'),
  (4, 'bossa nova', '/playlist/bossanova.jpg');

-- Insert data into the freeMusicas table
INSERT INTO freeMusicas (id, nome, artista, album, genero, fotoalbum, audiofile) VALUES
  (0, 'given up', 'linkin park', 'hybrid theory', 'rock alternativo', 'https://example.com/hybrid-theory.jpg', '/music/linkinpark_givenup.mp3'),
  (1, 'chop suey!', 'system of a down', 'toxicity', 'rock alternativo', 'https://example.com/toxicity.jpg', '/music/soad_chopsuey.mp3'),
  (2, 'kryptonite', '3 doors down', 'the better life', 'rock alternativo', 'https://example.com/the-better-life.jpg', 'https://example.com/3-doors-down-kryptonite.mp3'),
  (3, 'everlong', 'foo fighters', 'the colour and the shape', 'rock alternativo', 'https://example.com/the-colour-and-the-shape.jpg', 'https://example.com/foo-fighters-everlong.mp3'),
  (4, 'last resort', 'papa roach', 'infest', 'rock alternativo', 'https://example.com/infest.jpg', 'https://example.com/papa-roach-last-resort.mp3'),
  (5, 'sweet child o'' mine', 'guns n'' roses', 'appetite for destruction', 'rock internacional', 'https://example.com/appetite-for-destruction.jpg', 'https://example.com/guns-n-roses-sweet-child-o-mine.mp3'),
  (6, 'livin'' on a prayer', 'bon jovi', 'slippery when wet', 'rock internacional', 'https://example.com/slippery-when-wet.jpg', 'https://example.com/bon-jovi-livin-on-a-prayer.mp3'),
  (7, 'stairway to heaven', 'led zeppelin', 'led zeppelin iv', 'rock internacional', 'https://example.com/led-zeppelin-iv.jpg', 'https://example.com/led-zeppelin-stairway-to-heaven.mp3'),
  (8, 'numb', 'linkin park', 'meteora', 'nu metal', 'https://example.com/meteora.jpg', 'https://example.com/linkin-park-numb.mp3'),
  (9, 'papercut', 'linkin park', 'hybrid theory', 'rock alternativo', 'https://example.com/hybrid-theory.jpg', 'https://example.com/linkin-park-papercut.mp3'),
  (10, 'given up', 'linkin park', 'hybrid theory', 'nu metal', 'https://example.com/hybrid-theory.jpg', 'https://example.com/linkin-park-crawling.mp3'),
  (11, 'breaking the habit', 'linkin park', 'meteora', 'nu metal', 'https://example.com/meteora.jpg', 'https://example.com/linkin-park-breaking-the-habit.mp3'),
  (12, 'can''t hold us', 'macklemore & ryan lewis feat. ray dalton', 'the heist', 'hip hop', 'https://example.com/the-heist.jpg', 'https://example.com/macklemore-ryan-lewis-cant-hold-us.mp3'),
  (13, 'lose yourself', 'eminem', '8 mile soundtrack', 'hip hop', 'https://example.com/8-mile-soundtrack.jpg', 'https://example.com/eminem-lose-yourself.mp3'),
  (14, 'eye of the tiger', 'survivor', 'eye of the tiger', 'rock', 'https://example.com/eye-of-the-tiger.jpg', 'https://example.com/survivor-eye-of-the-tiger.mp3'),
  (15, 'garota de ipanema', 'antônio carlos jobim', 'the composer of desafinado, plays', 'bossa nova', 'https://example.com/the-composer-of-desafinado-plays.jpg', 'https://example.com/antonio-carlos-jobim-garota-de-ipanema.mp3'),
  (16, 'desafinado', 'tom jobim & newton mendonça', 'joão gilberto', 'bossa nova', 'https://example.com/joao-gilberto.jpg', 'https://example.com/tom-jobim-newton-mendonca-desafinado.mp3'),
  (17, 'chega de saudade', 'joão gilberto', 'chega de saudade', 'bossa nova', 'https://example.com/chega-de-saudade.jpg', 'https://example.com/joao-gilberto-chega-de-saudade.mp3'),
  (18, 'wave', 'antônio carlos jobim', 'wave', 'bossa nova', 'https://example.com/wave.jpg', 'https://example.com/antonio-carlos-jobim-wave.mp3');

-- Insert data into the freePlaylist_Musicas table to establish the many-to-many relationship
INSERT INTO freePlaylist_Musicas (playlist_id, musica_id) VALUES
  (0, 0), (0, 1), (0, 2), (0, 3), (0, 4),
  (1, 5), (1, 6), (1, 7),
  (2, 8), (2, 9), (2, 10), (2, 11),
  (3, 12), (3, 13), (3, 14),
  (4, 15),
  (4, 16),
  (4, 17),
  (4, 18);