/* eslint-disable no-console */

import { getDiagramDoc, listDiagramTypes, normalizeDiagramType } from './mermaid-support.mjs';

function parseArgs(argv) {
  const options = {
    list: false,
    type: null,
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--list') {
      options.list = true;
      continue;
    }

    if (arg === '--json') {
      options.json = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--type') {
      options.type = argv[index + 1] ?? null;
      index += 1;
      continue;
    }

    if (!arg.startsWith('-') && !options.type) {
      options.type = arg;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function printUsage() {
  console.log('Usage: node plugins/copilot-security/skills/access-control-review/scripts/mermaid-docs.mjs [--list] [--type <diagramType>] [--json]');
  console.log('Supported types:', listDiagramTypes().join(', '));
}

function formatDoc(doc) {
  const lines = [
    `Diagram type: ${doc.canonicalName}`,
    `Required header: ${doc.header}`,
    `Purpose: ${doc.purpose}`,
    '',
    'Core constructs:',
    ...doc.constructs.map((item) => `- ${item}`),
    '',
    'Common pitfalls:',
    ...doc.pitfalls.map((item) => `- ${item}`),
  ];

  return lines.join('\n');
}

function main() {
  let options;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    printUsage();
    process.exitCode = 1;
    return;
  }

  if (options.help || (!options.list && !options.type)) {
    printUsage();
    return;
  }

  if (options.list) {
    const supportedTypes = listDiagramTypes();
    if (options.json) {
      console.log(JSON.stringify(supportedTypes, null, 2));
      return;
    }

    for (const type of supportedTypes) {
      console.log(type);
    }
    return;
  }

  const normalizedType = normalizeDiagramType(options.type);
  if (!normalizedType) {
    console.error(`Unsupported diagram type: ${options.type}`);
    printUsage();
    process.exitCode = 1;
    return;
  }

  const doc = getDiagramDoc(normalizedType);
  if (options.json) {
    console.log(JSON.stringify(doc, null, 2));
    return;
  }

  console.log(formatDoc(doc));
}

main();
