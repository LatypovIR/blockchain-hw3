Реализован монитор последних блоков (```last-blocks```)
А также подписка на любые изменения курсов (```price-change:*/*```)

Для запуска используйте команду ```node scripts/monitor.js [last-blocks] [price-change:*]*```
Пример, ```root@latypovir ~> node scripts/monitor.js last-blocks price-change:ETH/USD price-change:LINK/ETH price-change:USDT/ETH```

Пример вывода логов
```
ℹ  12/14/2022, 12:38:24 AM : Try to subscribe to monitor price change on: ETH/USD
ℹ  12/14/2022, 12:38:24 AM : Try to subscribe to monitor price change on: LINK/ETH
ℹ  12/14/2022, 12:38:24 AM : Try to subscribe to monitor price change on: USDT/ETH
🛈  12/14/2022, 12:38:25 AM : USDT/ETH monitor connected: 0x43cdd0d8923562b50404d7c546c60e79 
🛈  12/14/2022, 12:38:25 AM : ETH/USD monitor connected: 0x04e70bd4821a1b9be3b1a0f3715b6004 
🛈  12/14/2022, 12:38:26 AM : LINK/ETH monitor connected: 0xa0eef0ae1d289ff1b0ea8424ac457323 
ℹ  12/14/2022, 12:55:53 AM : ETH/USD -- Received data: {
 {
   "address": "0x37bC7498f4FF12C19678ee8fE19d713b87F6a9e6",
   "blockNumber": 16178595,
   "transactionHash": "0x3d9b20f0dd0fef43cb80438089592452c922ee4cffb6ac6c159b85b92fad9d3e",
   "transactionIndex": 13,
   "blockHash": "0x5d9577c6d3e8ac635865171ff7b43804cf2845312f9b81904df337d5b3b60f57",
   "logIndex": 30,
   "removed": false,
   "id": "log_ce56d7c7",
   "returnValues": {
      "0": "131990865773",
      "1": "38832",
      "2": "1670968547",
      "current": "131990865773",
      "roundId": "38832",
      "updatedAt": "1670968547"
   },
   "event": "AnswerUpdated",
   "signature": "0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f",
   "raw": {
      "data": "0x000000000000000000000000000000000000000000000000000000006398f4e3",
      "topics": [
         "0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f",
         "0x0000000000000000000000000000000000000000000000000000001ebb44c76d",
         "0x00000000000000000000000000000000000000000000000000000000000097b0"
      ]
   }
} 
}
🛈  12/14/2022, 12:55:53 AM : ETH/USD -- Updated price:  $ 1319.90865773
🛈  12/14/2022, 8:40:51 PM : The latest block number is 16184489 (ETH/Mainnet) 
🛈  12/14/2022, 8:41:02 PM : The latest block number is 16184490 (ETH/Mainnet) 
🛈  12/14/2022, 8:41:15 PM : The latest block number is 16184491 (ETH/Mainnet)
```