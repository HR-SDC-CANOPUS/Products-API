const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require("fs");
const Transform = require("stream").Transform;
const path = require("path");

const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "current_product_id", title: "current_product_id" },
    { id: "feature", title: "feature" },
    { id: "value", title: "value" },
  ],
});

let readStream = fs.createReadStream(
  path.join(__dirname, "../../../test_features.csv")
);
let writeStream = fs.createWriteStream(
  path.join(__dirname, "../../../test_cleanedfeatures.csv")
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
    console.log(chunk);
    if (chunk.current_product_id === previousChunk.current_product_id)
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
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });
