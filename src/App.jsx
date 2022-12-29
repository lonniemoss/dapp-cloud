import {useState, useEffect} from 'react';
import Web3 from 'web3';
import './App.css';
import DropFileInput from './components/drop-file-input/DropFileInput';

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

  const [files, setFiles] = useState([]);

  const onFileChange = (newFiles) => {
    setFiles(newFiles);
  }
  <DropFileInput onFileChange={(files) => onFileChange(files)} />
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
            <br></br>
            <br></br>
          </div>
          <div>  
          <div>
            <div className="box">
                <h2 className="header">
                    React drop files input
                </h2>
                <DropFileInput
                    onFileChange={(files) => onFileChange(files)}
                />
            </div>
            <br></br>
            <button className="" onSubmit={onFileChange}>Submit</button>
            <style>
                {`
                  button {
                    background-color: #4CAF50;
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
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