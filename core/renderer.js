/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { ipcRenderer } = require("electron");
const fs = require("fs");

function validateInput() {
  var input = document.getElementById("repControlInput").value;
  var errorElement = document.getElementById("error");
  var pattern = /^([a-zA-Z]+:[a-zA-Z]+(,[\s]*[a-zA-Z]+:[a-zA-Z]+)*)$/;
  var isValid = pattern.test(input);
  if (isValid) {
    // If input is valid, hide error message (if shown)
    errorElement.style.display = "none";
    return true;
  } else {
    // If input is invalid, show error message
    errorElement.style.display = "block";
    return false;
  }
}

function getFileText() {
  const fileInput = document.getElementById("fileInput");
  let exitSection = document.getElementById("exitSection");
  exitSection.style.display = "none";
  let pare = document.getElementById("pare");
  pare.innerHTML = "";

  // Check if a file is selected
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const filePath = file.path;

    // Read file contents
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      // Send file data to main process via IPC
      ipcRenderer.send("fileData", data);
      ipcRenderer.on("fileDataResponse", (event, processedData) => {
        // Access the processed data from the main process

        let contentTemplate = ``;
        let exitSection = document.getElementById("exitSection");
        exitSection.style.display = "block";
        pareSection.innerHTML += contentTemplate;
      });
    });
  }
}

function processData() {
  if (validateInput()) {
    const replacementInput = document.getElementById("repControlInput");
    const pare = document.getElementById("pare");
    console.log(replacementInput.value);
    ipcRenderer.send("switchLetters", replacementInput.value);
    ipcRenderer.on("switchLettersResponse", (event, result) => {
      let frAnalysis = result.frAnalysis;

      let contentTemplate = ``;
      pare.innerHTML += contentTemplate;
    });
  }
}

function exit() {
  let exitSection = document.getElementById("exitSection");
  exitSection.style.display = "none";
}
