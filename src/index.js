const express = require("express");
const app = express();
const port = 3000;

const multer = require("multer");
const { readFile, readFromFile, parseFile } = require("./utils");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.post(
//   "/api/v1/files/upload",
//   upload.array("codes"),
//   async function (req, res, next) {
//     // req.files is array of `codes` files
//     // req.body will contain the text fields, if there were any
//     if (req.files) {
//       let jsonResponse = [];
//       async.map(req.files, readFile, (err, res) => {
//         // res = ['file 1 content', 'file 2 content', ...]
//         console.log(res)
//     });
//       // req.files.forEach(element => {
//       //   console.log(element);
//       //   readFile(
//       //     element?.path,
//       //     element?.originalname,
//       //     function(data) {
//       //       jsonResponse.push(data);
//       //       console.log(jsonResponse);
//       //     }
//       //   );
//       // });
//       return res.status(200).json(jsonResponse);
//     }
//     return res.status(400).json({ error: "No files found" });
//   }
// );

app.post("/api/v1/files/upload", upload.array("codes"), function (req, res, next) {
    const promArr = [];
    for (let i = 0; i < req.files.length; i++) {
      promArr.push(readFromFile(req.files[i].path));
    }

    Promise.all(promArr).then((result) => {
      let jsonResponse = []
      result.forEach(element => {
        jsonResponse.push(parseFile(element));
      });
      return res.status(200).json(jsonResponse)
    });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
