import * as fs from "fs";
import path from "path";

// Read file
const FILE_PATH = path.join(__dirname, "data/input.txt");
const input = fs.readFileSync(FILE_PATH, "utf8");

// Extract lists
const list1 = input
  .split("\n")
  .map((line) => line.split("   ")[0])
  .map((num) => parseInt(num));

const list2 = input
  .split("\n")
  .map((line) => line.split("   ")[1])
  .map((num) => parseInt(num));

// Sort lists
list1.sort();
list2.sort();

const distances = list1.map((num1, index) => {
  const num2 = list2[index];
  return Math.abs(num1 - num2);
});

const distance = distances.reduce((acc, curr) => acc + curr, 0);

console.log("Distance", distance);

const similarities = list1.map((num1) => {
  const occurrences = list2.filter((num2) => num2 === num1).length;
  return num1 * occurrences;
});

const similarity = similarities.reduce((acc, curr) => acc + curr, 0);

console.log("Similarity", similarity);
