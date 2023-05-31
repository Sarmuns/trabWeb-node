
const express = require('express');
const cors = require('cors')
const app = express();
const corsOptions = {
  origin: '*'
};
app.use(express.json());
app.use(cors({
  origin: '*'
}));


/* request de musicas */
const musicas = [
  {
    "id": 1,
    "nome": "eye of the tiger",
    "artista": "survivor",
    "imgpath": "img/eyeoftiger.png",
    "audiopath": "music/linkinpark_givenup.mp3"
  },
  {
    "id": "2",
    "nome": "sweet child o' mine",
    "artista": "guns n' roses",
    "imgpath": "img/sweetchild.png",
    "audiopath": "music/linkinpark_givenup.mp3"
  },
  {
    "id": "3",
    "nome": "billie jean",
    "artista": "michael jackson",
    "imgpath": "img/billiejean.png",
    "audiopath": "music/linkinpark_givenup.mp3"
  },
  {
    "id": "4",
    "nome": "bohemian rhapsody",
    "artista": "queen",
    "imgpath": "img/bohemian.jpg",
    "audiopath": "music/linkinpark_givenup.mp3"
  },
  {
    "id": "5",
    "nome": "hotel california",
    "artista": "eagles",
    "imgpath": "img/hotelcalifornia.jpg",
    "audiopath": "music/linkinpark_givenup.mp3"
  },
  {
    "id": "6",
    "nome": "back in black",
    "artista": "ac/dc",
    "imgpath": "img/backinblack.png",
    "audiopath": "music/linkinpark_givenup.mp3"
  },
  {
    "id": "7",
    "nome": "smells like teen spirit",
    "artista": "nirvana",
    "imgpath": "img/smellslike.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "8",
    "nome": "stairway to heaven",
    "artista": "led zeppelin",
    "imgpath": "img/stairway.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "9",
    "nome": "imagine",
    "artista": "john lennon",
    "imgpath": "img/imagine.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "10",
    "nome": "thunderstruck",
    "artista": "ac/dc",
    "imgpath": "img/thunderstruck.png",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "11",
    "nome": "another brick in the wall",
    "artista": "pink floyd",
    "imgpath": "img/thewall.png",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "12",
    "nome": "livin' on a prayer",
    "artista": "bon jovi",
    "imgpath": "img/livinon.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "13",
    "nome": "november rain",
    "artista": "guns n' roses",
    "imgpath": "img/november.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "14",
    "nome": "don't stop believin'",
    "artista": "journey",
    "imgpath": "img/dontstop.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "15",
    "nome": "purple rain",
    "artista": "prince",
    "imgpath": "img/purplerain.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "16",
    "nome": "kashmir",
    "artista": "led zeppelin",
    "imgpath": "img/kashmir.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "17",
    "nome": "my heart will go on",
    "artista": "celine dion",
    "imgpath": "img/myheartwill.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "18",
    "nome": "like a rolling stone",
    "artista": "bob dylan",
    "imgpath": "img/likearolling.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "19",
    "nome": "the sound of silence",
    "artista": "simon & garfunkel",
    "imgpath": "img/thesound.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  },
  {
    "id": "20",
    "nome": "paint it black",
    "artista": "the rolling stones",
    "imgpath": "img/paintitblack.jpg",
    "audiopath": "music/soad_chopsuey.mp3"
  }
]

app.get('/musics', (req, res) => { //LISTAR MUSICAS + PROCURAR
  const nome = req.query.nome;
  if (nome == undefined) {
    res.json(musicas);
    return
  } else {
    const musica = musicas.find(value => value.nome == nome);
    if (musica == undefined) {
      res.sendStatus(404);
    } else {
      res.json(musica);
    }
  }
});

/* fim request de musicas */

/* request de usuarios */
const accounts = [
  {
    "id": 1,
    "username": "admin",
    "email": "admin",
    "password": "123"
  },
  {
    "id": 2,
    "username": "Tester",
    "email": "a",
    "password": "a"
  },
  {
    "username": "Sarmuns",
    "email": "samuel@gmail.com",
    "password": "123",
    "id": 3
  }
]

app.get('/accounts', (req, res) => { // LOGIN e GET ACCOUNTS
  const { email, password } = req.query;
  if (email == undefined || password == undefined) {
    res.json(accounts)
    return
  } else {
    const account = accounts.find(value => value.email == email);
    if (account.password != password || account == undefined) {
      res.sendStatus(401);
    } else {
      const treatedAccount = [account]
      res.json(treatedAccount);
    }
  }
});

app.get('/accounts/:id', (req, res) => { // GET ACCOUNT BY ID')
  const id = parseInt(req.params.id);
  if (id != undefined) {
    const account = accounts.find(value => value.id == id);
    if (account == undefined) {
      res.sendStatus(404);
    } else {
      res.json(account);
    }
  }
});

app.post('/accounts', (req, res) => { // CADASTRO
  const { username, email, password } = req.body;
  if (username == undefined || email == undefined || password == undefined) {
    res.sendStatus(400);
    return
  } else {
    const account = accounts.find(value => value.email == email);
    if (account != undefined) {
      res.sendStatus(400);
    } else {
      const id = accounts.length + 1;
      const newAccount = {
        "id": id,
        "username": username,
        "email": email,
        "password": password
      }
      accounts.push(newAccount);
      res.sendStatus(201);
    }
  }
});

app.put('/accounts/:id', (req, res) => { // EDITAR CONTA
  const id = parseInt(req.params.id);
  const { username, email, password } = req.body;
  if (id != undefined) {
    const user = accounts.find(value => value.id == id);
    if (user != undefined) {
      user.username = username;
      user.email = email;
      user.password = password;
      res.sendStatus(200);
    }
  }
});

/* fim request de usuarios */
/* request de playlist gratis */
const playlists = [
  {
    "nome": "rock alternativo",
    "id": 0,
    "fotoplaylist": "playlist/rockalternativo.jpg",
    "musicas": [
      {
        "nome": "given up",
        "artista": "linkin park",
        "album": "hybrid theory",
        "genero": "rock alternativo",
        "fotoalbum": "https://example.com/hybrid-theory.jpg",
        "audiofile": "/music/linkinpark_givenup.mp3"
      },
      {
        "nome": "chop suey!",
        "artista": "system of a down",
        "album": "toxicity",
        "genero": "rock alternativo",
        "fotoalbum": "https://example.com/toxicity.jpg",
        "audiofile": "/music/soad_chopsuey.mp3"
      },
      {
        "nome": "kryptonite",
        "artista": "3 doors down",
        "album": "the better life",
        "genero": "rock alternativo",
        "fotoalbum": "https://example.com/the-better-life.jpg",
        "audiofile": "https://example.com/3-doors-down-kryptonite.mp3"
      },
      {
        "nome": "everlong",
        "artista": "foo fighters",
        "album": "the colour and the shape",
        "genero": "rock alternativo",
        "fotoalbum": "https://example.com/the-colour-and-the-shape.jpg",
        "audiofile": "https://example.com/foo-fighters-everlong.mp3"
      },
      {
        "nome": "last resort",
        "artista": "papa roach",
        "album": "infest",
        "genero": "rock alternativo",
        "fotoalbum": "https://example.com/infest.jpg",
        "audiofile": "https://example.com/papa-roach-last-resort.mp3"
      }
    ]
  },
  {
    "nome": "rock internacional",
    "id": 1,
    "fotoplaylist": "/playlist/rockinternacional.jpg",
    "musicas": [
      {
        "nome": "sweet child o' mine",
        "artista": "guns n' roses",
        "album": "appetite for destruction",
        "genero": "rock internacional",
        "fotoalbum": "https://example.com/appetite-for-destruction.jpg",
        "audiofile": "https://example.com/guns-n-roses-sweet-child-o-mine.mp3"
      },
      {
        "nome": "livin' on a prayer",
        "artista": "bon jovi",
        "album": "slippery when wet",
        "genero": "rock internacional",
        "fotoalbum": "https://example.com/slippery-when-wet.jpg",
        "audiofile": "https://example.com/bon-jovi-livin-on-a-prayer.mp3"
      },
      {
        "nome": "stairway to heaven",
        "artista": "led zeppelin",
        "album": "led zeppelin iv",
        "genero": "rock internacional",
        "fotoalbum": "https://example.com/led-zeppelin-iv.jpg",
        "audiofile": "https://example.com/led-zeppelin-stairway-to-heaven.mp3"
      }
    ]
  },
  {
    "nome": "linkin park",
    "id": 2,
    "fotoplaylist": "/playlist/linkinpark.jpg",
    "musicas": [
      {
        "nome": "numb",
        "artista": "linkin park",
        "album": "meteora",
        "genero": "nu metal",
        "fotoalbum": "https://example.com/meteora.jpg",
        "audiofile": "https://example.com/linkin-park-numb.mp3"
      },
      {
        "nome": "papercut",
        "artista": "linkin park",
        "album": "hybrid theory",
        "genero": "rock alternativo",
        "fotoalbum": "https://example.com/hybrid-theory.jpg",
        "audiofile": "https://example.com/linkin-park-papercut.mp3"
      },
      {
        "nome": "given up",
        "artista": "linkin park",
        "album": "hybrid theory",
        "genero": "nu metal",
        "fotoalbum": "https://example.com/hybrid-theory.jpg",
        "audiofile": "https://example.com/linkin-park-crawling.mp3"
      },
      {
        "nome": "breaking the habit",
        "artista": "linkin park",
        "album": "meteora",
        "genero": "nu metal",
        "fotoalbum": "https://example.com/meteora.jpg",
        "audiofile": "https://example.com/linkin-park-breaking-the-habit.mp3"
      }
    ]
  },
  {
    "nome": "para malhar",
    "id": 3,
    "fotoplaylist": "/playlist/paramalhar.jpg",
    "musicas": [
      {
        "nome": "can't hold us",
        "artista": "macklemore & ryan lewis feat. ray dalton",
        "album": "the heist",
        "genero": "hip hop",
        "fotoalbum": "https://example.com/the-heist.jpg",
        "audiofile": "https://example.com/macklemore-ryan-lewis-cant-hold-us.mp3"
      },
      {
        "nome": "lose yourself",
        "artista": "eminem",
        "album": "8 mile soundtrack",
        "genero": "hip hop",
        "fotoalbum": "https://example.com/8-mile-soundtrack.jpg",
        "audiofile": "https://example.com/eminem-lose-yourself.mp3"
      },
      {
        "nome": "eye of the tiger",
        "artista": "survivor",
        "album": "eye of the tiger",
        "genero": "rock",
        "fotoalbum": "https://example.com/eye-of-the-tiger.jpg",
        "audiofile": "https://example.com/survivor-eye-of-the-tiger.mp3"
      }
    ]
  },
  {
    "nome": "bossa nova",
    "id": 4,
    "fotoplaylist": "/playlist/bossanova.jpg",
    "musicas": [
      {
        "nome": "garota de ipanema",
        "artista": "antônio carlos jobim",
        "album": "the composer of desafinado, plays",
        "genero": "bossa nova",
        "fotoalbum": "https://example.com/the-composer-of-desafinado-plays.jpg",
        "audiofile": "https://example.com/antonio-carlos-jobim-garota-de-ipanema.mp3"
      },
      {
        "nome": "desafinado",
        "artista": "tom jobim & newton mendonça",
        "album": "joão gilberto",
        "genero": "bossa nova",
        "fotoalbum": "https://example.com/joao-gilberto.jpg",
        "audiofile": "https://example.com/tom-jobim-newton-mendonca-desafinado.mp3"
      },
      {
        "nome": "chega de saudade",
        "artista": "joão gilberto",
        "album": "chega de saudade",
        "genero": "bossa nova",
        "fotoalbum": "https://example.com/chega-de-saudade.jpg",
        "audiofile": "https://example.com/joao-gilberto-chega-de-saudade.mp3"
      },
      {
        "nome": "wave",
        "artista": "antônio carlos jobim",
        "album": "wave",
        "genero": "bossa nova",
        "fotoalbum": "https://example.com/wave.jpg",
        "audiofile": "https://example.com/antonio-carlos-jobim-wave.mp3"
      }
    ]
  }
]

app.get('/playlists', (req, res) => { // LISTAR PLAYLISTS GRATUÍTAS
  res.json(playlists);
});

/* fim request de playlist gratis */

/* request de playlist usarios */
const userPlaylists = [
  {
    "name": "Rockzao",
    "musics": [
      19,
      20,
      18,
      2
    ],
    "userid": 1,
    "id": 1
  },
  {
    "name": "Play admin",
    "musics": [
      15,
      14,
      20
    ],
    "userid": 1,
    "id": 2
  },
  {
    "name": "Playlist do Samuel",
    "musics": [
      10,
      7,
      18,
      13
    ],
    "userid": 3,
    "id": 3
  }
]

app.get('/userplaylists', (req, res) => { //LISTAR TODAS AS PLAYLISTS DE TODOS OS USUÁRIOS / LISTAR PLAYLISTS DE UM USUÁRIO
  const {userid, all} = req.query;
  if(all != undefined){ // LISTAR TODAS AS PLAYLISTS
    res.json(userPlaylists);
    return
  }
  if (userid == undefined) {
    res.sendStatus(400);
    return
  } else {
    const userplaylist = userPlaylists.filter(value => value.userid == userid);
    if (userplaylist == undefined) {
      res.sendStatus(404);
    } else {
      res.json(userplaylist);
    }
  }
});

app.post('/userplaylists', (req, res) => {
  const { name, musics, userid } = req.body;
  if (name == undefined || musics == undefined || userid == undefined) {
    res.sendStatus(400);
    return
  } else {
    const id = userPlaylists.length + 1;
    const newPlaylist = {
      "name": name,
      "musics": musics,
      "userid": userid,
      "id": id
    }
    userPlaylists.push(newPlaylist);
    res.sendStatus(201);
  }
});

app.put('/userplaylists/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, musics } = req.body;

  if (id != undefined) {
    var playlist = userPlaylists.find(value => value.id == id);
    if (playlist == undefined) {
      res.sendStatus(404); //nao achou a playlist pelo ID
      return
    }
  } else {
    res.sendStatus(400); //não veio ID no request
    return
  }
  if(name == undefined && musics == undefined){
    res.status(400)
    return
  } else if (name != undefined) {
    playlist.name = name;
  } else if (musics != undefined) {
    playlist.musics = musics;
  }

  res.status(200).json(playlist);
});

app.delete('/userplaylists/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id != undefined) {
    const index = userPlaylists.findIndex(value => value.id == id);
    if (index == -1) {
      res.sendStatus(404);
    } else {
      userPlaylists.splice(index, 1);
      res.sendStatus(200);
    }
  }
});

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('trabweb', 'sarmuns', 'docker', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


// Define Musicas model
class Musicas extends Model {}
Musicas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
    },
    artista: {
      type: DataTypes.STRING,
    },
    imgpath: {
      type: DataTypes.STRING,
    },
    audiopath: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Musicas',
    tableName: 'Musicas',
  }
);

// Define Accounts model
class Accounts extends Model {}
Accounts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Accounts',
    tableName: 'Accounts',
  }
);

// Define userPlaylists model
class UserPlaylists extends Model {}
UserPlaylists.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    musics: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    userid: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'UserPlaylists',
    tableName: 'userPlaylists',
  }
);


const fetchTablesData = async () => {
  try {
    const musicas = await Musicas.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    const accounts = await Accounts.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    const userPlaylists = await UserPlaylists.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    console.log('Musicas:');
    console.log(musicas.map((musica) => musica.dataValues));

    console.log('Accounts:');
    console.log(accounts.map((account) => account.dataValues));

     console.log('User Playlists:');
    console.log(userPlaylists.map((playlist) => playlist.dataValues));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchTablesData();


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});