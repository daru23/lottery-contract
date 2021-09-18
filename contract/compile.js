const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Getting arguments
let contractName = 'Inbox.sol'
if (process.argv[2]) {
    contractName = process.argv[2];
}

// Compile contract
const contractPath = path.resolve(__dirname, '.', 'Lottery.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};
let contractFile;

try {
    const tempFile = JSON.parse(solc.compile(JSON.stringify(input)), 1);
    contractFile = tempFile.contracts['Lottery.sol']['Lottery'];
} catch (e) {
    console.log(e)
    contractFile = {};
}

module.exports = contractFile;
