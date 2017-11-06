#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const glob = require('glob');
const csstree = require('css-tree');


function fileRenderer(file) {
  'use strict';

  sass.render({
    file: file,
//    data: '@import "./sass/global-styling.scss";',
    includePaths: ['./sass', './sass-includes'],
    importer: sevenImporter()
  }, function (err, result) {
    if (err) {
      console.log(err.status); // used to be "code" in v2x and below
      console.log(err.column);
      console.log(err.message);
      console.log(err.line);
    } else {
 //     console.log(result.css.toString());
//      console.log(result.stats);
      // console.log(result.map.toString());
    }
  });
}

function resolveSevenDirectory() {
  return '/Users/d439426/Code/dev2/seven'
  //return '/Users/d439426/Code/dev2/thunder/docroot/core/themes/seven';
  // return '../../../core/themes/seven';
}

function sevenImporter() {
  return function(url, prev, done) {
    console.log(url);
    if (url.startsWith('@seven')) {
      const [ selectors, fileUrl] = parseImportUrl(url);
      file = fileUrl.replace('@seven', resolveSevenDirectory());
      let contents = parseFile(file, selectors);
      console.log(contents);
      return { contents: contents};
    }

    return { file: url };
  };

};

function parseImportUrl(url) {
  const [file, selectorString] = url.split(' remove ').map(val => val.trim());
  const selectorMatches = selectorString.match(/{([\s\S]*?)}/);
  if (selectorMatches) {
    const selectors = selectorMatches[1].split(',').map(val => val.trim());
    return [ selectors, file ];
  }
  return [ null, file];
}

function parseFile(file, selectors){
//  console.log(fs.realpath(file));
  let contents = fs.readFileSync(file, 'utf-8');
//  console.log(contents);

  // https://astexplorer.net
  let ast = csstree.parse(contents, {
    filename: file,
    tolerant: true,
    onParseError: function (error) {
      console.log(error.message);
    }
  });

  csstree.walkUp(ast, function(node, item, list) {

    if (this.selector !== null && this.selector.type === 'SelectorList') {

      if (node.type === 'ClassSelector') {
        if (selectors.includes('.' + node.name)) {
          list.remove(item);
        }
      }
      else if (node.type === 'TypeSelector') {
        if (selectors.includes(node.name)) {
          list.remove(item);
        }
      }

      // Remove empty lines in prelude.
      if (node.children && node.children.isEmpty()) {
        list.remove(item);
      }
    }

    // Empty prelude remove rule.
    if (node.type === 'Rule' && node.prelude.children && node.prelude.children.isEmpty()) {
      list.remove(item);
    }
  });

  console.log(csstree.translate(ast));
  return csstree.translate(ast);
}

//console.log(__dirname);
//console.log(process.env.PWD);

//resolveSevenDirectory();
fileRenderer(path.resolve(__dirname, 'sass/base/elements.scss'))