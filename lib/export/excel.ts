import ExcelJS from "exceljs";

export async function buildExcelBuffer(
  columns: { header: string; key: string; width?: number }[],
  data: Record<string, any>[]
): Promise<Buffer> {
  const book = new ExcelJS.Workbook();
  const sheet = book.addWorksheet("Sheet1");
  sheet.columns = columns.map((c) => ({ ...c, width: c.width ?? 15 }));
  sheet.addRows(data);
  sheet.getRow(1).font = { bold: true };

  // cast to Buffer – runtime is always Node.js Buffer
  return Buffer.from(await book.xlsx.writeBuffer());
}