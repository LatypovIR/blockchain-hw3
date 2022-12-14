'use strict';

const {Network, Alchemy} = require('alchemy-sdk')
const Web3 = require('web3')
const logger = require('./logger')
const fs = require('fs')


const AlchemySettings = {
    apiKey: "1pY6SgHEIf_6Wy52HqFNz9de6qt2xuPQ",
    network: Network.ETH_MAINNET,
};

const ETH_USD_Settings = {
    "scale": 1e-8,
    "currency": "$",
    "address": "0x37bC7498f4FF12C19678ee8fE19d713b87F6a9e6",
    "contractABI": "./aggregator-abi/eth-usd.json"
}

const LINK_ETH_Settings = {
    "scale": 1e-18,
    "currency": "Ξ",
    "address": "0xbba12740DE905707251525477bAD74985DeC46D2",
    "contractABI": "./aggregator-abi/link-eth.json"
}

const USDT_ETH_Settings = {
    "scale": 1e-18,
    "currency": "Ξ",
    "address": "0x7De0d6fce0C128395C488cb4Df667cdbfb35d7DE",
    "contractABI": "./aggregator-abi/usdt-eth.json"
}


async function monitorLastBlock() {
    const alchemy = new Alchemy(AlchemySettings);
        alchemy.ws.on('block', async (blockNumber) => {
            logger.info('The latest block number is', blockNumber, '(ETH/Mainnet)');
        });
}


async function monitorPriceChange(aggregator) {
    let settings = {};
    if (aggregator == "ETH/USD") {
        settings = ETH_USD_Settings;
    } else if (aggregator == "LINK/ETH") {
        settings = LINK_ETH_Settings;
    } else if (aggregator == "USDT/ETH") {
        settings = USDT_ETH_Settings;
    } else {
        logger.error('Invalid price aggregator:', aggregator);
        return;
    }
    const web3 = new Web3('wss://eth-mainnet.ws.alchemyapi.io/ws/' + AlchemySettings.apiKey);
    const contractABI = JSON.parse(fs.readFileSync(settings.contractABI));
    let contract = new web3.eth.Contract(contractABI, settings.address);
    contract.events.AnswerUpdated()
            .on('connected', address => {
                logger.info(aggregator, 'monitor connected:', address);
            })
            .on('data', event => {
                logger.debug(aggregator, '-- Received data: {\n', event, '\n}');
                const newPrice = event.returnValues.current * settings.scale;
                logger.info(aggregator, '-- Updated price: ', settings.currency, newPrice);
            })
            .on('error', errorMessage => {
                logger.error(aggregator, '-- Received error: {\n', errorMessage, '\n');
            });
}


const argv = process.argv.slice(2)
if (argv.length == 0) {
    logger.error(
        `Usage: node monitor.js monitor+
Where: monitor is 'last-blocks' or 'price-change:<aggregator-name>'`)
}
const priceChangeRegex = new RegExp('price:*')

for (let monitor of argv) {
    if (monitor == "last-blocks") {
        logger.debug('Try to subscribe to monitor last block');
        monitorLastBlock();
    } else if (priceChangeRegex.test(monitor)) {
        let aggregator = monitor.substring(13);
        logger.debug('Try to subscribe to monitor price change on:', aggregator);
        monitorPriceChange(aggregator);
    } else {
        logger.error("Invalid monitor:", monitor)
    }
}
