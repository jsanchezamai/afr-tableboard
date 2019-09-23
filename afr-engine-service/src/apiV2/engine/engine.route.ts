import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './engine.controller';

const engine: Router = Router();
const controller = new Controller();

// Retrieve engine status
engine.get('/status', controller.status);

// Retrieve all Engines
engine.get('/all', controller.findAll);

// Retrieve a Specific User
engine.get('/:id', verifyToken, controller.findOne);

// Update a User with Id
engine.put('/:id', controller.update);

engine.post('', controller.insert);

// Delete a User with Id
engine.delete('/:id', controller.remove);

export default engine;
