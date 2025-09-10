import { generateTimeline } from './src/generateTimeline';

// Main execution
if (process.argv.length < 3) {
    console.error('Please provide a JSON file path as argument');
    console.error('Usage: bun index.ts <json-file-path> [output-path]');
    process.exit(1);
}

const inputPath = process.argv[2]!;  // We know this exists because of the length check above
const outputPath = process.argv[3] || 'timeline.svg';

generateTimeline(inputPath, outputPath).catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});


