const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');
const Curso = require('../models/curso.model');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    next();
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const curso = await Curso.findById(req.params.cursoId);
    res.status(httpStatus.OK);
    res.json(curso.transform());
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newCurso = new Curso(req.body);
    const savedCurso = await newCurso.save();
    res.status(httpStatus.CREATED);
    res.json(savedCurso.transform());
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const cursos = await Curso.find(req.query);
    const transformedCursos = cursos.map(c => c.transform());
    res.status(httpStatus.OK);
    res.json(transformedCursos);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const curso = await Curso.findById(req.params.cursoId);
    const newCurso = new Curso(req.body);
    const newCursoObject = omit(newCurso.toObject(), '_id');
    await curso.updateOne(newCursoObject, { override: true, upsert: true });
    const savedCurso = await Curso.findById(curso._id);
    res.status(httpStatus.OK);
    res.json(savedCurso.transform());
  } catch (error) {
    next(error);
  }
};

exports.replace = async (req, res, next) => {
  try {
    const curso = await Curso.findById(req.params.cursoId);
    const newCurso = new Curso(req.body);
    const newCursoObject = omit(newCurso.toObject(), '_id');
    await curso.updateOne(newCursoObject, { override: true, upsert: true });
    const savedCurso = await Curso.findById(curso._id);
    res.status(httpStatus.OK);
    res.json(savedCurso.transform());
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const curso = await Curso.findById(req.params.cursoId);

  curso.remove()
    .then(() => res.json(httpStatus.NO_CONTENT).end())
    .catch(error => next(error));
};
