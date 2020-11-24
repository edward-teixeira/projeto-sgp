const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');

const situacaoEnum = ['afastado', 'efetivo', 'contratado', 'substituto', 'cedido'];

const professorSchema = new mongoose.Schema({
  nome: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  foto: {
    type: String,
    trim: true,
  },
  formacao: {
    type: String,
    trim: true,
    minLength: 6,
    maxlength: 200,
    required: true,
  },
  lattes: {
    type: String,
    trim: true,
  },
  situacao: {
    type: String,
    enum: situacaoEnum,
    descricao: {
      type: String,
      trim: true,
    },
  },
  cargos: [{
    type: String,
    trim: true,
    required: true,
  }],
  cargaHoraria: {
    type: String,
    trim: true,
  },
  portaria: {
    type: String,
    trim: true,
    required: true,
  },
  matricula: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  email: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

professorSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      'id', 'nome', 'foto', 'formacao', 'lattes', 'situacao', 'cargos',
      'cargaHoraria', 'portaria', 'matricula', 'email',
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

professorSchema.statics = {
  situacaoEnum,

  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'email',
          location: 'body',
          messages: ['"email" já existe'],
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },

  list({
    page = 1, perPage = 30, nome, email, situacao,
  }) {
    const options = omitBy({ nome, email, situacao }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};

module.exports = mongoose.model('Professor', professorSchema);
