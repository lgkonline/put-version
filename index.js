#!/usr/bin/env node
"use strict";

var fs = require("fs");
var path = require("path");
var cheerio = require("cheerio");

var npmPackage = require(path.format({ dir: process.cwd(), base: "package.json" }));

var args = process.argv.slice(2);

var filePath = void 0;

if (args[0]) {
    filePath = args[0];

    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) return console.error(err);

        var $ = cheerio.load(data);

        function setVersion(elem, attr) {
            $(elem).attr(attr, $(elem).attr(attr).split("?")[0] + "?version=" + npmPackage.version);
        }

        $("script[src]").each(function (i, elem) {
            setVersion(elem, "src");
        });

        $("link[href]").each(function (i, elem) {
            setVersion(elem, "href");
        });

        console.log("Set version in " + filePath + " to " + npmPackage.version);

        fs.writeFile(filePath, $.html(), "utf8", function (err) {
            if (err) console.error(err);
        });
    });
} else {
    console.error("You have to pass an input file like this: put-version index.html");
}
