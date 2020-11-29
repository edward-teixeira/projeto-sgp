const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

const cursoSchema = new mongoose.Schema({
  nome: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: 300,
  },
  periodos: {
    type: Number,
  },
  turno: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },
  coordenador: {
    type: mongoose.Types.ObjectId,
    ref: 'Professor',
    required: true,
  },
});

cursoSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      '_id', 'nome', 'descricao', 'periodos', 'coordenador',
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

cursoSchema.statics = {
  list({
    page = 1, perPage = 30, nome, periodo,
  }) {
    const options = omitBy({ nome, periodo }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};

module.exports = mongoose.model('Curso', cursoSchema);
