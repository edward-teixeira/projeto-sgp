const httpStatus = require('http-status');
const { omit } = require('lodash');
const Professor = require('../models/professor.model');
const User = require('../models/user.model');

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
exports.get = (req, res) => res.json(req.locals.user.transform());

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
    const professor = Professor.findById(req.params.id);
    const newProfessor = new Professor(req.body);
    const newProfessorObject = omit(newProfessor.toObject(), '_id');

    await professor.updateOne(newProfessorObject, { override: true, upsert: true });
    const savedUser = await Professor.findById(professor._id);

    res.json(savedUser.transform());
  } catch (error) {
    next(Professor.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = (req, res, next) => {
  const updatedUser = omit(req.body);
  const user = Object.assign(req.locals.user, updatedUser);

  user.save()
    .then(savedUser => res.json(savedUser.transform()))
    .catch(e => next(Professor.checkDuplicateEmail(e)));
};

/**
 * Get user list
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
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const professor = Professor.findById(req.params.id);

  professor.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
