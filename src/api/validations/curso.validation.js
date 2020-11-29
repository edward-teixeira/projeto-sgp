const Joi = require('joi');

module.exports = {

  // GET /v1/Curso
  listCurso: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      nome: Joi.string(),
      descricao: Joi.string(),
    },
  },

  // POST /v1/curso
  createCurso: {
    body: {
      nome: Joi.string().min(3).max(200).required(),
      descricao: Joi.string().max(300),
      periodos: Joi.number().required().min(1),
      coordenador: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PUT /v1/curso/:cursoId
  replaceCurso: {
    body: {
      nome: Joi.string().min(3).max(200).required(),
      descricao: Joi.string().max(300),
      periodos: Joi.number().required().min(1),
      coordenador: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
    params: {
      cursoId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/curso/:cursoId
  updateCurso: {
    body: {
      nome: Joi.string().min(3).max(200).required(),
      descricao: Joi.string().max(300),
      periodos: Joi.number().required().min(1),
      turno: Joi.string().max(200).required(),
      coordenador: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
    params: {
      cursoId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
