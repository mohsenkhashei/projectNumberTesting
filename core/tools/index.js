const log = require("electron-log");
const { app } = require("electron");

const path = require("path");
const fs = require("fs");

const init = async (text) => {
  log.info(`start init function `);

  try {
  } catch (err) {
    log.error(err);
  }
};

module.exports = { init };
