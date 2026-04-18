const DIAGRAM_DOCS = {
  flowchart: {
    canonicalName: 'flowchart',
    aliases: ['flowchart', 'flow', 'dfd'],
    header: 'flowchart LR',
    purpose: 'Use for identity and access control overview diagrams, enforcement architecture views, and endpoint protection maps.',
    constructs: [
      'Declare a direction on the first line, such as `flowchart LR` or `flowchart TD`.',
      'Use simple alphanumeric node ids and put descriptive text in labels.',
      'Use `subgraph ... end` to show trust boundaries or subsystem grouping.',
      'Quote edge labels when they contain punctuation or multi-word text.',
    ],
    pitfalls: [
      'Do not mix sequence-diagram syntax such as `participant`, `actor`, or `->>`.',
      'Do not leave a `subgraph` block without a matching `end`.',
      'Keep node ids simple; put complex text in labels instead of ids.',
    ],
  },
  sequenceDiagram: {
    canonicalName: 'sequenceDiagram',
    aliases: ['sequencediagram', 'sequence', 'sequenceDiagram'],
    header: 'sequenceDiagram',
    purpose: 'Use for the highest-risk or most important authentication and authorization interaction flows.',
    constructs: [
      'Declare `sequenceDiagram` on the first meaningful line.',
      'Define actors or participants before the first interaction when practical.',
      'Use `alt`, `opt`, `loop`, `par`, `critical`, `rect` blocks with a closing `end`.',
      'Use interaction arrows such as `->>` and `-->>` with a message label after `:`.',
    ],
    pitfalls: [
      'Do not mix flowchart syntax such as `flowchart LR`, `subgraph`, or node labels like `A[API]`.',
      'Do not use `else`, `and`, or `option` outside their parent blocks.',
      'Every structured block must close with `end`.',
    ],
  },
  classDiagram: {
    canonicalName: 'classDiagram',
    aliases: ['classdiagram', 'class', 'classDiagram'],
    header: 'classDiagram',
    purpose: 'Use only when modeling role relationships or policy objects adds clarity.',
    constructs: [
      'Declare `classDiagram` on the first meaningful line.',
      'Keep class names simple and model only the relationships needed for the security story.',
    ],
    pitfalls: [
      'Avoid mixing flowchart or sequence syntax into a class diagram.',
    ],
  },
  erDiagram: {
    canonicalName: 'erDiagram',
    aliases: ['erdiagram', 'er', 'entityrelationshipdiagram', 'entityRelationshipDiagram'],
    header: 'erDiagram',
    purpose: 'Use when identity data, group membership, or entitlement ownership is easier to explain as datastore relationships.',
    constructs: [
      'Declare `erDiagram` on the first meaningful line.',
      'Use compact entity names and relationship labels.',
    ],
    pitfalls: [
      'Avoid mixing flowchart or sequence syntax into an ER diagram.',
    ],
  },
};

const ALIAS_MAP = new Map(
  Object.values(DIAGRAM_DOCS).flatMap((doc) =>
    doc.aliases.map((alias) => [alias.toLowerCase(), doc.canonicalName]),
  ),
);

function normalizeDiagramType(value) {
  if (!value) {
    return null;
  }

  return ALIAS_MAP.get(value.trim().toLowerCase()) ?? null;
}

function getDiagramDoc(type) {
  const normalizedType = normalizeDiagramType(type);
  return normalizedType ? DIAGRAM_DOCS[normalizedType] : null;
}

function listDiagramTypes() {
  return Object.keys(DIAGRAM_DOCS);
}

function firstMeaningfulLine(source) {
  for (const rawLine of source.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('%%')) {
      continue;
    }

    return line;
  }

  return '';
}

function detectDiagramType(source) {
  const header = firstMeaningfulLine(source);
  if (!header) {
    return null;
  }

  return normalizeDiagramType(header.split(/\s+/u)[0]);
}

export {
  detectDiagramType,
  firstMeaningfulLine,
  getDiagramDoc,
  listDiagramTypes,
  normalizeDiagramType,
};
