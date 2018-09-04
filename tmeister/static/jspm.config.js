SystemJS.config({
  nodeConfig: {
    "paths": {
      "toggle-meister/": "src/"
    }
  },
  devConfig: {
    "map": {
      "babel-plugin-transform-decorators-legacy": "npm:babel-plugin-transform-decorators-legacy@1.3.4",
      "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.8.0",
      "core-js": "npm:core-js@2.4.1",
      "css": "github:MeoMix/jspm-loader-css@master",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.10",
      "postcss-safe-parser": "npm:postcss-safe-parser@1.0.7",
      "punycode": "npm:jspm-nodelibs-punycode@0.2.0",
      "vanilla": "github:systemjs/plugin-css@0.1.23",
      "cluster": "npm:jspm-nodelibs-cluster@0.2.0",
      "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.24.1"
    },
    "packages": {
      "github:MeoMix/jspm-loader-css@master": {
        "map": {
          "css-modules-loader-core": "npm:css-modules-loader-core@1.0.0",
          "cssnano": "npm:cssnano@3.7.3",
          "node-cssnano": "npm:cssnano@3.7.3"
        }
      },
      "npm:argparse@1.0.7": {
        "map": {
          "sprintf-js": "npm:sprintf-js@1.0.3"
        }
      },
      "npm:clap@1.1.1": {
        "map": {
          "chalk": "npm:chalk@1.1.3"
        }
      },
      "npm:coa@1.0.1": {
        "map": {
          "q": "npm:q@1.4.1"
        }
      },
      "npm:color-string@0.3.0": {
        "map": {
          "color-name": "npm:color-name@1.1.1"
        }
      },
      "npm:css-modules-loader-core@1.0.0": {
        "map": {
          "icss-replace-symbols": "npm:icss-replace-symbols@1.0.2",
          "postcss": "npm:postcss@5.0.10",
          "postcss-modules-extract-imports": "npm:postcss-modules-extract-imports@1.0.0",
          "postcss-modules-local-by-default": "npm:postcss-modules-local-by-default@1.0.0",
          "postcss-modules-scope": "npm:postcss-modules-scope@1.0.0",
          "postcss-modules-values": "npm:postcss-modules-values@1.1.0"
        }
      },
      "npm:css-selector-tokenizer@0.5.4": {
        "map": {
          "cssesc": "npm:cssesc@0.1.0",
          "fastparse": "npm:fastparse@1.1.1"
        }
      },
      "npm:csso@2.0.0": {
        "map": {
          "clap": "npm:clap@1.1.1",
          "source-map": "npm:source-map@0.5.6"
        }
      },
      "npm:is-svg@2.0.1": {
        "map": {
          "html-comment-regex": "npm:html-comment-regex@1.1.1"
        }
      },
      "npm:js-yaml@3.6.1": {
        "map": {
          "argparse": "npm:argparse@1.0.7",
          "esprima": "npm:esprima@2.7.2"
        }
      },
      "npm:mkdirp@0.5.1": {
        "map": {
          "minimist": "npm:minimist@0.0.8"
        }
      },
      "npm:postcss-colormin@2.2.0": {
        "map": {
          "colormin": "npm:colormin@1.1.1",
          "postcss": "npm:postcss@5.1.0",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
        }
      },
      "npm:postcss-discard-comments@2.0.4": {
        "map": {
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-discard-duplicates@2.0.1": {
        "map": {
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-discard-empty@2.1.0": {
        "map": {
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-discard-unused@2.2.1": {
        "map": {
          "flatten": "npm:flatten@1.0.2",
          "postcss": "npm:postcss@5.1.0",
          "uniqs": "npm:uniqs@2.0.0"
        }
      },
      "npm:postcss-merge-idents@2.1.6": {
        "map": {
          "has-own": "npm:has-own@1.0.0",
          "postcss": "npm:postcss@5.1.0",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
        }
      },
      "npm:postcss-merge-longhand@2.0.1": {
        "map": {
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-minify-font-values@1.0.5": {
        "map": {
          "object-assign": "npm:object-assign@4.1.0",
          "postcss": "npm:postcss@5.1.0",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
        }
      },
      "npm:postcss-minify-params@1.0.4": {
        "map": {
          "alphanum-sort": "npm:alphanum-sort@1.0.2",
          "postcss": "npm:postcss@5.1.0",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
          "uniqs": "npm:uniqs@2.0.0"
        }
      },
      "npm:postcss-minify-selectors@2.0.5": {
        "map": {
          "alphanum-sort": "npm:alphanum-sort@1.0.2",
          "postcss": "npm:postcss@5.1.0",
          "postcss-selector-parser": "npm:postcss-selector-parser@2.1.1"
        }
      },
      "npm:postcss-modules-extract-imports@1.0.0": {
        "map": {
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-modules-local-by-default@1.0.0": {
        "map": {
          "css-selector-tokenizer": "npm:css-selector-tokenizer@0.5.4",
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-modules-scope@1.0.0": {
        "map": {
          "css-selector-tokenizer": "npm:css-selector-tokenizer@0.5.4",
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-modules-values@1.1.0": {
        "map": {
          "icss-replace-symbols": "npm:icss-replace-symbols@1.0.2",
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-normalize-charset@1.1.0": {
        "map": {
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-normalize-url@3.0.7": {
        "map": {
          "is-absolute-url": "npm:is-absolute-url@2.0.0",
          "normalize-url": "npm:normalize-url@1.6.0",
          "postcss": "npm:postcss@5.1.0",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
        }
      },
      "npm:postcss-reduce-idents@2.3.0": {
        "map": {
          "postcss": "npm:postcss@5.1.0",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
        }
      },
      "npm:postcss-reduce-transforms@1.0.3": {
        "map": {
          "postcss": "npm:postcss@5.1.0",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
        }
      },
      "npm:postcss-unique-selectors@2.0.2": {
        "map": {
          "alphanum-sort": "npm:alphanum-sort@1.0.2",
          "postcss": "npm:postcss@5.1.0",
          "uniqs": "npm:uniqs@2.0.0"
        }
      },
      "npm:postcss-zindex@2.1.1": {
        "map": {
          "postcss": "npm:postcss@5.1.0",
          "uniqs": "npm:uniqs@2.0.0"
        }
      },
      "npm:postcss@5.0.10": {
        "map": {
          "js-base64": "npm:js-base64@2.1.9",
          "source-map": "npm:source-map@0.5.6",
          "supports-color": "npm:supports-color@3.1.2"
        }
      },
      "npm:reduce-function-call@1.0.1": {
        "map": {
          "balanced-match": "npm:balanced-match@0.1.0"
        }
      },
      "npm:svgo@0.6.6": {
        "map": {
          "coa": "npm:coa@1.0.1",
          "colors": "npm:colors@1.1.2",
          "csso": "npm:csso@2.0.0",
          "js-yaml": "npm:js-yaml@3.6.1",
          "mkdirp": "npm:mkdirp@0.5.1",
          "sax": "npm:sax@1.2.1",
          "whet.extend": "npm:whet.extend@0.9.9"
        }
      },
      "npm:postcss-safe-parser@1.0.7": {
        "map": {
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:supports-color@3.1.2": {
        "map": {
          "has-flag": "npm:has-flag@1.0.0"
        }
      },
      "npm:babel-plugin-syntax-decorators@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.9.2"
        }
      },
      "npm:babel-plugin-transform-decorators-legacy@1.3.4": {
        "map": {
          "babel-plugin-syntax-decorators": "npm:babel-plugin-syntax-decorators@6.8.0",
          "babel-runtime": "npm:babel-runtime@6.9.2",
          "babel-template": "npm:babel-template@6.9.0"
        }
      },
      "npm:babel-plugin-syntax-jsx@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.9.2"
        }
      },
      "npm:babel-plugin-transform-react-jsx@6.8.0": {
        "map": {
          "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.9.0",
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.8.0",
          "babel-runtime": "npm:babel-runtime@6.9.2"
        }
      },
      "npm:cssnano@3.7.3": {
        "map": {
          "object-assign": "npm:object-assign@4.1.0",
          "postcss": "npm:postcss@5.1.0",
          "postcss-discard-overridden": "npm:postcss-discard-overridden@0.1.1",
          "postcss-reduce-initial": "npm:postcss-reduce-initial@1.0.0",
          "autoprefixer": "npm:autoprefixer@6.3.7",
          "postcss-minify-font-values": "npm:postcss-minify-font-values@1.0.5",
          "defined": "npm:defined@1.0.0",
          "postcss-discard-comments": "npm:postcss-discard-comments@2.0.4",
          "postcss-discard-empty": "npm:postcss-discard-empty@2.1.0",
          "decamelize": "npm:decamelize@1.2.0",
          "postcss-convert-values": "npm:postcss-convert-values@2.4.0",
          "indexes-of": "npm:indexes-of@1.0.1",
          "postcss-discard-unused": "npm:postcss-discard-unused@2.2.1",
          "postcss-colormin": "npm:postcss-colormin@2.2.0",
          "postcss-discard-duplicates": "npm:postcss-discard-duplicates@2.0.1",
          "postcss-calc": "npm:postcss-calc@5.3.0",
          "postcss-merge-longhand": "npm:postcss-merge-longhand@2.0.1",
          "postcss-filter-plugins": "npm:postcss-filter-plugins@2.0.1",
          "postcss-merge-idents": "npm:postcss-merge-idents@2.1.6",
          "postcss-unique-selectors": "npm:postcss-unique-selectors@2.0.2",
          "postcss-normalize-charset": "npm:postcss-normalize-charset@1.1.0",
          "postcss-reduce-idents": "npm:postcss-reduce-idents@2.3.0",
          "postcss-zindex": "npm:postcss-zindex@2.1.1",
          "postcss-minify-selectors": "npm:postcss-minify-selectors@2.0.5",
          "postcss-merge-rules": "npm:postcss-merge-rules@2.0.10",
          "postcss-minify-params": "npm:postcss-minify-params@1.0.4",
          "postcss-minify-gradients": "npm:postcss-minify-gradients@1.0.3",
          "postcss-svgo": "npm:postcss-svgo@2.1.4",
          "postcss-reduce-transforms": "npm:postcss-reduce-transforms@1.0.3",
          "postcss-ordered-values": "npm:postcss-ordered-values@2.2.1",
          "postcss-normalize-url": "npm:postcss-normalize-url@3.0.7",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
        }
      },
      "npm:babel-template@6.9.0": {
        "map": {
          "babel-traverse": "npm:babel-traverse@6.11.4",
          "babel-types": "npm:babel-types@6.11.1",
          "babel-runtime": "npm:babel-runtime@6.9.2",
          "lodash": "npm:lodash@4.17.4",
          "babylon": "npm:babylon@6.8.4"
        }
      },
      "npm:babel-helper-builder-react-jsx@6.9.0": {
        "map": {
          "babel-types": "npm:babel-types@6.11.1",
          "esutils": "npm:esutils@2.0.2",
          "babel-runtime": "npm:babel-runtime@6.9.2",
          "lodash": "npm:lodash@4.17.4"
        }
      },
      "npm:postcss-discard-overridden@0.1.1": {
        "map": {
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-reduce-initial@1.0.0": {
        "map": {
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:autoprefixer@6.3.7": {
        "map": {
          "postcss": "npm:postcss@5.1.0",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
          "browserslist": "npm:browserslist@1.3.5",
          "caniuse-db": "npm:caniuse-db@1.0.30000507",
          "normalize-range": "npm:normalize-range@0.1.2",
          "num2fraction": "npm:num2fraction@1.2.2"
        }
      },
      "npm:postcss-convert-values@2.4.0": {
        "map": {
          "postcss": "npm:postcss@5.1.0",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
        }
      },
      "npm:postcss-filter-plugins@2.0.1": {
        "map": {
          "postcss": "npm:postcss@5.1.0",
          "uniqid": "npm:uniqid@3.1.0"
        }
      },
      "npm:postcss-calc@5.3.0": {
        "map": {
          "postcss": "npm:postcss@5.1.0",
          "reduce-css-calc": "npm:reduce-css-calc@1.2.4",
          "postcss-message-helpers": "npm:postcss-message-helpers@2.0.0"
        }
      },
      "npm:postcss-merge-rules@2.0.10": {
        "map": {
          "postcss": "npm:postcss@5.1.0",
          "vendors": "npm:vendors@1.0.0"
        }
      },
      "npm:postcss-svgo@2.1.4": {
        "map": {
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
          "postcss": "npm:postcss@5.1.0",
          "is-svg": "npm:is-svg@2.0.1",
          "svgo": "npm:svgo@0.6.6"
        }
      },
      "npm:postcss-ordered-values@2.2.1": {
        "map": {
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss-minify-gradients@1.0.3": {
        "map": {
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
          "postcss": "npm:postcss@5.1.0"
        }
      },
      "npm:postcss@5.1.0": {
        "map": {
          "supports-color": "npm:supports-color@3.1.2",
          "js-base64": "npm:js-base64@2.1.9",
          "source-map": "npm:source-map@0.5.6"
        }
      },
      "npm:browserslist@1.3.5": {
        "map": {
          "caniuse-db": "npm:caniuse-db@1.0.30000507"
        }
      },
      "npm:colormin@1.1.1": {
        "map": {
          "css-color-names": "npm:css-color-names@0.0.4",
          "color": "npm:color@0.11.3"
        }
      },
      "npm:reduce-css-calc@1.2.4": {
        "map": {
          "balanced-match": "npm:balanced-match@0.1.0",
          "reduce-function-call": "npm:reduce-function-call@1.0.1"
        }
      },
      "npm:color@0.11.3": {
        "map": {
          "color-convert": "npm:color-convert@1.3.1",
          "color-string": "npm:color-string@0.3.0",
          "clone": "npm:clone@1.0.2"
        }
      },
      "npm:uniqid@3.1.0": {
        "map": {
          "macaddress": "npm:macaddress@0.2.8"
        }
      },
      "npm:postcss-selector-parser@2.1.1": {
        "map": {
          "flatten": "npm:flatten@1.0.2",
          "indexes-of": "npm:indexes-of@1.0.1",
          "uniq": "npm:uniq@1.0.1"
        }
      },
      "npm:normalize-url@1.6.0": {
        "map": {
          "object-assign": "npm:object-assign@4.1.0",
          "query-string": "npm:query-string@4.2.2",
          "sort-keys": "npm:sort-keys@1.1.2",
          "prepend-http": "npm:prepend-http@1.0.4"
        }
      },
      "npm:query-string@4.2.2": {
        "map": {
          "object-assign": "npm:object-assign@4.1.0",
          "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
        }
      },
      "npm:sort-keys@1.1.2": {
        "map": {
          "is-plain-obj": "npm:is-plain-obj@1.1.0"
        }
      },
      "npm:jspm-nodelibs-punycode@0.2.0": {
        "map": {
          "punycode-browserify": "npm:punycode@1.4.1"
        }
      },
      "npm:babel-plugin-transform-class-properties@6.24.1": {
        "map": {
          "babel-template": "npm:babel-template@6.24.1",
          "babel-helper-function-name": "npm:babel-helper-function-name@6.24.1",
          "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.13.0",
          "babel-runtime": "npm:babel-runtime@6.23.0"
        }
      },
      "npm:babel-helper-function-name@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "babel-template": "npm:babel-template@6.24.1",
          "babel-traverse": "npm:babel-traverse@6.24.1",
          "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.24.1",
          "babel-types": "npm:babel-types@6.24.1"
        }
      },
      "npm:babel-template@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "babel-traverse": "npm:babel-traverse@6.24.1",
          "babel-types": "npm:babel-types@6.24.1",
          "babylon": "npm:babylon@6.17.1",
          "lodash": "npm:lodash@4.17.4"
        }
      },
      "npm:babel-helper-get-function-arity@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "babel-types": "npm:babel-types@6.24.1"
        }
      },
      "npm:babel-runtime@6.23.0": {
        "map": {
          "regenerator-runtime": "npm:regenerator-runtime@0.10.5",
          "core-js": "npm:core-js@2.4.1"
        }
      },
      "npm:babel-types@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "lodash": "npm:lodash@4.17.4",
          "esutils": "npm:esutils@2.0.2",
          "to-fast-properties": "npm:to-fast-properties@1.0.3"
        }
      },
      "npm:babel-traverse@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0",
          "babel-types": "npm:babel-types@6.24.1",
          "babylon": "npm:babylon@6.17.1",
          "lodash": "npm:lodash@4.17.4",
          "invariant": "npm:invariant@2.2.2",
          "babel-code-frame": "npm:babel-code-frame@6.22.0",
          "babel-messages": "npm:babel-messages@6.23.0",
          "globals": "npm:globals@9.17.0",
          "debug": "npm:debug@2.6.8"
        }
      },
      "npm:babel-messages@6.23.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.23.0"
        }
      },
      "npm:babel-code-frame@6.22.0": {
        "map": {
          "esutils": "npm:esutils@2.0.2",
          "js-tokens": "npm:js-tokens@3.0.1",
          "chalk": "npm:chalk@1.1.3"
        }
      },
      "npm:debug@2.6.8": {
        "map": {
          "ms": "npm:ms@2.0.0"
        }
      },
      "npm:invariant@2.2.2": {
        "map": {
          "loose-envify": "npm:loose-envify@1.3.1"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "toggle-meister": {
      "main": "toggle-meister.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel",
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-react-jsx",
              "babel-plugin-transform-decorators-legacy",
              "babel-plugin-transform-class-properties"
            ]
          }
        },
        "*.css": {
          "loader": "css"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.0",
    "babel-types": "npm:babel-types@6.8.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.0",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
    "constants": "npm:jspm-nodelibs-constants@0.2.0",
    "cpr-multiselect": "npm:cpr-multiselect@2.7.1",
    "cpr-tooltip": "npm:cpr-tooltip@1.1.2",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
    "domain": "npm:jspm-nodelibs-domain@0.2.0",
    "events": "npm:jspm-nodelibs-events@0.2.0",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "fuzzy": "npm:fuzzy@0.1.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.0",
    "jquery": "npm:jquery@3.1.1",
    "lodash": "npm:lodash@4.17.4",
    "moment": "npm:moment@2.15.1",
    "net": "npm:jspm-nodelibs-net@0.2.0",
    "os": "npm:jspm-nodelibs-os@0.2.0",
    "path": "npm:jspm-nodelibs-path@0.2.0",
    "process": "npm:jspm-nodelibs-process@0.2.0",
    "prop-types": "npm:prop-types@15.6.0",
    "react": "npm:react@15.3.2",
    "react-dom": "npm:react-dom@15.2.1",
    "react-redux": "npm:react-redux@4.4.5",
    "react-router": "npm:react-router@2.6.0",
    "redux": "npm:redux@3.5.2",
    "redux-thunk": "npm:redux-thunk@2.1.0",
    "rx": "npm:rx@4.1.0",
    "rxjs": "npm:rxjs@6.3.2",
    "single-spa-canopy": "npm:single-spa-canopy@1.15.0",
    "sofe": "npm:sofe@1.5.5",
    "stream": "npm:jspm-nodelibs-stream@0.2.0",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
    "tty": "npm:jspm-nodelibs-tty@0.2.0",
    "url": "npm:jspm-nodelibs-url@0.2.0",
    "util": "npm:jspm-nodelibs-util@0.2.0",
    "vm": "npm:jspm-nodelibs-vm@0.2.0",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.0"
  },
  packages: {
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.1.1",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "des.js": "npm:des.js@1.0.0",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.0"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "miller-rabin": "npm:miller-rabin@4.0.1",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.3",
        "parse-asn1": "npm:parse-asn1@5.1.0",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:react-redux@4.4.5": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
        "invariant": "npm:invariant@2.2.1",
        "lodash": "npm:lodash@4.17.4",
        "loose-envify": "npm:loose-envify@1.2.0"
      }
    },
    "npm:redux@3.5.2": {
      "map": {
        "lodash": "npm:lodash@4.17.4",
        "lodash-es": "npm:lodash-es@4.13.1",
        "loose-envify": "npm:loose-envify@1.2.0",
        "symbol-observable": "npm:symbol-observable@0.2.4"
      }
    },
    "npm:babel-messages@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.9.2"
      }
    },
    "npm:babel-types@6.8.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.9.2",
        "babel-traverse": "npm:babel-traverse@6.11.4",
        "esutils": "npm:esutils@2.0.2",
        "lodash": "npm:lodash@3.10.1",
        "to-fast-properties": "npm:to-fast-properties@1.0.2"
      }
    },
    "npm:chalk@1.1.3": {
      "map": {
        "ansi-styles": "npm:ansi-styles@2.2.1",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "has-ansi": "npm:has-ansi@2.0.0",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "supports-color": "npm:supports-color@2.0.0"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.1.1"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.1.1"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "pako": "npm:pako@0.2.9",
        "readable-stream": "npm:readable-stream@2.3.4"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.19"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.7.3",
        "whatwg-fetch": "npm:whatwg-fetch@2.0.3"
      }
    },
    "npm:promise@7.1.1": {
      "map": {
        "asap": "npm:asap@2.0.5"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:invariant@2.2.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.2.0"
      }
    },
    "npm:query-string@3.0.3": {
      "map": {
        "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.4"
      }
    },
    "npm:warning@2.1.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.2.0"
      }
    },
    "npm:babel-runtime@6.9.2": {
      "map": {
        "core-js": "npm:core-js@2.4.1",
        "regenerator-runtime": "npm:regenerator-runtime@0.9.5"
      }
    },
    "npm:babel-traverse@6.11.4": {
      "map": {
        "babel-types": "npm:babel-types@6.11.1",
        "babel-runtime": "npm:babel-runtime@6.9.2",
        "lodash": "npm:lodash@4.17.4",
        "invariant": "npm:invariant@2.2.1",
        "babel-code-frame": "npm:babel-code-frame@6.11.0",
        "babylon": "npm:babylon@6.8.4",
        "babel-messages": "npm:babel-messages@6.8.0",
        "globals": "npm:globals@8.18.0",
        "debug": "npm:debug@2.2.0"
      }
    },
    "npm:babel-types@6.11.1": {
      "map": {
        "to-fast-properties": "npm:to-fast-properties@1.0.2",
        "babel-runtime": "npm:babel-runtime@6.9.2",
        "babel-traverse": "npm:babel-traverse@6.11.4",
        "lodash": "npm:lodash@4.17.4",
        "esutils": "npm:esutils@2.0.2"
      }
    },
    "npm:cpr-multiselect@2.7.1": {
      "map": {
        "lodash": "npm:lodash@4.17.4"
      }
    },
    "npm:react-router@2.6.0": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
        "loose-envify": "npm:loose-envify@1.2.0",
        "history": "npm:history@2.1.2",
        "invariant": "npm:invariant@2.2.1",
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.2.0"
      }
    },
    "npm:history@2.1.2": {
      "map": {
        "invariant": "npm:invariant@2.2.1",
        "warning": "npm:warning@2.1.0",
        "query-string": "npm:query-string@3.0.3",
        "deep-equal": "npm:deep-equal@1.0.1"
      }
    },
    "npm:babel-code-frame@6.11.0": {
      "map": {
        "esutils": "npm:esutils@2.0.2",
        "babel-runtime": "npm:babel-runtime@6.9.2",
        "js-tokens": "npm:js-tokens@2.0.0",
        "chalk": "npm:chalk@1.1.3"
      }
    },
    "npm:babylon@6.8.4": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.9.2"
      }
    },
    "npm:loose-envify@1.2.0": {
      "map": {
        "js-tokens": "npm:js-tokens@1.0.3"
      }
    },
    "npm:buffer@4.9.1": {
      "map": {
        "base64-js": "npm:base64-js@1.2.3",
        "isarray": "npm:isarray@1.0.0",
        "ieee754": "npm:ieee754@1.1.8"
      }
    },
    "npm:react@15.3.2": {
      "map": {
        "object-assign": "npm:object-assign@4.1.0",
        "loose-envify": "npm:loose-envify@1.2.0",
        "fbjs": "npm:fbjs@0.8.5"
      }
    },
    "npm:fbjs@0.8.5": {
      "map": {
        "loose-envify": "npm:loose-envify@1.2.0",
        "object-assign": "npm:object-assign@4.1.0",
        "promise": "npm:promise@7.1.1",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "immutable": "npm:immutable@3.8.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.10",
        "core-js": "npm:core-js@1.2.7"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.0": {
      "map": {
        "buffer-browserify": "npm:buffer@4.9.1"
      }
    },
    "npm:jspm-nodelibs-os@0.2.0": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.0": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.0": {
      "map": {
        "domain-browserify": "npm:domain-browser@1.2.0"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.0": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:jspm-nodelibs-url@0.2.0": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.0": {
      "map": {
        "zlib-browserify": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.0": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.12.0"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.8.0"
      }
    },
    "npm:sofe@1.5.5": {
      "map": {
        "path-browserify": "npm:path-browserify@0.0.0"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.0",
        "parse-asn1": "npm:parse-asn1@5.1.0",
        "browserify-rsa": "npm:browserify-rsa@4.0.1"
      }
    },
    "npm:create-hash@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "ripemd160": "npm:ripemd160@2.0.1",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.10"
      }
    },
    "npm:create-hmac@1.1.6": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "create-hash": "npm:create-hash@1.1.3",
        "ripemd160": "npm:ripemd160@2.0.1",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.10"
      }
    },
    "npm:ripemd160@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@2.0.2"
      }
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "hash.js": "npm:hash.js@1.1.3",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:parse-asn1@5.1.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.1.1",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "pbkdf2": "npm:pbkdf2@3.0.14",
        "asn1.js": "npm:asn1.js@4.10.1"
      }
    },
    "npm:hash-base@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:loose-envify@1.3.1": {
      "map": {
        "js-tokens": "npm:js-tokens@3.0.2"
      }
    },
    "npm:prop-types@15.6.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.16",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:fbjs@0.8.16": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.17",
        "promise": "npm:promise@7.3.1",
        "core-js": "npm:core-js@1.2.7",
        "setimmediate": "npm:setimmediate@1.0.5"
      }
    },
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:node-fetch@1.7.3": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:readable-stream@2.3.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "core-util-is": "npm:core-util-is@1.0.2",
        "string_decoder": "npm:string_decoder@1.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "isarray": "npm:isarray@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@2.0.0"
      }
    },
    "npm:string_decoder@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:stream-http@2.8.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.4",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "xtend": "npm:xtend@4.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0"
      }
    },
    "npm:crypto-browserify@3.12.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "create-hash": "npm:create-hash@1.1.3",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "create-hmac": "npm:create-hmac@1.1.6",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "pbkdf2": "npm:pbkdf2@3.0.14",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "randombytes": "npm:randombytes@2.0.6",
        "randomfill": "npm:randomfill@1.0.4"
      }
    },
    "npm:pbkdf2@3.0.14": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "sha.js": "npm:sha.js@2.4.10",
        "ripemd160": "npm:ripemd160@2.0.1"
      }
    },
    "npm:randombytes@2.0.6": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:randomfill@1.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "randombytes": "npm:randombytes@2.0.6"
      }
    },
    "npm:sha.js@2.4.10": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "md5.js": "npm:md5.js@1.3.4"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:browserify-aes@1.1.1": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:hash.js@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:md5.js@1.3.4": {
      "map": {
        "hash-base": "npm:hash-base@3.0.4",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:asn1.js@4.10.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:rxjs@6.3.2": {
      "map": {
        "tslib": "npm:tslib@1.9.3"
      }
    },
    "npm:single-spa-canopy@1.15.0": {
      "map": {
        "deepmerge": "npm:deepmerge@1.5.2"
      }
    }
  }
});
