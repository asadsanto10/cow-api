import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createCow, deleteCowById, getAllCows, getCowById, updateCowById } from './cow.controller';
import { cowValidation } from './cow.validation';

const router = express.Router();

router.post('/', validateRequest(cowValidation.createCowZodSchema), createCow);
router.get('/:id', getCowById);
router.patch('/:id', validateRequest(cowValidation.updateCowZodSchema), updateCowById);
router.delete('/:id', deleteCowById);
router.get('/', getAllCows);

export const cowRoutes = router;
