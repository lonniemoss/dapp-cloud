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
          <div class="page-header d-flex">
            <h1>How much <span>space</span> you need?</h1>
            <form class="navbar-form" role="search"><label class="form-control" placeholder="Search your next Blockchain based space storage"></label></form>
            <div class="select" tabindex="1">
              <input class="selectopt" name="test" type="radio" id="opt2"></input>
              <label for="opt2" class="option">250GB</label>
              <input class="selectopt" name="test" type="radio" id="opt3"></input>
              <label for="opt3" class="option">500GB</label>
              <input class="selectopt" name="test" type="radio" id="opt4"></input>
              <label for="opt4" class="option">1T</label>
              <input class="selectopt" name="test" type="radio" id="opt5"></input>
              <label for="opt5" class="option">2T</label>
            </div> 
            <div class="form-group"></div>
          </div>
          <style>
            {`.header {
              height: 700px;
              justify-content: center;
              background-image: url("https://i.ibb.co/cXX8yH1/api-mapbox-com-styles-v1-mapbox-light-v10-html-title-true-access-token-pk-ey-J1-Ijoib-WFw-Ym94-Iiwi.png");
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
            }
            .page-header span {
              color: red;
            } 
            button {
              background-color: blue;
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
            .form-control {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 500%;
            }
            .select {
              display:flex;
              flex-direction: column;
              position:relative;
              width:250px;
              height:40px;
              border:#222 solid 1px;
              border-radius:50px;
            }
            
            .option {
              padding:0 30px 0 10px;
              min-height:40px;
              display:flex;
              align-items:center;
              justify-content:center;
              flex-direction: center;
              background: white;
              border-top:#222 solid 1px;
              position:absolute;
              top:0;
              width: 100%;
              pointer-events:none;
              order:2;
              z-index:1;
              transition:background .4s ease-in-out;
              box-sizing:border-box;
              overflow:hidden;
              white-space:nowrap;
              border-radius:50px;
            }
            
            .option:hover {
              background:#666;
            }
            
            .select:focus .option {
              position:relative;
              pointer-events:all;
            }
            
            input {
              opacity:10%;
              position:absolute;
              left:-99999px;
            }
            
            input:checked + label {
              order: 1;
              z-index:2;
              border-top:none;
              position:relative;
            }
            
            input:checked + label:after {
              content:'';
              width: 0; 
              height: 0; 
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 5px solid white;
              position:absolute;
              right:10px;
              top:calc(50% - 2.5px);
              pointer-events:none;
              z-index:3;
            }
            
            input:checked + label:before {
              position:absolute;
              right:0;
              height: 40px;
              width: 40px;
              content: '';
              background: white;
            }
            `}
          </style>
          
        </div>
      )}
    </div>
  );
}

export default App;