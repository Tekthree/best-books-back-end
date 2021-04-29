'use-strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors());

const PORT = 3002

mongoose.connect('mongodb://localhost:27017/cats', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to database')).catch(err => console.error(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

const User = require('./models/user');

const hunter = new User({ email: 'huntergbritten@gmail.com', book: [{ name: 'Game Of Thrones', description: 'The principal story chronicles the power struggle for the Iron Throne among the great Houses of Westeros following the death of King Robert in A Game of Thrones. Robert\'s heir apparent, the 13-year-old Joffrey, is immediately proclaimed king through the machinations of his mother, Queen Cersei Lannister.', status: 'available'}, { name: 'A Storm of Swords', description: 'A Storm of Swords continues the story where A Clash of Kings ended. The novel describes the increasingly vicious War of Five Kings in Westeros, Daenerys\'s strengthening forces in the East, and the oncoming threat of the Others, a ghostly army that is nearly invincible.', status: 'available'}, {name: 'Can\'t Hurt Me', description: 'In Can\'t Hurt Me, he shares his astonishing life story and reveals that most of us tap into only 40% of our capabilities. Goggins calls this The 40% Rule, and his story illuminates a path that anyone can follow to push past pain, demolish fear, and reach their full potential.', status: 'available' } ]});
hunter.save();

const tek = new User({ email: 'tekthree@gmail.com', book: [{ name: '', description: ''}, {name: '', description: ''}, { name: '', description: ''} ]})
tek.save();

app.get('/books', getAllBooks)
app.post('/books', createABook);

async function getAllBooks(request, response) {
  const { email } = request.query;
  console.log(email);
    try {
      const user = await User.find({email})
      console.log('Email in getAllBooks', user);
      console.log('made it', user);
      
      let books = user[0].book
      response.send(books);
      
    } catch(error) {
      console.error(error);
    }
}

function createABook(request, response) {
  
  const bodyBook = request.body.book;
  const { email, name , description } = request.body;
  // console.log(email, bodyBook);
  const newBook = {name, description};
  try {
    User.findOne({email}, (err, user) => {
      if(err) return console.error(err);
      user.book.push(newBook);
      console.log(newBook);
      user.save();
      response.send(user.book);
    })

  } catch (err) {
    console.error(err)
  }
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// terminal commands:
// mongo - enters mongo
// show dbs - shows all collections
// use <db> - switches to the collection you want to be in
