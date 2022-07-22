import express from 'express'
import cors from 'cors'
import { CEP78 } from './cep78.js'
import casper_js_sdk_pkg from 'casper-js-sdk';
const { DeployUtil } = casper_js_sdk_pkg

const app = express();
const port = 3000;

app.use(express.static('./public'));

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: './' });
});

const cep78 = new CEP78()
cep78.setContractHash("")
