const mongoose = require('mongoose')
const uri = 'mongodb://iker:qa7lQpHoEoHhb4Vr@ac-o5519p6-shard-00-00.mg84mw2.mongodb.net:27017,ac-o5519p6-shard-00-01.mg84mw2.mongodb.net:27017,ac-o5519p6-shard-00-02.mg84mw2.mongodb.net:27017/?ssl=true&replicaSet=atlas-oy5za2-shard-0&authSource=admin&retryWrites=true&w=majority';    

mongoose.connect(uri).then(db => console.log("DB conectada")).catch(err => console.log(err))

module.exports = mongoose;