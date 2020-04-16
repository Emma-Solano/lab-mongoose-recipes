const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({title : "Aguas Locas", cuisine: "Mexican Classics"})
    .then((newRecipe)=> console.log(newRecipe))
    .catch((err)=>console.log(err))

    Recipe.insertMany(data)
  .then(()=> {
    console.log("updated")
    Recipe.updateOne({ title: "Rigatoni alla Genovese" },{duration: 100})
  .then(()=> {
    Recipe.deleteOne({ title: "Carrot Cake"})
    .then(()=> {
      console.log("deleted")
      mongoose.connection.close()
      })
  })
  .catch((err)=>console.log(err))
  })
    data.forEach((element)=> {console.log(element.title)})})
  .catch((err)=>console.log(err))


  .catch(error => {
    console.error('Error connecting to the database', error);
  });


