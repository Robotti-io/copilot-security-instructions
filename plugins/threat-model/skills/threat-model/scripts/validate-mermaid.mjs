/* eslint-disable no-console */

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  detectDiagramType,
  firstMeaningfulLine,
  listDiagramTypes,
  normalizeDiagramType,
} from './mermaid-support.mjs';

function parseArgs(argv) {
  const options = {
    file: null,
    type: null,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--file') {
      options.file = argv[index + 1] ?? null;
      index += 1;
      continue;
    }

    if (arg === '--type') {
      options.type = argv[index + 1] ?? null;
      index += 1;
      continue;
    }

    if (!arg.startsWith('-') && !options.file) {
      options.file = arg;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function printUsage() {
  console.log('Usage: node skills/threat-model/scripts/validate-mermaid.mjs --file <path> [--type <diagramType>]');
  console.log('The file may be a Markdown report with one or more ```mermaid blocks, or a standalone Mermaid file.');
  console.log(`Supported types: ${listDiagramTypes().join(', ')}`);
}

function extractMermaidBlocks(source, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.md' || extension === '.markdown') {
    const blocks = [];
    const pattern = /```mermaid\s*\n([\s\S]*?)```/gu;
    let match;
    while ((match = pattern.exec(source)) !== null) {
      blocks.push(match[1].trim());
    }
    return blocks;
  }

  return [source.trim()];
}

function validateCommon(source, errors) {
  if (!source.trim()) {
    errors.push('Diagram is empty.');
  }
}

function validateFlowchart(lines, errors) {
  let subgraphDepth = 0;
  let hasEdge = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('%%') || trimmed.startsWith('flowchart ')) {
      continue;
    }

    if (/^(participant|actor|sequenceDiagram)\b/u.test(trimmed) || trimmed.includes('->>')) {
      errors.push(`Flowchart appears to mix sequence-diagram syntax: ${trimmed}`);
    }

    if (/^subgraph\b/u.test(trimmed)) {
      subgraphDepth += 1;
    }

    if (trimmed === 'end') {
      if (subgraphDepth === 0) {
        errors.push('Encountered `end` without a matching `subgraph`.');
      } else {
        subgraphDepth -= 1;
      }
    }

    if (/(-->|==>|-.->|---|o--o|x--x|--x|x--)/u.test(trimmed)) {
      hasEdge = true;
    }
  }

  if (subgraphDepth !== 0) {
    errors.push('One or more `subgraph` blocks are missing a closing `end`.');
  }

  if (!hasEdge) {
    errors.push('Flowchart must include at least one edge.');
  }
}

function validateSequenceDiagram(lines, errors) {
  const stack = [];
  let hasInteraction = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('%%') || trimmed === 'sequenceDiagram') {
      continue;
    }

    if (/^(flowchart|subgraph)\b/u.test(trimmed) || /\[[^\]]+\]/u.test(trimmed)) {
      errors.push(`Sequence diagram appears to mix flowchart syntax: ${trimmed}`);
    }

    if (/^(participant|actor|autonumber|activate|deactivate|title|Note\b|link\b|create\b|destroy\b|box\b)/u.test(trimmed)) {
      continue;
    }

    if (/^(alt|opt|loop|par|critical|rect|break)\b/u.test(trimmed)) {
      stack.push(trimmed.split(/\s+/u)[0]);
      continue;
    }

    if (/^else\b/u.test(trimmed)) {
      if (!stack.includes('alt')) {
        errors.push('`else` must appear inside an `alt` block.');
      }
      continue;
    }

    if (/^and\b/u.test(trimmed)) {
      if (!stack.includes('par')) {
        errors.push('`and` must appear inside a `par` block.');
      }
      continue;
    }

    if (/^option\b/u.test(trimmed)) {
      if (!stack.includes('critical')) {
        errors.push('`option` must appear inside a `critical` block.');
      }
      continue;
    }

    if (trimmed === 'end') {
      if (stack.length === 0) {
        errors.push('Encountered `end` without an open sequence block.');
      } else {
        stack.pop();
      }
      continue;
    }

    if (/[-.=]{0,2}(?:>>|>|x|\))\s*[^:]+:/u.test(trimmed)) {
      hasInteraction = true;
      continue;
    }

    errors.push(`Unsupported or malformed sequence-diagram line: ${trimmed}`);
  }

  if (stack.length > 0) {
    errors.push('One or more structured sequence blocks are missing a closing `end`.');
  }

  if (!hasInteraction) {
    errors.push('Sequence diagram must include at least one interaction line.');
  }
}

function validateDiagram(source, requestedType) {
  const errors = [];
  const diagramType = requestedType ?? detectDiagramType(source);
  if (!diagramType) {
    errors.push(`Missing or unsupported diagram header. Supported types: ${listDiagramTypes().join(', ')}`);
    return { diagramType: requestedType ?? 'unknown', errors };
  }

  validateCommon(source, errors);
  const lines = source.split(/\r?\n/u);
  const header = firstMeaningfulLine(source);
  const headerToken = header.split(/\s+/u)[0];

  if (!normalizeDiagramType(headerToken)) {
    errors.push(`Unsupported Mermaid header: ${header}`);
  }

  if (diagramType === 'flowchart') {
    validateFlowchart(lines, errors);
  }

  if (diagramType === 'sequenceDiagram') {
    validateSequenceDiagram(lines, errors);
  }

  return { diagramType, errors };
}

async function main() {
  let options;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    printUsage();
    process.exitCode = 1;
    return;
  }

  if (options.help || !options.file) {
    printUsage();
    return;
  }

  const requestedType = options.type ? normalizeDiagramType(options.type) : null;
  if (options.type && !requestedType) {
    console.error(`Unsupported diagram type: ${options.type}`);
    printUsage();
    process.exitCode = 1;
    return;
  }

  const source = await readFile(options.file, 'utf8');
  const blocks = extractMermaidBlocks(source, options.file);
  if (blocks.length === 0) {
    console.error('No Mermaid content found in the supplied file.');
    process.exitCode = 1;
    return;
  }

  let hasFailures = false;
  blocks.forEach((block, index) => {
    const result = validateDiagram(block, requestedType);
    const label = `Block ${index + 1} (${result.diagramType})`;
    if (result.errors.length === 0) {
      console.log(`PASS ${label}`);
      return;
    }

    hasFailures = true;
    console.error(`FAIL ${label}`);
    for (const error of result.errors) {
      console.error(`  - ${error}`);
    }
  });

  if (hasFailures) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});