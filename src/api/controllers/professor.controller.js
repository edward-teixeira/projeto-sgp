const httpStatus = require('http-status');
const { omit } = require('lodash');
const Professor = require('../models/professor.model');
const User = require('../models/user.model');
const uploadService = require('../services/azure-upload.service');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get user
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const professor = await Professor.findById(req.params.professorId);
    res.json(professor.transform());
  } catch (error) {
    return next(error);
  }
};

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Create new Professor
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    if (!req.file) {
      const prof = new Professor(req.body);
      const savedProf = await prof.save();
      res.status(httpStatus.CREATED);
      return res.json(savedProf.transform());
    }
    const fileName = req.file.url.split('?')[0];
    const newProfessor = {
      nome: req.body.nome,
      foto: fileName,
      formacao: req.body.formacao,
      lattes: req.body.lattes,
      situacao: req.body.situacao,
      cargos: req.body.cargos,
      cargaHoraria: req.body.cargaHoraria,
      portaria: req.body.portaria,
      matricula: req.body.matricula,
      email: req.body.email,
    };
    const prof = new Professor(newProfessor);
    const savedProf = await prof.save();
    res.status(httpStatus.CREATED);
    return res.json(savedProf.transform());
  } catch (error) {
    next(Professor.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const professor = await Professor.findById(req.params.professorId);
    if (req.file && (req.file.url.split('?')[0] !== professor.foto)) {
      await uploadService.deleteBlob(professor.foto);
      // eslint-disable-next-line prefer-destructuring
      professor.foto = req.file.url.split('?')[0];
    }
    const newProfessor = new Professor(req.body);
    const newProfessorObject = omit(newProfessor.toObject(), '_id');

    await professor.updateOne(newProfessorObject, { override: true, upsert: true });
    const savedProfessor = await Professor.findById(professor._id);

    res.json(savedProfessor.transform());
  } catch (error) {
    next(Professor.checkDuplicateEmail(error));
  }
};

/**
 * Update existing professor
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const professor = await Professor.findById(req.params.professorId);
    if (req.file && (req.file.url.split('?')[0] !== professor.foto)) {
      await uploadService.deleteBlob(professor.foto);
      // eslint-disable-next-line prefer-destructuring
      professor.foto = req.file.url.split('?')[0];
    }
    const newProfessor = new Professor(req.body);
    const newProfessorObject = omit(newProfessor.toObject(), '_id');

    await professor.updateOne(newProfessorObject, { override: true, upsert: true });
    const savedProfessor = await Professor.findById(professor._id);
    res.json(savedProfessor.transform());
  } catch (error) {
    next(Professor.checkDuplicateEmail(error));
  }
};

/**
 * Get professor list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const professors = await Professor.list(req.query);
    const transformedProfessors = professors.map(prof => prof.transform());
    res.json(transformedProfessors);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete professor
 * @public
 */
exports.remove = async (req, res, next) => {
  const professor = Professor.findById(req.params.id);
  if (professor.foto) {
    await uploadService.deleteBlob(professor.foto);
  }
  professor.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
