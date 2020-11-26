const fs = require("fs");
const path = require("path");
const glob = require("glob");

const csv_dir = "./csv";
const json_dir = "./json";

const csv_path_arr = [];

const getPaths = () => {
  const files = glob.sync(`${csv_dir}/*.csv`);
  csv_path_arr.push(...files);
};

const readPaths = (arr) => {
  arr.forEach((item) => {
    const name = path.basename(item, ".csv");
    const data = fs.readFileSync(item, "utf-8");
    const json = csvToJson(data);
    const file = {
      stock: name,
      tick: json,
    };
    fs.writeFileSync(`${json_dir}/${name}.json`, JSON.stringify(file), "utf-8");
  });
};

const csvToJson = (csv) => {
  let rows = csv.split("\n");
  const result = {};

  for (let i = 1; i < rows.length; i++) {
    let row = rows[i].split(",");
    let date = row[0];
    let open = row[1];
    let high = row[2];
    let low = row[3];
    let close = row[4];

    
    result[date] =  {
        open: open,
        high: high,
        low: low,
        close: close,
      }
    // result.push(obj);
  }

  return result;
};

const app = () => {
  getPaths();
  readPaths(csv_path_arr);
};

app();
