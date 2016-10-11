/* istanbul instrument in package nedb-lite */
/*jslint
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
    (function () {
        // init Error.stackTraceLimit
        Error.stackTraceLimit = 16;
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = window.local;
            local.utility2 = window.utility2;
            break;
        // re-init local from example.js
        case 'node':
            local = (module.utility2 || require('utility2')).requireExampleJsFromReadme({
                __dirname: __dirname,
                module: module,
                moduleExports: __dirname + '/index.js',
                moduleName: 'nedb-lite'
            });
            /* istanbul ignore next */
            if (module.isRollup) {
                local = module;
                return;
            }
            break;
        }
        // require modules
        local.utility2.Nedb = local;
        local.utility2.assert = local.assert;
        local.utility2.dbExport = local.dbExport;
        local.utility2.dbImport = local.dbImport;
        local.utility2.dbTableCreate = local.dbTableCreate;
        local.utility2.dbTableDrop = local.dbTableDrop;
        local.utility2.jsonStringifyOrdered = local.jsonStringifyOrdered;
        local.utility2.onErrorDefault = local.onErrorDefault;
        local.utility2.onNext = local.onNext;
    }());



    // run shared js-env code - function
    (function () {
        local.crudOptionsSetDefault = function (options, defaults) {
        /*
         * this function will set default-values for options
         */
            options = local.utility2.objectSetDefault(options, defaults);
            options.table = local.dbTableDict.TestCrud;
            // shallow-copy options
            return local.utility2.objectSetDefault({}, options);
        };

        local.testCase_assertXxx_default = function (options, onError) {
        /*
         * this function will test assertXxx's default handling-behavior
         */
            options = {};
            // test assertion passed
            local.utility2.assert(true, true);
            // test assertion failed with undefined message
            local.utility2.tryCatchOnError(function () {
                local.utility2.assert(false);
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                // validate error-message
                local.utility2.assertJsonEqual(error.message, '');
            });
            // test assertion failed with string message
            local.utility2.tryCatchOnError(function () {
                local.utility2.assert(false, 'hello');
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                // validate error-message
                local.utility2.assertJsonEqual(error.message, 'hello');
            });
            // test assertion failed with error object
            local.utility2.tryCatchOnError(function () {
                local.utility2.assert(false, local.utility2.errorDefault);
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
            });
            // test assertion failed with json object
            local.utility2.tryCatchOnError(function () {
                local.utility2.assert(false, { aa: 1 });
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                // validate error-message
                local.utility2.assertJsonEqual(error.message, '{"aa":1}');
            });
            options.list = ['', 0, false, null, undefined];
            options.list.forEach(function (aa, ii) {
                options.list.forEach(function (bb, jj) {
                    if (ii === jj) {
                        // test assertJsonEqual's handling-behavior
                        local.utility2.assertJsonEqual(aa, bb);
                    } else {
                        // test assertJsonNotEqual's handling-behavior
                        local.utility2.assertJsonNotEqual(aa, bb);
                    }
                });
            });
            onError();
        };

        local.testCase_consoleLog_default = function (options, onError) {
        /*
         * this function will test consoleLog's default handling-behavior
         */
            options = {};
            options.data = null;
            console.log(options.data);
            options.data = '\n';
            console.log(options.data);
            onError();
        };

        local.testCase_dbExport_default = function (options, onError) {
        /*
         * this function will test dbExport's default handling-behavior
         */
            options = {};
            options.name = 'testCase_dbExport_default';
            options.table = local.dbTableCreate(options);
            options.table.ensureIndex({
                fieldName: 'id',
                unique: true
            }, local.utility2.onErrorDefault);
            options.data = local.dbExport();
            // validate data
            local.utility2.assert(options.data.indexOf('"testCase_dbExport_default"\n' +
                '{"$$indexCreated":{"fieldName":"createdAt","unique":false,"sparse":false}}\n' +
                '{"$$indexCreated":{"fieldName":"updatedAt","unique":false,"sparse":false}}\n' +
                '{"$$indexCreated":{"fieldName":"id","unique":true,"sparse":false}}')
                >= 0, options.data);
            onError();
        };

        local.testCase_dbImport_default = function (options, onError) {
        /*
         * this function will test dbImport's default handling-behavior
         */
            // jslint-hack
            local.utility2.nop(options);
            local.dbImport('"testCase_dbImport_default"\n{"id":0}', onError);
        };

        local.testCase_dbTableCreate_default = function (options, onError) {
        /*
         * this function will test dbTableCreate's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                id: '00_test_dbTableCount'
            });
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    local.dbTableCount(options.table, {
                        query: { id: options.id }
                    }, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.utility2.assertJsonEqual(data, 1);
                    options.onNext();
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_dbTableCount_default = function (options, onError) {
        /*
         * this function will test dbTableCount's default handling-behavior
         */
            options = {};
            options.name = 'testCase_dbTableCount_default';
            options.table = local.dbTableCreate(options);
            // test re-create handling-behavior
            options.table = local.dbTableCreate(options);
            // test reset handling-behavior
            options.reset = true;
            options.table = local.dbTableCreate(options);
            onError();
        };

        local.testCase_dbTableDrop_default = function (options, onError) {
        /*
         * this function will test dbTableDrop's default handling-behavior
         */
            options = {};
            options.name = 'testCase_dbTableDrop_default';
            options.table = local.dbTableCreate(options);
            local.dbTableDrop(options.table, onError);
            // test undefined-table handling-behavior
            local.dbTableDrop(options.table, local.utility2.onErrorDefault);
        };

        local.testCase_dbTableFindOneById_default = function (options, onError) {
        /*
         * this function will test dbTableFindOneById's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                id: '00_test_dbTableFindOneById'
            });
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    local.dbTableFindOne(options.table, {
                        query: { id: options.id }
                    }, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.utility2.assertJsonEqual(data.id, options.id);
                    options.onNext();
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_dbTableRemoveOneById_default = function (options, onError) {
        /*
         * this function will test dbTableRemoveOneById's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                id: '00_test_dbTableRemoveOneById'
            });
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    local.testCase_dbTableFindOneById_default(options, options.onNext);
                    break;
                case 2:
                    options.table.remove({ id: options.id }, options.onNext);
                    break;
                case 3:
                    local.dbTableFindOne(options.table, {
                        query: { id: options.id }
                    }, options.onNext);
                    break;
                case 4:
                    // validate data was removed
                    local.utility2.assertJsonEqual(data, null);
                    options.onNext();
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_jsonStringifyOrdered_default = function (options, onError) {
        /*
         * this function will test jsonStringifyOrdered's default handling-behavior
         */
            options = {};
            // test data-type handling-behavior
            [undefined, null, false, true, 0, 1, 1.5, 'a', {}, []].forEach(function (data) {
                options.aa = local.utility2.jsonStringifyOrdered(data);
                options.bb = JSON.stringify(data);
                local.utility2.assertJsonEqual(options.aa, options.bb);
            });
            // test data-ordering handling-behavior
            options = {
                // test nested dict handling-behavior
                ff: { hh: 2, gg: 1},
                // test nested array handling-behavior
                ee: [1, null, undefined],
                dd: local.utility2.nop,
                cc: undefined,
                bb: null,
                aa: 1
            };
            // test circular-reference handling-behavior
            options.zz = options;
            local.utility2.assertJsonEqual(
                options,
                { aa: 1, bb: null, ee: [ 1, null, null ], ff: { gg: 1, hh: 2 } }
            );
            onError();
        };

        local.testCase_onErrorDefault_default = function (options, onError) {
        /*
         * this function will test onErrorDefault's default handling-behavior
         */
            local.utility2.testMock([
                // suppress console.error
                [console, { error: function (arg) {
                    options = arg;
                } }],
                [local.global, { __coverage__: null }]
            ], function (onError) {
                // test no error handling-behavior
                local.utility2.onErrorDefault();
                // validate options
                local.utility2.assert(!options, options);
                // test error handling-behavior
                local.utility2.onErrorDefault(local.utility2.errorDefault);
                // validate options
                local.utility2.assert(options, options);
                onError();
            }, onError);
        };

        local.testCase_onNext_error = function (options, onError) {
        /*
         * this function will test onNext's error handling-behavior
         */

            options = {};
            local.utility2.onNext(options, function () {
                throw local.utility2.errorDefault;
            });
            options.modeNext = 0;
            local.utility2.tryCatchOnError(function () {
                options.onNext();
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                onError();
            });
        };

        local.testCase_queryCompare_default = function (options, onError) {
        /*
         * this function will test queryCompare's default handling-behavior
         */
            options = [
                // $elemMatch
                ['$elemMatch', undefined, undefined, false],
                ['$elemMatch', [undefined], undefined, false],
                // $eq
                ['$eq', undefined, undefined, true],
                ['$eq', null, undefined, true],
                ['$eq', NaN, NaN, true],
                // $exists
                ['$exists', false, undefined, true],
                ['$exists', true, undefined, false],
                // $gt
                ['$gt', undefined, undefined, false],
                ['$gt', undefined, undefined, false],
                // $gte
                ['$gte', undefined, undefined, true],
                // $in
                ['$in', undefined, undefined, false],
                ['$in', undefined, [undefined], true],
                // $lt
                ['$lt', undefined, undefined, false],
                // $lte
                ['$lte', undefined, undefined, true],
                // $ne
                ['$ne', undefined, undefined, false],
                // $nin
                ['$nin', undefined, undefined, false],
                ['$nin', undefined, [undefined], false],
                // $regex
                ['$regex', undefined, undefined, false],
                // $size
                ['$size', undefined, undefined, false],
                ['$size', [undefined], undefined, false],
                [undefined, undefined, undefined, false]
            ];
            options.forEach(function (element) {
                local.utility2.assertJsonEqual(
                    [
                        element[0],
                        element[1],
                        element[2],
                        local.queryCompare(element[0], element[1], element[2])
                    ],
                    element
                );
            });
            onError();
        };

        local.testCase_sortCompare_default = function (options, onError) {
        /*
         * this function will test sortCompare's default handling-behavior
         */
            options = {};
            options.data = [undefined, null, false, 0, '', true, 1, 'a', local.utility2.nop];
            local.utility2.assertJsonEqual(
                options.data.sort(local.sortCompare),
                [null, false, true, 0, 1, '', 'a', null, null]
            );
            local.utility2.assertJsonEqual(
                options.data.reverse().sort(local.sortCompare),
                [null, false, true, 0, 1, '', 'a', null, null]
            );
            onError();
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        local.testCase_build_app = function (options, onError) {
        /*
         * this function will test build's app handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = {};
            options = [{
                file: '/assets.app.js',
                url: '/assets.app.js'
            }, {
                file: '/assets.app.min.js',
                url: '/assets.app.min.js'
            }, {
                file: '/assets.example.js',
                url: '/assets.example.js'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.css',
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.css'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.js',
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.js'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.min.js',
                transform: function (data) {
                    return local.utility2.uglifyIfProduction(
                        local.utility2.bufferToString(data)
                    );
                },
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.js'
            }, {
                file: '/assets.test.js',
                url: '/assets.test.js'
            }, {
                file: '/assets.utility2.rollup.js',
                url: '/assets.utility2.rollup.js'
            }, {
                file: '/index.html',
                url: '/index.html'
            }, {
                file: '/jsonp.utility2.stateInit',
                url: '/jsonp.utility2.stateInit?callback=window.utility2.stateInit'
            }];
            options.forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    onParallel.counter += 1;
                    // validate no error occurred
                    onParallel(error);
                    switch (local.path.extname(options.file)) {
                    case '.css':
                    case '.js':
                    case '.json':
                        local.utility2.jslintAndPrintConditional(
                            xhr.responseText,
                            options.file
                        );
                        // validate no error occurred
                        local.utility2.assert(
                            !local.utility2.jslint.errorText,
                            local.utility2.jslint.errorText
                        );
                        break;
                    }
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/app' + options.file,
                        (options.transform || local.utility2.echo)(xhr.response),
                        onParallel
                    );
                });
            });
            onParallel();
        };

        local.testCase_build_doc = function (options, onError) {
        /*
         * this function will test build's doc handling-behavior
         */
            options = {};
            local.utility2.onNext(options, function (error) {
                switch (options.modeNext) {
                case 1:
                    options.moduleDict = {
                        Nedb: {
                            exampleList: [],
                            exports: local.Nedb
                        },
                        'Nedb.Persistence': {
                            exampleList: [],
                            exports: local.Nedb.Persistence
                        },
                        'Nedb.Persistence.prototype': {
                            exampleList: [],
                            exports: local.Nedb.Persistence.prototype
                        },
                        'Nedb.prototype': {
                            exampleList: [],
                            exports: local.Nedb.prototype
                        }
                    };
                    Object.keys(options.moduleDict).forEach(function (key) {
                        options.moduleDict[key].example = [
                            'README.md',
                            'test.js',
                            'index.js'
                        ]
                            .concat(options.moduleDict[key].exampleList)
                            .map(function (file) {
                                return '\n\n\n\n\n\n\n\n' +
                                    local.fs.readFileSync(file, 'utf8') +
                                    '\n\n\n\n\n\n\n\n';
                            }).join('');
                    });
                    // create doc.api.html
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/doc.api.html',
                        local.utility2.docApiCreate(options),
                        options.onNext
                    );
                    break;
                case 2:
                    local.utility2.browserTest({
                        modeBrowserTest: 'screenCapture',
                        url: 'file://' + local.utility2.envDict.npm_config_dir_build +
                            '/doc.api.html'
                    }, options.onNext);
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_webpage_default = function (options, onError) {
        /*
         * this function will test the webpage's default handling-behavior
         */
            options = {
                modeCoverageMerge: true,
                url: local.utility2.serverLocalHost + '?modeTest=1'
            };
            local.utility2.browserTest(options, onError);
        };
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init dbSeedList
        local.utility2.dbSeedList = local.utility2.dbSeedList.concat([{
            dbRowList: [{
                id: '00_test_dbTableCount'
            }, {
                id: '00_test_dbTableFindOneById'
            }, {
                id: '00_test_dbTableRemoveOneById'
            }],
            ensureIndexList: [{
                expireAfterSeconds: 30,
                fieldName: 'field1',
                sparse: true,
                unique: true
            }],
            name: 'TestCrud'
        }]);
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // run tests
        local.utility2.testRun(local);
        break;



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // run test-server
        local.utility2.testRunServer(local);
        // init repl debugger
        local.utility2.replStart();
        /* istanbul ignore next */
        if (module !== require.main || module.isRollup) {
            break;
        }
        // init assets
        local.utility2.assetsDict['/assets.app.js'] = [
            'header',
            '/assets.utility2.rollup.js',
            'local.utility2.stateInit',
            '/assets.nedb-lite.js',
            '/assets.example.js',
            '/assets.test.js'
        ].map(function (key) {
            switch (key) {
/* jslint-ignore-begin */
case 'header':
return '\
/*\n\
assets.app.js\n\
\n' + local.utility2.envDict.npm_package_description + '\n\
\n\
instruction\n\
    1. save this script as assets.app.js\n\
    2. run the shell command:\n\
        $ PORT=8081 node assets.app.js\n\
    3. open a browser to http://localhost:8081\n\
    4. edit or paste script in browser to eval\n\
*/\n\
';
/* jslint-ignore-end */
            case 'local.utility2.stateInit':
                return '// ' + key + '\n' +
                    local.utility2.assetsDict['/assets.utility2.rollup.content.js']
                    .replace(
                        '/* utility2.rollup.js content */',
                        key + '(' + JSON.stringify(
                            local.utility2.middlewareJsonpStateInit({ stateInit: true })
                        ) + ');'
                    );
            default:
                return '// ' + key + '\n' + local.utility2.assetsDict[key];
            }
        }).join('\n\n\n\n');
        local.utility2.assetsDict['/assets.app.min.js'] =
            local.utility2.uglifyIfProduction(local.utility2.assetsDict['/assets.app.js']);
        break;
    }
}());
