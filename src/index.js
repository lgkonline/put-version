#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const npmPackage = require(path.format({ dir: process.cwd(), base: "package.json" }));

const args = process.argv.slice(2);

let filePath;

if (args[0]) {
    filePath = args[0];

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return console.error(err);

        const $ = cheerio.load(data);

        function setVersion(elem, attr) {
            const splitted = $(elem).attr(attr).split("?");
            const file = splitted[0];
            let params = splitted[1];

            // Only set version param when file doesn't already have params. Or it has version param.
            if (!params || params.startsWith("version=")) {
                $(elem).attr(attr, file + "?version=" + npmPackage.version);
            }
        }

        $("script[src]").each((i, elem) => {
            setVersion(elem, "src");
        });

        $("link[href]").each((i, elem) => {
            setVersion(elem, "href");
        });

        console.log(`Set version in ${filePath} to ${npmPackage.version}`);

        fs.writeFile(filePath, $.html(), "utf8", err => {
            if (err) console.error(err);
        });
    });
}
else {
    console.error("You have to pass an input file like this: put-version index.html");
}