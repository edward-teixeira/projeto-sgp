const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');
const Turma = require('../models/turma.model');

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
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Get Turma By Id
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const turma = await Turma.findById(req.params.turmaId);
    res.status(httpStatus.OK);
    res.json(turma);
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new Professor
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const turma = new Turma(req.body);
    const savedturma = await turma.save();
    res.status(httpStatus.CREATED);
    res.json(savedturma);
  } catch (error) {
    next(error);
  }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const turma = await Turma.findById(req.params.turmaId);
    if (!turma) {
      next();
    }
    const newTurma = new Turma(req.body);
    const newTurmaObject = omit(newTurma.toObject(), '_id');

    const savedTurma = await Turma.findByIdAndUpdate(turma._id, newTurmaObject);
    res.status(httpStatus.OK);
    res.json(savedTurma);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing professor
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const turma = await Turma.findById(req.params.turmaId);
    if (!turma) {
      next();
    }
    const newTurma = new Turma(req.body);
    const newTurmaObject = omit(newTurma.toObject(), '_id');

    const savedTurma = await Turma.findByIdAndUpdate(turma._id, newTurmaObject);
    res.status(httpStatus.OK);
    res.json(savedTurma);
  } catch (error) {
    next(error);
  }
};

/**
 * Get professor list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const turmas = await Turma.find(req.query);
    res.status(httpStatus.OK);
    res.json(turmas);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete professor
 * @public
 */
exports.remove = async (req, res, next) => {
  const turmaToDelete = await Turma.findByIdAndRemove(req.params.turmaId);
  res.status(httpStatus.OK);
  res.json(turmaToDelete);
};
