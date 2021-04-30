
const Book = {};

const User = require('./user');

Book.getAllBooks = async (request, response) => {
  const email = request.query.email;
  await User.find({ email }, (err, users) => {
    if(err) console.error(err);
    if(!users.length) {
      response.send('user not found');
    } else {
      const user = users[0];
      response.send(user.books);
    }
  })
}

Book.createBook = async (request, response) => {
  console.log(request.body);
  const {name, description, email} = request.body;
  const newBook = {name, description};
  await User.find({ email }, (err, users) => {
    if (err) console.error(err);
    if (!users.length) {
      response.send('no user found');
      return;
    }
    const user = users[0];
    user.books.push(newBook);
    user.save();
    response.send(user.newBook);
  })
}

Book.deleteBook = async (request, response) => {
  const index = Number(request.params.index);
  const email = request.query.email;
  await User.find({ email }, (err, users) => {
    if(err) console.error(err);
    const user = users[0];
    const newBookArray = user.books.filter((_, i) => i !== index);
    user.books = newBookArray;
    user[0].save();
    response.send('success!');
  })
}

Book.updateBook = async (request, response) => {
  const index = Number(request.params.index);
  const newBook = request.body.newBook;
  const email = request.body.email;

  await User.find({ email }, (err, users) => {
    if(err) console.error(err);
    const user = users[0];
    user.books.splice(index, 1, newBook);
    user.save();
    response.send(user.books);
  });
}


module.exports = Book;
