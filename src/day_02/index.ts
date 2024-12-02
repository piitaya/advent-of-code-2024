import * as fs from "fs";
import path from "path";

// Read file
const FILE_PATH = path.join(__dirname, "data/input.txt");
const input = fs.readFileSync(FILE_PATH, "utf8");

// Extract lists
const reports = input
  .split("\n")
  .map((line) => line.split(" ").map((num) => parseInt(num)));

function isSafeReport(report: number[]): boolean {
  const differences = report
    .map((level, index) => {
      const next = report[index + 1];
      if (!next) return undefined;
      return next - level;
    })
    .filter((diff) => diff !== undefined);

  const sign = Math.abs(differences[0]) / differences[0];

  return differences.every((diff) => {
    const absDiff = Math.abs(diff);

    if (sign !== Math.abs(diff) / diff) {
      return false;
    }
    return absDiff >= 1 && absDiff <= 3;
  });
}
const safeReports = reports.filter((report) => isSafeReport(report));

console.log("Safe reports", safeReports.length);

const safeReportsWithTolerance = reports.filter((report) => {
  const variants = report.map((_level, index) => {
    const arr = [...report];
    arr.splice(index, 1);
    return arr;
  });
  return variants.some((variant) => isSafeReport(variant));
});

console.log("Safe reports with tolerance", safeReportsWithTolerance.length);
