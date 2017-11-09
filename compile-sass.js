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


/**
 * Usage: @import "@seven/css/base/elements.css remove { body, .thunder-details, .apple: [color] }";
 *
 */
function parseFile(file, selectors){
  let contents = fs.readFileSync(file, 'utf-8');

  // https://astexplorer.net
  let ast = csstree.parse(contents, {
    filename: file,
    tolerant: true,
    onParseError: function (error) {
      console.log(error.message);
    }
  });

  csstree.walkUp(ast, function(node, item, list) {
    if (node.type === 'Rule') {

      node.prelude.children.each(function(selector, item, list) {

        let remove = false;
        csstree.walk(selector, function(node) {
          // ignore nodes in nested selectors
          if (this.selector === null || this.selector === selectorList) {
            let name = '';
            switch (node.type) {
              case 'PseudoClassSelector':
                name = csstree.translate(node);
                if (item.data.children) {
                  name = csstree.translate(item.data.children.head.data)+name;
                }
                if (selectors.includes(name)) {
                  list.remove(item);
                  if(item.prev) list.remove(item.prev);
                }
                break;
              case 'ClassSelector':
              case 'IdSelector':
              case 'TypeSelector':
                name = csstree.translate(node);
                if (selectors.includes(name)) {
                  remove = true;
                }
                break;
            }
          }
        });

        if (remove) {
          list.remove(item);

        }
      });

      if (node.prelude.children.isEmpty() ||
        node.block.children.isEmpty()) {
        list.remove(item);
      }

    }
  });
  return csstree.translate(ast);
}

//console.log(__dirname);
//console.log(process.env.PWD);

//resolveSevenDirectory();
fileRenderer(path.resolve(__dirname, 'sass/base/elements.scss'))