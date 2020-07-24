const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require("fs");
const Transform = require("stream").Transform;
const path = require("path");

const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "name", title: "name" },
    { id: "slogan", title: "slogan" },
    { id: "description", title: "description" },
    { id: "category", title: "category" },
    { id: "default_price", title: "default_price" },
  ],
});

let readStream = fs.createReadStream(
  path.join(__dirname, "../../../product.csv")
);
let writeStream = fs.createWriteStream(
  path.join(__dirname, "../../../cleanedproduct.csv")
);

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }
  batch = [];
  _transform(chunk, encoding, next) {
    for (let key in chunk) {
      // console.log(chunk.toString("utf8"));
      //trims whitespace
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if (key !== trimKey) {
        delete chunk[key];
      }
    }
    //filters out all non-number characters
    let onlyNumbers = chunk.default_price.replace(/\D/g, "");
    chunk.default_price = onlyNumbers;
    // //uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);
    // if (this.batch.length >= 10000) {
    //   this.batch = [];
    // }
    this.push(chunk);
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

//write header
writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });
