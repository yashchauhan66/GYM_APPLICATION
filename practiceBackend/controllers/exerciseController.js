import Exercise from '../models/Exercise.js';

// Get all exercises
export const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({});
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get exercise by ID
export const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get exercises by muscle group
export const getExercisesByMuscle = async (req, res) => {
    try {
        const exercises = await Exercise.find({ 
            primaryMuscles: { $regex: new RegExp(req.params.muscle, 'i') } 
        });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get exercises by type
export const getExercisesByType = async (req, res) => {
    try {
        const exercises = await Exercise.find({ 
            category: { $regex: new RegExp(req.params.type, 'i') } 
        });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get exercises by equipment
export const getExercisesByEquipment = async (req, res) => {
    try {
        const exercises = await Exercise.find({ 
            equipment: { $regex: new RegExp(req.params.equipment, 'i') } 
        });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get exercises by difficulty level
export const getExercisesByLevel = async (req, res) => {
    try {
        const exercises = await Exercise.find({ 
            level: { $regex: new RegExp(req.params.level, 'i') } 
        });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search exercises
export const searchExercises = async (req, res) => {
    try {
        const { query } = req.query;
        const exercises = await Exercise.find({
            $or: [
                { name: { $regex: new RegExp(query, 'i') } },
                { category: { $regex: new RegExp(query, 'i') } },
                { primaryMuscles: { $regex: new RegExp(query, 'i') } },
                { equipment: { $regex: new RegExp(query, 'i') } }
            ]
        });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 