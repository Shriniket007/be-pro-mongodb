const mongoose = require("mongoose");

const documentPathSchema = new mongoose.Schema({
  aadhar: { type: String, required: true },
  name: { type: String, required: true },
  ipfsPath: { type: String, required: true },
});

const DocumentPath = mongoose.model("DocumentPath", documentPathSchema);

module.exports = DocumentPath;
