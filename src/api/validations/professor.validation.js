const Joi = require('joi');
const Professor = require('../models/professor.model');

module.exports = {

  // GET /v1/Professor
  listProfessor: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      email: Joi.string(),
      role: Joi.string().valid(Professor.situacaoEnum),
    },
  },

  // POST /v1/Professor
  createProfessor: {
    body: {
      nome: Joi.string().required().min(2).max(200),
      formacao: Joi.string().required().min(6).max(200),
      lattes: Joi.string().uri(),
      situacao: Joi.string().valid(Professor.situacaoEnum),
      cargos: Joi.array().required(),
      portaria: Joi.string().required(),
      matricula: Joi.string().required().min(5).max(100),
      email: Joi.string().email().required(),
    },
  },

  // PUT /v1/professor/:professorId
  replaceProfessor: {
    body: {
      nome: Joi.string().required().min(2).max(200),
      formacao: Joi.string().required().min(6).max(200),
      lattes: Joi.string().uri(),
      situacao: Joi.string().valid(Professor.situacaoEnum),
      cargos: Joi.array().required(),
      portaria: Joi.string().required(),
      matricula: Joi.string().required().min(5).max(100),
      email: Joi.string().email().required(),
    },
    params: {
      professorId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/professor/:professorId
  updateProfessor: {
    body: {
      nome: Joi.string().required().min(2).max(200),
      formacao: Joi.string().required().min(6).max(200),
      lattes: Joi.string().uri(),
      situacao: Joi.string().valid(Professor.situacaoEnum),
      cargos: Joi.array().required(),
      portaria: Joi.string().required(),
      matricula: Joi.string().required().min(5).max(100),
      email: Joi.string().email().required(),
    },
    params: {
      professorId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
