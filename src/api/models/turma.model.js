const mongoose = require('mongoose');

const turmaSchema = new mongoose.Schema({
  descricao: {
    type: String,
    trim: true,
    maxlength: 300,
  },
  alias: {
    type: String,
    maxlength: 200,
  },
  cursos: [{
    type: mongoose.Types.ObjectId,
    required: true,
  }],
  materias: [{
    nome: {
      type: String,
      trim: true,
    },
    descricao: {
      type: String,
      trim: true,
    },
    professores: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Professor',
    }],
  }],
});

module.exports = mongoose.model('Turma', turmaSchema);
