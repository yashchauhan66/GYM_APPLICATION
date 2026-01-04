import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    force: {
        type: String,
        required: false,
        default: 'unknown'
    },
    level: {
        type: String,
        required: true
    },
    mechanic: {
        type: String,
        required: false
    },
    equipment: {
        type: String,
        required: false,
        default: 'none'
    },
    primaryMuscles: [{
        type: String,
        required: true
    }],
    secondaryMuscles: [{
        type: String,
        required: false
    }],
    instructions: [{
        type: String,
        required: false
    }],
    category: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: false
    }],
    id: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise; 