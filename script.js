#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectName = path.basename(process.cwd());

const renameProjectPlaceholder = (fpath) => {
  const data = fs.readFileSync(fpath, "utf8");
  const result = data.replace(/<PROJECT_NAME_PLACEHOLDER>/g, projectName);
  fs.writeFileSync(fpath, result);
};

const moveNarsTemplate = (name) => {
  fs.renameSync(path.join(__dirname, "nars", name), path.join(process.cwd(), name));
}

const adjustNodeModulesPath = (fpath) => {
  const data = fs.readFileSync(fpath, "utf8");
  const result = data.replace(/node_modules/g, "../node_modules");
  fs.writeFileSync(fpath, result);
};

// New line
console.log("");

const clientDir = path.join(process.cwd(), "client");

if (!fs.existsSync(clientDir)){
    fs.mkdirSync(clientDir);
}

fs.readdirSync(process.cwd()).forEach(fileName => {
  if (fileName !== "client") {
    fs.renameSync(fileName, path.join("client", fileName));
  }
})

renameProjectPlaceholder(path.join(process.cwd(), "client", "package.json"));
renameProjectPlaceholder(path.join(__dirname, "nars", "config", "package.json"));
renameProjectPlaceholder(path.join(__dirname, "nars", "server", "package.json"));

console.log("  ✔ Moving project files to client directory");

moveNarsTemplate("config");

console.log("  ✔ Creating config directory");

moveNarsTemplate("server");

console.log("  ✔ Creating server package");

renameProjectPlaceholder(path.join(__dirname, "nars", "package.json"));

renameProjectPlaceholder(path.join(process.cwd(), "client", "metro.config.js"));

moveNarsTemplate("package.json");

console.log("  ✔ Adjusting node_modules paths");
