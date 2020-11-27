const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

// turmas: [{
//   type: mongoose.SchemaTypes.ObjectId,
//   descricao: {
//     type: String,
//     trim: true,
//     maxlength: 300,
//   },
//   alias: {
//     type: String,
//     maxlength: 200,
//   },
//   turno: {
//     type: String,
//     required: true,
//     maxlength: 200,
//   },
//   materias: [{
//     type: mongoose.SchemaTypes.ObjectId,
//     nome: {
//       type: String,
//       trim: true,
//     },
//     descricao: {
//       type: String,
//       trim: true,
//     },
//     diasMinistrados: [{
//       type: mongoose.SchemaTypes.ObjectId,
//       diaDaSemana: String,
//       trim: true,
//       horarioInicio: {
//         type: Date,
//       },
//       horarioFim: {
//         type: Date,
//       },
//     }],
//     professores: [{
//       type: mongoose.SchemaTypes.ObjectId,
//       ref: 'Professor',
//     }],
//   }],
// }],

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
