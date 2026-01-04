import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Exercise from '../models/Exercise.js';
import connectDB from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importExercises = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('Connected to MongoDB');

        // Read the JSON file
        const filePath = path.join(__dirname, '../exercises.json');
        console.log('Reading file from:', filePath);
        
        const exercisesData = JSON.parse(
            fs.readFileSync(filePath, 'utf-8')
        );
        console.log(`Found ${exercisesData.length} exercises in JSON file`);

        // Clean data: replace null/undefined equipment and force with defaults, and filter out empty instructions
        const cleanedData = exercisesData.map(ex => ({
            ...ex,
            equipment: ex.equipment || 'none',
            force: ex.force || 'unknown',
            instructions: ex.instructions.filter(instruction => instruction.trim() !== '')
        }));

        // Clear existing data
        await Exercise.deleteMany({});
        console.log('Cleared existing exercises');

        // Insert new data
        const result = await Exercise.insertMany(cleanedData);
        console.log(`Successfully imported ${result.length} exercises`);

        // Close the connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');

    } catch (error) {
        console.error('Error importing exercises:', error);
        if (error.code === 'ENOENT') {
            console.error('File not found. Please check the file path.');
        }
        process.exit(1);
    }
};

// Run the import
importExercises(); 