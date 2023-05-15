/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { ipcRenderer } = require("electron");

function getInput() {
  let resultSection = document.getElementById("resultSection");
  resultSection.innerHTML = " ";
  const testingNumber = document.getElementById("testingNumber").value;

  if (testingNumber !== "") {
    ipcRenderer.send("submitData", testingNumber);
    ipcRenderer.on("submitDataResponse", (event, processedData) => {
      // Access the processed data from the main process
      let word = processedData.isPrime ? "Prime" : "Composite";
      let contentTemplate = `
      <div class="row">
        <div class="col-lg-12">
          <h6>${testingNumber} is ${word} number and factors are: ${processedData.factors}</h6>
          <h6>With 1st method number of iteration  is: ${processedData.firstMethod}</h6>
          <h6>With 2nd method number of iteration  is: ${processedData.secondMethod}</h6>
        </div>
      </div>`;

      resultSection.style.display = "block";
      resultSection.innerHTML = contentTemplate;
    });
  }
}
