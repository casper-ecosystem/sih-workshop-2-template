const client = new CasperClient("http://136.243.187.84:7777/rpc")
const contract = new Contracts.Contract(client)
contract.setContractHash("")

function windowLoaded() {
  checkAndSetSignerStatus();
  setActivePublicKey();
}

async function checkAndSetSignerStatus() {
  const isSignerConnectedLabel = document.getElementById("isSignerConnected");
  try {
    const isConnected = await Signer.isConnected();
    if (isConnected) {
      isSignerConnectedLabel.innerHTML = "Signer Connected?: Yes";
    } else {
      isSignerConnectedLabel.innerHTML = "Signer Connected?: No";
    }
  } catch(error) {
    isSignerConnectedLabel.innerHTML = "Signer Connected?: Error";
  }
}

async function setActivePublicKey() {
  const connectedAccountLabel = document.getElementById("connectedAccount");
  try {
    connectedAccountLabel.innerHTML = "Connected Account: " + (await Signer.getActivePublicKey());
  } catch(error) {
    connectedAccountLabel.innerHTML = "Connected Account: No active public Key"
  }
}

function connectToSigner() {
  Signer.sendConnectionRequest();
}

//Start here

window.onload = () => { windowLoaded() }

window.addEventListener("signer:activeKeyChanged", (msg) => {
  if (msg.detail.isConnected) {
    setActivePublicKey()
  }
});

window.addEventListener("signer:connected", (msg) => {
  checkAndSetSignerStatus()
  setActivePublicKey()
});

window.addEventListener("signer:disconnected", (msg) => {
  checkAndSetSignerStatus()
  setActivePublicKey()
});
