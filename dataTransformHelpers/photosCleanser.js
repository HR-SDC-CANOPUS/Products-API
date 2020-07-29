const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require("fs");
const Transform = require("stream").Transform;
const path = require("path");
const CombinedStream = require("combined-stream");

const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "styleId", title: "styleId" },
    { id: "url", title: "url" },
    { id: "thumbnail_url", title: "thumbnail_url" },
  ],
});

var combinedStream = CombinedStream.create();
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xaa1.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xab.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xac.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xad.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xae.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xaf.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xag.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xah.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xai.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xaj.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xak.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xal.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xam.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xan.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xao.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xap.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xaq.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test-photos/xar.csv"))
);
// let readStream = fs.createReadStream(
//   path.join(__dirname, "../../../test/xaa.csv")
// );
let writeStream = fs.createWriteStream(
  path.join(__dirname, "../../../test-photos/combined.csv")
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
    // adds quotes to thumbnail url string
    // console.log(chunk);
    if (chunk.thumbnail_url.charAt(chunk.thumbnail_url.length - 1) !== '"') {
      chunk.thumbnail_url += '"';
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

combinedStream
  .pipe(csv({ quote: "`" }))
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });
