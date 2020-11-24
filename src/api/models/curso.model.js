const mongoose = require('mongoose');

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
  professores: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Professor',
  }],
  turmas: [{
    type: mongoose.SchemaTypes.ObjectId,
    descricao: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    alias: {
      type: String,
      maxlength: 200,
    },
    turno: {
      type: String,
      required: true,
      maxlength: 200,
    },
    materias: [{
      type: mongoose.SchemaTypes.ObjectId,
      nome: {
        type: String,
        trim: true,
      },
      descricao: {
        type: String,
        trim: true,
      },
      diasMinistrados: [{
        type: mongoose.SchemaTypes.ObjectId,
        diaDaSemana: String,
        trim: true,
        horarioInicio: {
          type: Date,
        },
        horarioFim: {
          type: Date,
        },
      }],
      professores: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Professor',
      }],
    }],
  }],
});

module.exports = mongoose.model('Curso', cursoSchema);
