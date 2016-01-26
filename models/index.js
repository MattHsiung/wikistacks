var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new Schema({
  title:    {type: String, required: true},
  urlTitle: {type: String, required: true},
  content:  {type: String, required: true},
  status:   {type: String, enum: ['open', 'closed']},
  date:     {type: Date, default: Date.now},
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  tags: [{type: String}]
});

function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

function generateTags (string){
  return string[0].split(" ")
}

pageSchema.pre('validate', function(next){
  this.urlTitle = generateUrlTitle(this.title)
  console.log(this.tags)
  this.tags = generateTags(this.tags)
  next();
})

pageSchema.statics.findByTags = function(tags){
  return this.find({
    tags: {$in: tags}
  }).exec()
}

pageSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Page').find({ $and: [{tags: {$in: this.tags} },{ _id: { $ne: this._id }} ]}, cb);
}

pageSchema.virtual('route').get(function () {
  return '/wiki/'+this.urlTitle;
});

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};