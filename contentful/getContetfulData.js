const contentfulExport = require("contentful-export");
const fs = require("fs");

const FILE_NAME = "entries-test.js";

const options = {
  spaceId: "rr080v03bin6",
  managementToken: "CFPAT-UopoBPl2xz-c2W46ELZbQPzupDblBvtbPkM1g96wXFk",
  queryEntries: ["content_type=musicProject"],
  saveFile: false,
};

contentfulExport(options)
  .then((result) => {
    const { entries } = result;

    fs.writeFile(FILE_NAME, JSON.stringify(entries), function (err) {
      if (err) throw err;
      console.log(`content written successfully to ${FILE_NAME}`);
    });
  })
  .catch((err) => {
    console.log("Oh no! Some errors occurred!", err);
  });
