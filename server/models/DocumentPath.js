const mongoose = require("mongoose");

const documentPathSchema = new mongoose.Schema({
  aadhar: { type: String, required: true },
  name: { type: String, required: true },
  ipfsPath: { type: String, required: true },
  fileSizeKB: { type: Number, required: true },
  uploadDatetime: { type: Date, default: Date.now },
});

const DocumentPath = mongoose.model("DocumentPath", documentPathSchema);

module.exports = DocumentPath;
