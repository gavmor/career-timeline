# Career Timeline SVG Generator

A command-line tool that generates SVG timeline visualizations from LinkedIn career data using Vega-Lite.

## Installation

```bash
bun install
```

## Usage

```bash
bun index.ts <input-json> [output-path]
```

### Arguments

- `input-json`: (Required) Path to your LinkedIn data JSON file
- `output-path`: (Optional) Path for the output SVG file (defaults to `timeline.svg`)

### Example

```bash
# Basic usage - outputs to timeline.svg
bun index.ts data.json

# Custom output path
bun index.ts data.json my-career.svg
```

## Obtaining LinkedIn Data

1. Open your LinkedIn profile in a web browser
2. Open the Developer Tools (F12 or Right Click → Inspect)
3. Go to the Network tab
4. Filter for "voyagerIdentityDashProfileComponents"
5. Look for the GraphQL request to:
   ```
   https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:...)&queryId=voyagerIdentityDashProfileComponents...
   ```
6. This request contains your experience data. Right-click → Save Response As
7. Save the response as a JSON file

Note: You'll need to be logged into LinkedIn for this to work. The exact URL will contain your profile identifiers.

## Input JSON Format

The tool expects a JSON file with LinkedIn profile data in the following structure:

```json
{
  "included": [{
    "components": {
      "elements": [{
        "components": {
          "entityComponent": {
            "titleV2": { "text": "Job Title" },
            "subtitle": "Company Name",
            "caption": "Jan 2020 - Apr 2020 • 4 mos"
          }
        }
      }]
    }
  }]
}
```