const fs = require("fs");
const entries = require("./entries");

const FILE_NAME = "to-copy.js";
const DATA = entries.entries;

const getActiveEntries = (entries) => {
  entries.filter((entry) => entry.fields.archived !== true);

  const res = entries.map((entry) => {
    return {
      title: entry.fields.title["en-US"],
      artist: entry.fields.artist["en-US"],
      order: 0,
    };
  });

  // convert
  const result = {};
  for (let i = 0; i < res.length; i++) {
    result[res[i].title] = {
      title: res[i].title,
      artist: res[i].artist,
      order: res[i].order,
    };
  }

  return result;
};

// getActiveEntries(DATA);

fs.writeFile(FILE_NAME, JSON.stringify(getActiveEntries(DATA)), function (err) {
  if (err) throw err;
  console.log(`content written successfully to ${FILE_NAME}`);
});
