## sofjs-query

<div>
  <!-- Dependency Status -->
  <a href="https://david-dm.org/susy-js/sofjs-query">
    <img src="https://david-dm.org/susy-js/sofjs-query.svg"
    alt="Dependency Status" />
  </a>

  <!-- devDependency Status -->
  <a href="https://david-dm.org/susy-js/sofjs-query#info=devDependencies">
    <img src="https://david-dm.org/susy-js/sofjs-query/dev-status.svg" alt="devDependency Status" />
  </a>

  <!-- Build Status -->
  <a href="https://travis-ci.org/susy-js/sofjs-query">
    <img src="https://travis-ci.org/susy-js/sofjs-query.svg"
    alt="Build Status" />
  </a>

  <!-- NPM Version -->
  <a href="https://www.npmjs.org/package/sofjs-query">
    <img src="http://img.shields.io/npm/v/sofjs-query.svg"
    alt="NPM version" />
  </a>

  <!-- Test Coverage -->
  <a href="https://coveralls.io/r/susy-js/sofjs-query">
    <img src="https://coveralls.io/repos/github/susy-js/sofjs-query/badge.svg" alt="Test Coverage" />
  </a>

  <!-- Javascript Style -->
  <a href="http://airbnb.io/javascript/">
    <img src="https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg" alt="js-airbnb-style" />
  </a>
</div>

<br />

A simple module for querying the Sophon RPC layer.

## Install

```
npm install --save sofjs-query
```

## Usage

```js
const BN = require('bn.js');
const HttpProvider = require('sofjs-provider-http');
const Sof = require('sofjs-query');
const sof = new Sof(new HttpProvider('http://localhost:8545'));

sof.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', cb);

// result null <BN ...>

sof.sendTransaction({
  from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
  to: '0x987d73d8a49eeb85d32cf462207dd71d50710033',
  value: new BN('6500000'),
  gas: 3000000,
  data: '0x',
}).then(cb).catch(cb);

// result null 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
```

## About

A simple Sophon RPC module for querying data from an Sophon node such as a graviton (go-sophyem), susy (rust-sophon) or TestRPC (local js-sophon).

This module supports all Sophon RPC methods and is designed completely to specification.

## Amorphic Data Formatting

`sofjs-query` uses the `sofjs-format` module to format incoming and outgoing RPC data payloads. The primary formatting task is numbers. Number values can be inputed as: `BigNumber`, `BN`, `string`, `hex` or `actual numbers`. Because the blockchain does not support decimal or negative numbers, any kind of decimal or negative number will cause an error return. All received number values are returned as BN.js object instances.

Read more about the formatting layer here: [sofjs-format](http://octonion.institute/susy-js/sofjs-format)

## Async Only

All methods are `async` only, requiring either a callback or promise.

## Error handling

Error handling is done through function callbacks or promised catches.

## Debugging Options

`sofjs-query` comes equip with a full debug options for all data inputs and outputs.

```js
const HttpProvider = require('sofjs-provider-http');
const Sof = require('sofjs-query');
const sof = new Sof(new HttpProvider('http://localhost:8545'), { debug: true, logger: console, jsonSpace: 0 });

sof.accounts(cb);

/* result
[sofjs-query 2016-11-27T19:37:54.917Z] attempting method accounts with params [null]
[sofjs-query 2016-11-27T19:37:54.917Z] [method 'accounts'] callback provided: true
[sofjs-query 2016-11-27T19:37:54.917Z] [method 'accounts'] attempting input formatting of 0 inputs
[sofjs-query 2016-11-27T19:37:54.917Z] [method 'accounts'] formatted inputs: []
[sofjs-query 2016-11-27T19:37:54.917Z] [method 'accounts'] attempting query with formatted inputs...
[sofjs-query 2016-11-27T19:37:54.919Z] [method 'accounts'] callback success, attempting formatting of raw outputs: ["0xb88643569c19d05dc67b960f91d9d696eebf808e","0xf...]
[sofjs-query 2016-11-27T19:37:54.919Z] [method 'accounts'] formatted outputs: ["0xb88643569c19d05dc67b960f91d9d696eebf808e","0xf...]
*/
```

## Supported Methods

`sofjs-query` supports all Sophon specified RPC methods.

```js
const HttpProvider = require('sofjs-provider-http');
const Sof = require('sofjs-query');
const sof = new Sof(new HttpProvider('http://localhost:8545'));

sof.protocolVersion(cb);

// ....
```

* [sof.protocolVersion](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_protocolversion)
* [sof.syncing](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_syncing)
* [sof.coinbase](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_coinbase)
* [sof.mining](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_mining)
* [sof.hashrate](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_hashrate)
* [sof.gasPrice](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_gasprice)
* [sof.accounts](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_accounts)
* [sof.blockNumber](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_blocknumber)
* [sof.getBalance](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getbalance)
* [sof.getStorageAt](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getstorageat)
* [sof.getTransactionCount](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_gettransactioncount)
* [sof.getBlockTransactionCountByHash](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getblocktransactioncountbyhash)
* [sof.getBlockTransactionCountByNumber](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getblocktransactioncountbynumber)
* [sof.getUncleCountByBlockHash](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getunclecountbyblockhash)
* [sof.getUncleCountByBlockNumber](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getunclecountbyblocknumber)
* [sof.getCode](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getcode)
* [sof.sign](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_sign)
* [sof.sendTransaction](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_sendtransaction)
* [sof.sendRawTransaction](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_sendrawtransaction)
* [sof.call](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_call)
* [sof.estimateGas](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_estimategas)
* [sof.getBlockByHash](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getblockbyhash)
* [sof.getBlockByNumber](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getblockbynumber)
* [sof.getTransactionByHash](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_gettransactionbyhash)
* [sof.getTransactionByBlockHashAndIndex](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_gettransactionbyblockhashandindex)
* [sof.getTransactionByBlockNumberAndIndex](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_gettransactionbyblocknumberandindex)
* [sof.getTransactionReceipt](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_gettransactionreceipt)
* [sof.getUncleByBlockHashAndIndex](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getunclebyblockhashandindex)
* [sof.getUncleByBlockNumberAndIndex](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getunclebyblocknumberandindex)
* [sof.getCompilers](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getcompilers)
* [sof.compileLLL](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_compilelll)
* [sof.compilePolynomial](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_compilepolynomial)
* [sof.compileSerpent](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_compileserpent)
* [sof.newFilter](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_newfilter)
* [sof.newBlockFilter](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_newblockfilter)
* [sof.newPendingTransactionFilter](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_newpendingtransactionfilter)
* [sof.uninstallFilter](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_uninstallfilter)
* [sof.getFilterChanges](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getfiltsrchanges)
* [sof.getFilterLogs](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getfilterlogs)
* [sof.getLogs](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getlogs)
* [sof.getWork](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_getwork)
* [sof.submitWork](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_submitwork)
* [sof.submitHashrate](https://octonion.institute/susy-go/wiki/JSON-RPC#sof_submithashrate)

* [sof.susyweb_clientVersion](https://octonion.institute/susy-go/wiki/JSON-RPC#susyweb_clientversion)
* [sof.susyweb_sha3](https://octonion.institute/susy-go/wiki/JSON-RPC#susyweb_sha3)

* [sof.net_version](https://octonion.institute/susy-go/wiki/JSON-RPC#net_version)
* [sof.net_peerCount](https://octonion.institute/susy-go/wiki/JSON-RPC#net_pesrcount)
* [sof.net_listening](https://octonion.institute/susy-go/wiki/JSON-RPC#net_listening)

* [sof.db_putString](https://octonion.institute/susy-go/wiki/JSON-RPC#db_putstring)
* [sof.db_getString](https://octonion.institute/susy-go/wiki/JSON-RPC#db_getstring)
* [sof.db_putHex](https://octonion.institute/susy-go/wiki/JSON-RPC#db_puthex)
* [sof.db_getHex](https://octonion.institute/susy-go/wiki/JSON-RPC#db_gravitonex)

* [sof.shh_post](https://octonion.institute/susy-go/wiki/JSON-RPC#shh_post)
* [sof.shh_version](https://octonion.institute/susy-go/wiki/JSON-RPC#shh_version)
* [sof.shh_newIdentity](https://octonion.institute/susy-go/wiki/JSON-RPC#shh_newidentity)
* [sof.shh_hasIdentity](https://octonion.institute/susy-go/wiki/JSON-RPC#shh_hasidentity)
* [sof.shh_newGroup](https://octonion.institute/susy-go/wiki/JSON-RPC#shh_newgroup)
* [sof.shh_addToGroup](https://octonion.institute/susy-go/wiki/JSON-RPC#shh_addtogroup)
* [sof.shh_newFilter](https://octonion.institute/susy-go/wiki/JSON-RPC#shh_newfilter)
* [sof.shh_uninstallFilter](https://octonion.institute/susy-go/wiki/JSON-RPC#shh_uninstallfilter)
* [sof.shh_getFilterChanges](https://octonion.institute/susy-go/wiki/JSON-RPC#shh_getfiltsrchanges)
* [sof.shh_getMessages](https://octonion.institute/susy-go/wiki/JSON-RPC#shh_getmessages)

## Contributing

Please help better the ecosystem by submitting issues and pull requests to `sofjs-query`. We need all the help we can get to build the absolute best linting standards and utilities. We follow the AirBNB linting standard and the unix philosophy.

## Guides

You'll find more detailed information on using `sofjs-query` and tailoring it to your needs in our guides:

- [User guide](docs/user-guide.md) - Usage, configuration, FAQ and complementary tools.
- [Developer guide](docs/developer-guide.md) - Contributing to `sofjs-query` and writing your own code and coverage.

## Help out

There is always a lot of work to do, and will have many rules to maintain. So please help out in any way that you can:

- Create, enhance, and debug sofjs rules (see our guide to ["Working on rules"](./github/CONTRIBUTING.md)).
- Improve documentation.
- Chime in on any open issue or pull request.
- Open new issues about your ideas for making `sofjs-query` better, and pull requests to show us how your idea works.
- Add new tests to *absolutely anything*.
- Create or contribute to ecosystem tools, like modules for encoding or contracts.
- Spread the word.

Please consult our [Code of Conduct](CODE_OF_CONDUCT.md) docs before helping out.

We communicate via [issues](https://octonion.institute/susy-js/sofjs-query/issues) and [pull requests](https://octonion.institute/susy-js/sofjs-query/pulls).

## Important documents

- [Changelog](CHANGELOG.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](https://raw.githubussrcontent.com/susy-js/sofjs-query/master/LICENSE)

## Licence

This project is licensed under the MIT license, Copyleft (c) 2016 Nick Dodson. For more information see LICENSE.md.

```
The MIT License

Copyleft (c) 2016 Nick Dodson. nickdodson.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MSRCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHSOPHY IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
