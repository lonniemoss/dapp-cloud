import {useState, useEffect} from 'react';
import Web3 from 'web3';


function App() {
  
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
      alert("Non-ethereum browser detected. You should install Metamask as an extension: https://metamask.io/download.html");
    }
    return provider;
  };
  
  const onConnect = async() => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider) {
        await currentProvider.request({method: 'eth_requestAccounts'});
        const web3 = new Web3(currentProvider);
        const userAccount  =await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        setIsConnected(true);
      }
    } catch(err) {
      console.log(err);
    }
  }
  
  const onDisconnect = () => {
    setIsConnected(false);
  }
    const [selectedStorage, setSelectedStorage] = useState('');
  
    const handleChange = (event) => {
      setSelectedStorage(event.target.value);
    }
  
  
  return (
    <div className="app">
      <div className="app-header">
        <h1>Welcome to ReamSpace.</h1>
      </div>
      <div className="app-wrapper">
        {!isConnected && (
          <div>
            <button className="app-button__login" onClick={onConnect}>
            Login With Metamask
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="app-wrapper">
          <div className="app-details">
            <h2> You are connected to metamask.</h2>
            <div className="app-balance">
              <span>Balance: </span>
              {ethBalance}
            </div>
          </div>
          <div>
            <button className="app-buttons__logout" onClick={onDisconnect}>
            Disconnect
            </button>
          </div>
          <div>  
          <div>
          <label htmlFor="storage-dropdown">Select storage:</label>
            <select id="storage-dropdown" value={selectedStorage} onChange={handleChange}>
              <option value="250gb">250 GB</option>
              <option value="500gb">500 GB</option>
              <option value="1t">1 TB</option>
              <option value="2t">2 TB</option>
            </select>
            {selectedStorage && (
              <div>
                You selected {selectedStorage}.
                <button>Select</button>
              </div>
            )}            
              <style>
                {`
                  #storage-dropdown {
                    font-size: 18px;
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                  }
                  
                  button {
                    font-size: 18px;
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background-color: lightgreen;
                    color: white;
                    cursor: pointer;
                  }
                  
                  button:hover {
                    background-color: green;
                  }
                `}
              </style>
            </div>
          </div> 
        </div>
      )}
    </div>
  );
}

export default App;