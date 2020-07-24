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
  fs.createReadStream(path.join(__dirname, "../../../test/xaa.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xab.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xac.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xad.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xae.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xaf.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xag.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xah.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xai.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xaj.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xak.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xal.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xam.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xan.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xao.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xap.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xaq.csv"))
);
combinedStream.append(
  fs.createReadStream(path.join(__dirname, "../../../test/xar.csv"))
);
// let readStream = fs.createReadStream(
//   path.join(__dirname, "../../../test/xaa.csv")
// );
let writeStream = fs.createWriteStream(
  path.join(__dirname, "../../../test/combined.csv")
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
