
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
    timestamps: false,
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
    timestamps: false,
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
    timestamps: false,
  }
);

// Define the "freeplaylists" model
const FreePlaylist = sequelize.define('freeplaylists', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fotoplaylist: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

// Define the "freemusicas" model
const FreeMusica = sequelize.define('freemusicas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  artista: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  album: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fotoalbum: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  audiofile: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

// Define the "freeplaylist_musicas" model
const FreePlaylistMusica = sequelize.define('freeplaylist_musicas', {
  playlist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: FreePlaylist,
      key: 'id',
    },
  },
  musica_id: {
    type: DataTypes.INTEGER,
    references: {
      model: FreeMusica,
      key: 'id',
    },
  },
}, {
  tableName: 'freeplaylist_musicas',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['playlist_id', 'musica_id'],
    },
  ],
});

// Define associations between the models
FreePlaylist.belongsToMany(FreeMusica, {
  through: FreePlaylistMusica,
  foreignKey: 'playlist_id',
});
FreeMusica.belongsToMany(FreePlaylist, {
  through: FreePlaylistMusica,
  foreignKey: 'musica_id',
});

// global variables
let musicas = [];
 let accounts = [];
 let userPlaylists = [];
 let playlists = [];
// Fetch all Tables
const fetchTablesData = async () => {
  try {
    musicas = await Musicas.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    accounts = await Accounts.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    userPlaylists = await UserPlaylists.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    
    let freePlaylists = await FreePlaylist.findAll({
      include: [
        {
          model: FreeMusica,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    playlists = freePlaylists.map((playlist) => {
      return {
        nome: playlist.nome,
        id: playlist.id,
        fotoplaylist: playlist.fotoplaylist,
        musicas: playlist.freemusicas.map((musica) => ({
          nome: musica.nome,
          artista: musica.artista,
          album: musica.album,
          genero: musica.genero,
          fotoalbum: musica.fotoalbum,
          audiofile: musica.audiofile,
        })),
      };
    });


    musicas = musicas.map((musica) => musica.dataValues);
    accounts = accounts.map((account) => account.dataValues);
    userPlaylists = userPlaylists.map((playlist) => playlist.dataValues);

    console.log(musicas)

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchTablesData();


/* request de musicas */

app.get('/musics', (req, res) => { //Listar + Procurar
  const query = req.query.nome;
  
  if (!query) {
    res.json(musicas);
    return;
  }
  
  const filteredMusicas = musicas.filter(musica => musica.nome.includes(query));
  
  if (filteredMusicas.length === 0) {
    res.sendStatus(404);
  } else {
    res.json(filteredMusicas);
  }
});


/* fim request de musicas */

/* request de usuarios */

app.get('/accounts', (req, res) => { // LOGIN e GET ACCOUNTS
  fetchTablesData();
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
  fetchTablesData();
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

app.post('/accounts', async (req, res) => {
  const { username, email, password } = req.body;
  if (username === undefined || email === undefined || password === undefined) {
    res.sendStatus(400);
    return;
  }

  try {
    const accountCount = await Accounts.count(); // Get the number of existing accounts

    const account = await Accounts.findOne({ 
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (account !== null) {
      res.sendStatus(400);
    } else {
      const newAccount = await Accounts.create(
        { id: accountCount + 1, username, email, password }, // Set the id based on the number of existing accounts
        { fields: ['id', 'username', 'email', 'password'] }
      );
      res.sendStatus(201);
    }
  } catch (error) {
    console.error('Error creating account:', error);
    res.sendStatus(500);
  }
  fetchTablesData();
});

app.put('/accounts/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { username, email, password } = req.body;
  
  try {
    const account = await Accounts.findByPk(id);
    
    if (account !== null) {
      await account.update({ username, email, password });
      res.status(200).json({ id: account.id, username, email, password });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error updating account:', error);
    res.sendStatus(500);
  }
  fetchTablesData();
});


/* fim request de usuarios */
/* request de playlist gratis */


app.get('/playlists', (req, res) => { // LISTAR PLAYLISTS GRATUÍTAS
  res.json(playlists);
});

/* fim request de playlist gratis */

/* request de playlist usarios */

app.get('/userplaylists', (req, res) => { //LISTAR TODAS AS PLAYLISTS DE TODOS OS USUÁRIOS / LISTAR PLAYLISTS DE UM USUÁRIO
  fetchTablesData();
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

app.post('/userplaylists', async (req, res) => { // CREATE USER PLAYLIST
  const { name, musics, userid } = req.body;

  if (!name || !musics || !userid) {
    res.sendStatus(400);
    return;
  }

  try {
    const id = userPlaylists.length + 1;
    const newPlaylist = await UserPlaylists.create({
      id,
      name,
      musics,
      userid,
    });

    res.sendStatus(201);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.sendStatus(500);
  }
});





app.put('/userplaylists/:id', async (req, res) => { //EDIT USER PLAYLIST
  const id = parseInt(req.params.id);
  const { name, musics } = req.body;

  if (id !== undefined) {
    try {
      const playlist = await UserPlaylists.findByPk(id);

      if (!playlist) {
        res.sendStatus(404);
        return;
      }

      if (name !== undefined) {
        playlist.name = name;
      }

      if (musics !== undefined) {
        playlist.musics = musics;
      }

      await playlist.save();

      res.status(200).json(playlist);
    } catch (error) {
      console.error('Error updating playlist:', error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
  fetchTablesData();
});


app.delete('/userplaylists/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  
  if (id !== undefined) {
    try {
      const playlist = await UserPlaylists.findByPk(id);

      if (playlist === null) {
        res.sendStatus(404);
      } else {
        await playlist.destroy();
        res.sendStatus(200);
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
      res.sendStatus(500);
    }
  }
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});