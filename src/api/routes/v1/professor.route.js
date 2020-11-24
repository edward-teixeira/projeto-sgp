const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/professor.controller');
const userController = require('../../controllers/user.controller');
const { uploadAzure } = require('../../middlewares/azure-storage');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  createProfessor,
  listProfessor,
  updateProfessor,
  replaceProfessor,
} = require('../../validations/professor.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', userController.load);


router
  .route('/')
  /**
   * @api {get} v1/professor List Professores
   * @apiDescription Get a list of Professores
   * @apiVersion 1.0.0
   * @apiName ListProfessores
   * @apiGroup Professor
   * @apiPermission User
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Users per page
   * @apiParam  {String}             [name]       Professor's nome
   * @apiParam  {String}             [email]      Professor's email
   * @apiParam  {String=user,admin}  [role]       Professor's situacao
   *
   * @apiSuccess {Object[]} users List of Professores.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(ADMIN), validate(listProfessor), controller.list)
  /**
   * @api {post} v1/professors Create Professor
   * @apiDescription Create a new professor
   * @apiVersion 1.0.0
   * @apiName CreateProfessor
   * @apiGroup Professor
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String{2...200}}                 [nome]     Professor nome
   * @apiParam  {String{6..200}}                  [formacao] Professor formacao
   * @apiParam  {URI}                             [lattes]   Professor Lattes
   * @apiParam  {String=professor,situacaoEnum}   [situacaoEnum] Professor Situacao
   * @apiParam  {String}                          [cargos]     Professor Cargos
   * @apiParam  {String}                          [portaria]   Professor's portaria
   * @apiParam  {String}                          [email]      Professor's email
   *
   * @apiSuccess (Created 201) {String}  id         Professor's id
   * @apiSuccess (Created 201) {String}  nome       Professors nome
   * @apiSuccess (Created 201) {String}  foto       Professor's foto
   * @apiSuccess (Created 201) {String}  formacao   Professor's formacao
   * @apiSuccess (Created 201) {String}  lattes     Professor's lattes
   * @apiSuccess (Created 201) {String}  situacao   Professor's situacao
   * @apiSuccess (Created 201) {String}  cargos     Professor's cargos
   * @apiSuccess (Created 201) {String}  cargaHoraria     Professor's carga horaria
   * @apiSuccess (Created 201) {String}  portaria    Professor's portaria
   * @apiSuccess (Created 201) {String}  matricula    Professor's matricula
   * @apiSuccess (Created 201) {String}  email      Professor's email
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createProfessor), uploadAzure.single('foto'), controller.create);

router
  .route('/:userId')
  /**
   * @api {get} v1/users/:id Get Professor
   * @apiDescription Get professor information
   * @apiVersion 1.0.0
   * @apiName GetProfessor
   * @apiGroup Professor
   * @apiPermission all
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id         User's id
   * @apiSuccess {String}  name       User's name
   * @apiSuccess {String}  email      User's email
   * @apiSuccess {String}  role       User's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/users/:id Replace Professor
   * @apiDescription Replace the whole professor document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceProfessor
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             email     User's email
   * @apiParam  {String{6..128}}     password  User's password
   * @apiParam  {String{..128}}      [name]    User's name
   * @apiParam  {String=user,admin}  [role]    User's role
   * (You must be an admin to change the user's role)
   *
   * @apiSuccess {String}  id         User's id
   * @apiSuccess {String}  name       User's name
   * @apiSuccess {String}  email      User's email
   * @apiSuccess {String}  role       User's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(authorize(LOGGED_USER), controller.replace)
  /**
   * @api {patch} v1/users/:id Update Professor
   * @apiDescription Update some fields of a user document
   * @apiVersion 1.0.0
   * @apiName UpdateProfessor
   * @apiGroup Professor
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             email     User's email
   * @apiParam  {String{6..128}}     password  User's password
   * @apiParam  {String{..128}}      [name]    User's name
   * @apiParam  {String=user,admin}  [role]    User's role
   * (You must be an admin to change the user's role)
   *
   * @apiSuccess {String}  id         User's id
   * @apiSuccess {String}  name       User's name
   * @apiSuccess {String}  email      User's email
   * @apiSuccess {String}  role       User's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .patch(authorize(LOGGED_USER), controller.update)
  /**
   * @api {patch} v1/users/:id Delete Professor
   * @apiDescription Delete a Professor
   * @apiVersion 1.0.0
   * @apiName DeleteProfessor
   * @apiGroup Professor
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .delete(authorize(LOGGED_USER), controller.remove);


module.exports = router;
