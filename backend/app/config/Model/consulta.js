var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ConsultaSchema = new Schema({
    dataConsulta: Date,
    porcEntrada: Number,
    taxa: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});
mongoose.model('Consulta', ConsultaSchema);

module.exports = mongoose.model('Consulta');