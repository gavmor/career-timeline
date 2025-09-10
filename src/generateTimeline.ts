import { readFileSync, writeFileSync } from 'fs';
import { type Job, extractJobInfo } from './extractJobInfo';
import { generateSVG } from './generateSVG';

export async function generateTimeline(inputPath: string, outputPath: string) {
    const json = JSON.parse(readFileSync(inputPath, 'utf-8'));
    const jobs: Job[] = json.included[0].components.elements.map((job: any) => extractJobInfo(job));

    writeFileSync(outputPath, (await generateSVG(jobs)));
    console.log(`SVG file generated: ${outputPath}`);
}
