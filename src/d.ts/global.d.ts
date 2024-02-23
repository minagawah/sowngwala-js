type SowngwalaChunk = 'check' | 'lib';

declare global {
  var NODE_ENV: string;
  var Sowngwala: Record<SowngwalaChunk, any>;
}

export {}
