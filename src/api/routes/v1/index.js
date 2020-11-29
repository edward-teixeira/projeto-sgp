const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const professorRoutes = require('./professor.route');
const cursoRoutes = require('./curso.route');
const turmaRoutes = require('./turma.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));
router.use('/professor', professorRoutes);
router.use('/curso', cursoRoutes);
router.use('/turma', turmaRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
