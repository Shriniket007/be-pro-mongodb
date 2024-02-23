const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentAccessRequestSchema = new Schema(
  {
    requestName: {
      type: String,
      required: true,
    },
    documentName: {
      type: String,
      required: true,
    },
    requesterAadhar: {
      type: String,
      required: true,
    },
    documentId: {
      type: Schema.Types.ObjectId,
      ref: "DocumentPath",
      required: true,
    },
    ownerAadhar: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const DocumentAccessRequest = mongoose.model(
  "DocumentAccessRequest",
  documentAccessRequestSchema
);

module.exports = DocumentAccessRequest;
