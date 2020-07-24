const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require("fs");
const Transform = require("stream").Transform;
const path = require("path");

const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "productId", title: "productId" },
    { id: "name", title: "name" },
    { id: "sale_price", title: "sale_price" },
    { id: "original_price", title: "original_price" },
    { id: "default_style", title: "default_style" },
  ],
});

let readStream = fs.createReadStream(
  path.join(__dirname, "../../../styles.csv")
);
let writeStream = fs.createWriteStream(
  path.join(__dirname, "../../../cleanedstyles.csv")
);

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    for (let key in chunk) {
      //trims whitespace
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if (key !== trimKey) {
        delete chunk[key];
      }
    }
    //uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

//write header
writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv({ quote: "`" }))
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });
