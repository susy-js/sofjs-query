'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var format = require('sofjs-format');
var SofRPC = require('sofjs-rpc');
var promiseToCallback = require('promise-to-callback');

module.exports = Sof;

function Sof(provider, options) {
  var self = this;
  var optionsObject = options || {};

  if (!(this instanceof Sof)) {
    throw new Error('[sofjs-query] the Sof object requires the "new" flag in order to function normally (i.e. `const sof = new Sof(provider);`).');
  }
  if (typeof provider !== 'object') {
    throw new Error('[sofjs-query] the Sof object requires that the first input \'provider\' must be an object, got \'' + typeof provider + '\' (i.e. \'const sof = new Sof(provider);\')');
  }

  self.options = (0, _assign2['default'])({
    debug: optionsObject.debug || false,
    logger: optionsObject.logger || console,
    jsonSpace: optionsObject.jsonSpace || 0
  });
  self.rpc = new SofRPC(provider);
  self.setProvider = self.rpc.setProvider;
}

Sof.prototype.log = function log(message) {
  var self = this;
  if (self.options.debug) self.options.logger.log('[sofjs-query log] ' + message);
};

(0, _keys2['default'])(format.schema.methods).forEach(function (rpcMethodName) {
  (0, _defineProperty2['default'])(Sof.prototype, rpcMethodName.replace('sof_', ''), {
    enumerable: true,
    value: generateFnFor(rpcMethodName, format.schema.methods[rpcMethodName])
  });
});

function generateFnFor(rpcMethodName, methodObject) {
  return function outputMethod() {
    var performCall = function () {
      var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
        var result, methodOutputs, outputError;
        return _regenerator2['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(args.length < methodObject[2])) {
                  _context.next = 2;
                  break;
                }

                throw new Error('[sofjs-query] method \'' + protoMethodName + '\' requires at least ' + methodObject[2] + ' input (format type ' + methodObject[0][0] + '), ' + args.length + ' provided. For more information visit: https://octonion.institute/susy-go/wiki/JSON-RPC#' + rpcMethodName.toLowerCase());

              case 2:
                if (!(args.length > methodObject[0].length)) {
                  _context.next = 4;
                  break;
                }

                throw new Error('[sofjs-query] method \'' + protoMethodName + '\' requires at most ' + methodObject[0].length + ' params, ' + args.length + ' provided \'' + (0, _stringify2['default'])(args, null, self.options.jsonSpace) + '\'. For more information visit: https://octonion.institute/susy-go/wiki/JSON-RPC#' + rpcMethodName.toLowerCase());

              case 4:

                // set default block
                if (methodObject[3] && args.length < methodObject[3]) {
                  args.push('latest');
                }

                // format inputs
                this.log('attempting method formatting for \'' + protoMethodName + '\' with inputs ' + (0, _stringify2['default'])(args, null, this.options.jsonSpace));
                _context.prev = 6;

                inputs = format.formatInputs(rpcMethodName, args);
                this.log('method formatting success for \'' + protoMethodName + '\' with formatted result: ' + (0, _stringify2['default'])(inputs, null, this.options.jsonSpace));
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](6);
                throw new Error('[sofjs-query] while formatting inputs \'' + (0, _stringify2['default'])(args, null, this.options.jsonSpace) + '\' for method \'' + protoMethodName + '\' error: ' + _context.t0);

              case 14:
                _context.next = 16;
                return this.rpc.sendAsync({ method: rpcMethodName, params: inputs });

              case 16:
                result = _context.sent;
                _context.prev = 17;

                this.log('attempting method formatting for \'' + protoMethodName + '\' with raw outputs: ' + (0, _stringify2['default'])(result, null, this.options.jsonSpace));
                methodOutputs = format.formatOutputs(rpcMethodName, result);

                this.log('method formatting success for \'' + protoMethodName + '\' formatted result: ' + (0, _stringify2['default'])(methodOutputs, null, this.options.jsonSpace));
                return _context.abrupt('return', methodOutputs);

              case 24:
                _context.prev = 24;
                _context.t1 = _context['catch'](17);
                outputError = new Error('[sofjs-query] while formatting outputs from RPC \'' + (0, _stringify2['default'])(result, null, this.options.jsonSpace) + '\' for method \'' + protoMethodName + '\' ' + _context.t1);
                throw outputError;

              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 11], [17, 24]]);
      }));

      return function performCall() {
        return _ref.apply(this, arguments);
      };
    }();

    var callback = null; // eslint-disable-line
    var inputs = null; // eslint-disable-line
    var inputError = null; // eslint-disable-line
    var self = this;
    var args = [].slice.call(arguments); // eslint-disable-line
    var protoMethodName = rpcMethodName.replace('sof_', ''); // eslint-disable-line

    if (args.length > 0 && typeof args[args.length - 1] === 'function') {
      callback = args.pop();
    }

    var promise = performCall.call(this);

    // if callback provided, convert promise to callback
    if (callback) {
      return promiseToCallback(promise)(callback);
    }

    // only return promise if no callback provided
    return promise;
  };
}