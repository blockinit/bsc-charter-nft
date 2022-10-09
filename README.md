# Charter NFT
## BIM Coordinators Summit

This repository holds the code and deployment for the `Charter NFT` of the
[BIM DAO](https://www.bimhero.io/).

### Installation
 ```
 yarn install
 ```

 Copy `./config/default.js` to `./config.local.js` and enter in your `mneumonic`
 or `privateKey`.

### Deploy
First setup the network in `hardhat.config.js`

Then run:
```
npx hardhat run --network localhost ./scripts/deploy.js
```

### Test

```
yarn test
```
