// scripts/fetchProjects.js
import fetch from 'node-fetch';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

const SHEET_ID = '1udXs10Yfn8ykN0TSSAZmyxa7UMAXttw3i63Z0QrtUsM';
const GID = '0';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

async function fetchAndUpdate() {
  const res = await fetch(CSV_URL);
  if (!res.ok) {
    console.error('Failed to fetch sheet:', res.statusText);
    return;
  }
  const csvText = await res.text();
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
  });

  const projects = records.map((row) => ({
    name: row['name'] || '',
    category: row['category'] || '',
    type: row['type'] || '',
    url: row['url'] || undefined,
    device: row['device'] || undefined,
    year: row['year'] || undefined,
    nda: row['nda'] || undefined,
    designer: row['designer'] || undefined,
    technology: row['technology'] || undefined,
    description: row['description'] || undefined,
  }));

  const output = `export type Project = { name: string; category: string; type: string; url?: string; github?: string; device?: string; year?: string; nda?: string; designer?: string; technology?: string; description?: string }\n\nexport const projects: Project[] = ${JSON.stringify(projects, null, 2)};`;

  const targetPath = path.resolve('data', 'projects.ts');
  fs.writeFileSync(targetPath, output, { encoding: 'utf8' });
  console.log('projects.ts updated with', projects.length, 'entries');
}

fetchAndUpdate().catch((err) => console.error(err));
