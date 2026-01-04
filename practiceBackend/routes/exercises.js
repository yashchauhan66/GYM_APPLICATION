import express from 'express';
import {
    getAllExercises,
    getExerciseById,
    getExercisesByMuscle,
    getExercisesByType,
    getExercisesByEquipment,
    getExercisesByLevel,
    searchExercises
} from '../controllers/exerciseController.js';

const router = express.Router();

// Get all exercises
router.get('/', getAllExercises);

// Search exercises
router.get('/search', searchExercises);

// Get exercise by ID
router.get('/:id', getExerciseById);

// Get exercises by muscle group
router.get('/muscle/:muscle', getExercisesByMuscle);

// Get exercises by type
router.get('/type/:type', getExercisesByType);

// Get exercises by equipment
router.get('/equipment/:equipment', getExercisesByEquipment);

// Get exercises by difficulty level
router.get('/level/:level', getExercisesByLevel);

export default router; 