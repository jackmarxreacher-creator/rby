import pdf from "html-pdf-node";

export async function buildPdfBuffer(html: string): Promise<Buffer> {
  const opt = {
    format: "A4",
    printBackground: true,
    margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
  };

  return new Promise((res, rej) =>
    pdf.generatePdf({ content: html }, opt, (err, buffer) => {
      if (err) return rej(err);
      if (!buffer) return rej(new Error("html-pdf-node returned no buffer"));
      return res(buffer);
    })
  );
}