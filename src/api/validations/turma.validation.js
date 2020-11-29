const Joi = require('joi');

module.exports = {

  // GET /v1/turma
  listTurma: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      nome: Joi.string(),
      descricao: Joi.string(),
    },
  },

  // POST /v1/turma
  createTurma: {
    body: {
      descricao: Joi.string().max(300),
      alias: Joi.string().max(200),
      cursos: Joi.array().items(Joi.string()).min(1).required(),
      materias: Joi.array().items(Joi.object({
        nome: Joi.string().required(),
        descricao: Joi.string(),
        professores: Joi.array().items(Joi.string().regex(/^[a-fA-F0-9]{24}$/)),
      })).min(1).required(),
    },
  },

  // PUT /v1/turma/:turmaId
  replaceTurma: {
    body: {
      descricao: Joi.string().max(300),
      alias: Joi.string().max(200),
      cursos: Joi.array().items(Joi.string()).min(1).required(),
      materias: Joi.array().items(Joi.object({
        nome: Joi.string().required(),
        descricao: Joi.string(),
        professores: Joi.array().items(Joi.string().regex(/^[a-fA-F0-9]{24}$/)),
      })).min(1).required(),
    },
    params: {
      cursoId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/turma/:turmaId
  updateTurma: {
    body: {
      descricao: Joi.string().max(300),
      alias: Joi.string().max(200),
      cursos: Joi.array().items(Joi.string()).min(1).required(),
      materias: Joi.array().items(Joi.object({
        nome: Joi.string().required(),
        descricao: Joi.string(),
        professores: Joi.array().items(Joi.string().regex(/^[a-fA-F0-9]{24}$/)),
      })).min(1).required(),
    },
    params: {
      turmaId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
