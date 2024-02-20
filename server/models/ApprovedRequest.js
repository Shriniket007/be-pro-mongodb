const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const approvedRequestSchema = new Schema(
  {
    requesterAadhar: {
      type: String,
      required: true,
    },
    documentId: {
      type: Schema.Types.ObjectId,
      ref: "DocumentPath",
      required: true,
    },
  },
  { timestamps: true }
);

const ApprovedRequest = mongoose.model(
  "ApprovedRequest",
  approvedRequestSchema
);

module.exports = ApprovedRequest;
