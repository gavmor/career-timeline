import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import type { Job } from './extractJobInfo';

export async function generateSVG(jobs: Job[]) {
    const spec: vegaLite.TopLevelSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v6.json",
        description: "A simple bar chart with ranged data (aka Gantt Chart).",
        data: {
            values: jobs.map(job => ({
                title: job.title,
                start: new Date(job.dates.start).getTime(),
                end: new Date(job.dates.end).getTime()
            }))
        },
        mark: { type: "bar" },
        encoding: {
            y: { field: "title", type: "nominal" },
            x: {
                field: "start",
                type: "temporal",
                timeUnit: "yearmonth"
            },
            x2: { field: "end" }
        }
    };

    // Create a new Vega View instance for rendering
    const view = new vega.View(vega.parse(vegaLite.compile(spec).spec))
        .renderer('none')
        .initialize();

    // Generate and save SVG
    return await view.toSVG();
}
