const routes = require('express').Router();
const projectController = require('../controllers/ProjectController');

routes.post('/projects/add', projectController.addProject);
routes.get('/projects', projectController.getProjects);
routes.get('/projects/:id', projectController.getProjectById);
routes.put('/projects/:id', projectController.updateProject);
routes.delete('/projects/:id', projectController.deleteProject);
routes.get("/getprojectsbyuserid/:userId", projectController.getAllProjectsByUserId)


module.exports = routes;
