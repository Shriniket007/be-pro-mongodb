const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Moralis = require("moralis").default;
const mongoose = require("mongoose");
const User = require("./models/User");
const DocumentPath = require("./models/DocumentPath");
const DocumentAccessRequest = require("./models/DocumentAccessRequest");
const ApprovedRequest = require("./models/ApprovedRequest");
require("dotenv").config();

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);

    const user = new User({
      fullName: req.body.fullName,
      Email: req.body.Email,
      Telephone: req.body.Telephone,
      Aadhar: req.body.Aadhar,
      Password: hashedPassword,
    });

    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { Aadhar, Password } = req.body;

  try {
    const user = await User.findOne({ Aadhar });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(Password, user.Password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/uploadToIpfs", async (req, res) => {
  const fileContent = req.body.fileContent;

  const fileUpload = [
    {
      path: "uploadedFile",
      content: fileContent,
    },
  ];

  try {
    const ipfsResponse = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: fileUpload,
    });

    const ipfsPath = ipfsResponse.result[0].path;

    console.log("Received fileName:", req.body.fileName);

    const documentPath = new DocumentPath({
      aadhar: req.body.userAadhar,
      name: req.body.fileName,
      ipfsPath,
    });

    await documentPath.save();

    res.json({ ipfsPath });
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getDocuments/:aadhar", async (req, res) => {
  const aadhar = req.params.aadhar;

  try {
    const documents = await DocumentPath.find({ aadhar });

    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/documentPaths", async (req, res) => {
  try {
    const documents = await DocumentPath.find();

    res.json(documents);
  } catch (error) {
    console.error("Error fetching document paths:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/requestAccess", async (req, res) => {
  const { requesterAadhar, documentId, ownerAadhar } = req.body;

  try {
    const request = new DocumentAccessRequest({
      requesterAadhar,
      documentId,
      ownerAadhar,
    });
    await request.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error inserting access request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getRequestHistory/:aadhar", async (req, res) => {
  const aadhar = req.params.aadhar;

  try {
    const requests = await DocumentAccessRequest.find({ ownerAadhar: aadhar });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching request history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/updateRequestStatus/:id", async (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body;

  try {
    await DocumentAccessRequest.updateOne({ _id: requestId }, { status });
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/storeApprovedRequest", async (req, res) => {
  const { requesterAadhar, documentId } = req.body;

  try {
    const request = new ApprovedRequest({ requesterAadhar, documentId });
    await request.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error storing approved request data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { Aadhar: 1, fullName: 1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getApprovedDocuments", async (req, res) => {
  try {
    const approvedDocuments = await ApprovedRequest.find({})
      .populate({
        path: "documentId",
        model: "DocumentPath", 
        select: "-_id -__v",
      })
      .select("-_id id requesterAadhar approvalDate document");

    res.json(approvedDocuments);
  } catch (error) {
    console.error("Error fetching approved documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8700, () => {
  console.log("Connected backend");
});
