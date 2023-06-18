import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.patch('/users/:id', validateRequest(userValidation.updateUserZodSchema), updateUser);
router.delete('/users/:id', deleteUser);
router.post('/auth/signup', validateRequest(userValidation.createUserZodSchema), createUser);

export const userRoutes = router;
