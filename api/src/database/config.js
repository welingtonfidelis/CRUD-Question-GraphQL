const mongoose = require('mongoose');
require('dotenv/config');

try {
    const con =  process.env.MONGODB_CONN;
    mongoose.connect(con, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

} catch (error) {
    console.log('Erro de conexão com banco', error.message | error);
}