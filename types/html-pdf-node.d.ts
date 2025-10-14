declare module 'html-pdf-node' {
  export function generatePdf(
    file: { content: string },
    options?: any,
    callback?: (err?: Error, buffer?: Buffer) => void
  ): void;
}