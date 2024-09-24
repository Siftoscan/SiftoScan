// ------------------------------------------------------------------------------------------------- //
// Etherscan
// ------------------------------------------------------------------------------------------------- //

// Configuration ----------------------------------------------------------------------------------- //
import Config from './config.json'

// Modules ----------------------------------------------------------------------------------------- //
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Row,Col,Button, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Link } from "react-router-dom"
// import axios from 'axios'

// Export ------------------------------------------------------------------------------------------ //
import './App.css';

import Navigation from './components/Navbar';
import HomeNavigation from './components/HomeNavbar';
import Footer from './components/Footer.js';
import HTTP404 from './components/404.js'
import { copyToClipboard, getAddress, linkAddress } from './class/Tools'
import { web3Handler, getProvider, isContract, loadContract2 } from './class/Evm'
import SearchBar from './components/SearchBar';

// Routes ------------------------------------------------------------------------------------------ //
import Home from './routes/Home.js'
import Accounts from './routes/Accounts.js'
import Address from './routes/Address.js'
import Block from './routes/Block.js'
import Blocks from './routes/Blocks.js'
import Charts from './routes/Charts.js'
import Contract from './routes/Contract.js'
import Logs from './routes/Logs.js'
import Token from './routes/Token.js'
import Tokens from './routes/Tokens.js'
import TokensTx from './routes/TokensTx.js'
import Tx from './routes/Tx.js'
import Txs from './routes/Txs.js'
import Topstats from './routes/Topstats.js'
import Profile from './routes/Profile.js'
import Applications from './routes/Apps.js'
import Interface from './routes/Interface.js'
import Interfaces from './routes/Interfaces.js'

// Functions --------------------------------------------------------------------------------------- //
function App() {
    const [loading, setLoading] = useState(false)
    const [account, setAccount] = useState(null)
    const [networkName, setNetworkName] = useState('Network')
    const [chainId, setChainId] = useState(null)
    const [stats, setStats] = useState({
        latest: 'latest',
        pending: 'pending',
        gasPrice: null,
        gasLimit: null,
        blockTime: null,
        blockReward: null,
        totalSupply: null
    })

  // MetaMask Login/Connect ------------------------------------------------------------------------ //
  // const web3Handler = async () => {
  //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //   setAccount(accounts[0])

  //   // Get provider from Metamask
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)

  //   // Set signer
  //   const signer = provider.getSigner()

  //   window.ethereum.on('chainChanged', (chainId) => {
  //     window.location.reload();
  //   })

  //   window.ethereum.on('accountsChanged', async function (accounts) {
  //     setAccount(accounts[0])
  //     await web3Handler()
  //   })

  // }

  const web3Handler = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("accounts[0]",accounts[0]);
        setAccount(accounts[0]);
    } catch (error) {
        console.error('Error connecting to Metamask:', error);
    }
};



  const setNetwork = async () => {
    try {
        // Attempt to switch to the desired Ethereum chain
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1FA' }], // Use the correct chain ID here from your Genesis JSON file
        });
    } catch (switchError) {
        // If the chain switch fails, try adding the custom Ethereum chain to MetaMask
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x1FA', // Use the correct chain ID here from your Genesis JSON file
                            chainName: 'Sifto Mainnet', // Update chain name to match Genesis JSON
                            rpcUrls: ['https://rpc.siftoscan.com'], // Use the correct RPC URL from Genesis JSON
                            nativeCurrency: {
                                name: 'Sifto Mainnet', // Update currency name to match Genesis JSON
                                symbol: 'SIFTO',
                                decimals: 18,
                            },
                            iconUrls: [
                                'https://ethereum.org/favicon-32x32.png',
                                'https://ethereum.org/favicon-192x192.png',
                            ],
                            blockExplorerUrls: ['https://siftoscan.com'],
                        },
                    ],
                });

                // Once the chain is added, try switching to it again
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x1F9' }], // Try switching to Siftochain again
                });
            } catch (addError) {
                console.error('Error adding chain:', addError);
            }
        } else {
            console.error('Switch error:', switchError);
        }
    }
};





//   const loadNetwork = async () => {
//     try {
//         const _chainId = await window.ethereum.request({ method: 'eth_chainId' });
//         const chainIdInt = parseInt(_chainId, 16);
//         setChainId(chainIdInt);
//         setNetworkName('Siftochain');
//     } catch (error) {
//         console.error('Error loading network:', error);
//     }
// };



const loadNetwork = async () => {
  try {
      const _chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const chainIdInt = parseInt(_chainId, 16);
      if (chainIdInt !== 0x1F9) { // Check if not connected to custom network
          // If not connected to custom network, set the custom network
          await setNetwork();
      }
      // Update UI or perform any other actions based on the current network
      setChainId(chainIdInt);
      setNetworkName('Siftochain');
  } catch (error) {
      console.error('Error loading network:', error);
  }
};



  

  const loadLastBlock = async () => {

    let provider = new ethers.providers.JsonRpcProvider(Config.node);

    //verify if metamask is connected
    if (window.ethereum) {
        provider = new ethers.providers.JsonRpcProvider(Config.node);
    }

    const pblock = await provider.getBlock('pending') || 0
    const lblock = await provider.getBlock('latest')
    setStats({
      pending: pblock.number.toString(),
      latest: lblock.number.toString()
    })

  }

  useEffect(() => {

    console.log("networkName",networkName);

      //verify metamask is installed
      if (window.ethereum) {
        //on network change, loadNetwork
        window.ethereum.on('chainChanged', async (chainId) => {
          window.location.reload()
          await loadNetwork()
        })

        
      } else {
        console.log('No Metamask detected');
        setNetworkName('Siftochain')
        setChainId(chainId)
      }
    //}
    let timer = setTimeout(() => {
      loadNetwork()
      //loadLastBlock()
    }, 7000);

    //console.log('Network: '+networkName)
    return () => clearTimeout(timer)
})

  // Render ---------------------------------------------------------------------------------------- //
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          {window.location.pathname === '/'
          ? <Navigation web3Handler={web3Handler} setNetwork={setNetwork} account={account} networkName={networkName} stats={stats} />
          : <Navigation web3Handler={web3Handler} setNetwork={setNetwork} account={account} networkName={networkName} stats={stats} />
      }
        </div>
        <div className="container extra-container">
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
          <Routes>
            <Route exact path="/" element={
              <Home networkName={networkName} account={account}/>
            } />
            <Route path="/accounts" element={
              <Accounts networkName={networkName} account={account}/>
            } />

            <Route path="/address/:walletAddress" element={
              <Address networkName={networkName} account={account}/>
            } />

            <Route path="/contract/:contractAddress" element={
              <Contract networkName={networkName} account={account}/>
            } />

            <Route path="/block/:blockNumber" element={
              <Block networkName={networkName} account={account}/>
            } />
            <Route path="/blocks" element={
              <Blocks networkName={networkName} account={account}/>
            } />

            <Route path="/tx/:transactionHash" element={
              <Tx networkName={networkName} account={account}/>
            } />
            <Route path="/txs" element={
              <Txs networkName={networkName} account={account} chainId={chainId}/>
            } />
            <Route path="/txsPending" element={
              <Txs networkName={networkName} account={account} chainId={chainId}/>
            } />
            <Route path="/txsInternal" element={
              <Txs networkName={networkName} account={account} chainId={chainId}/>
            } />
            <Route path="/txs/:blockNumber" element={
              <Txs networkName={networkName} account={account}/>
            } />

            <Route path="/token/:tokenAddress" element={
              <Token networkName={networkName} account={account}/>
            } />
            <Route path="/tokens" element={
              <Tokens networkName={networkName} account={account}/>
            } />
            <Route path="/tokentxns/" element={
              <TokensTx networkName={networkName} account={account}/>
            } />
            <Route path="/contractsim/:contract" element={
              <Interface networkName={networkName} account={account}/>
            } />
            <Route path="/interface/:contract" element={
              <Interface networkName={networkName} account={account} web3Handler={web3Handler}/>
            } />
            <Route path="/interfaces" element={
              <Interfaces networkName={networkName} account={account} web3Handler={web3Handler}/>
            } />

            <Route path="/profile" element={
              <Profile networkName={networkName} account={account}/>
            } />
            <Route path="/apps" element={
              <Applications networkName={networkName} account={account} />
            } />
            <Route path="/charts" element={
              <Charts networkName={networkName} account={account} />
            } />
            <Route path="/topstats" element={
              <Topstats networkName={networkName} account={account} />
            } />
            <Route path="/logs/:contract/:topic" element={
              <Logs networkName={networkName} account={account}/>
            } />
            <Route path="/logs/:contract" element={
              <Logs networkName={networkName} account={account}/>
            } />
            <Route path="*" element={
              <HTTP404/>
            } />
          </Routes>)}
        </div>
        <div className="footer align-self-end" >
          <div className="container">
            <Row>
              <div className="col-md-3">
                <h3 className="text-start mb-2">Powered by Siftoscan</h3>
                <p className="text-start mb-2 fs-7">
                SIFTO Explorer is a tool for navigating and analyzing private EVM based blockchains.
                </p>
              </div>
              <div className="col-md-3">
                <h3 className="text-start mb-2">Company</h3>
                <p className="text-start mb-2 fs-7">About Us</p>
                <p className="text-start mb-2 fs-7">Contact Us</p>
              </div>
              <div className="col-md-3">
                <h3 className="text-start mb-2">Blockchain</h3>
                <Link to="/txs"><p className="text-start text-white  mb-2 fs-7">View Txns</p></Link>
                <Link to="/txs"><p className="text-start text-white  mb-2 fs-7">View Pending Txns</p></Link>
                
                {/* <p className="text-start mb-2 fs-7">View Contract Internal Txns</p> */}
                </div>
              <div className="col-md-3">
                <p className="text-right">
                  

            
        <Button variant="secondary" size="sm" onClick={setNetwork}>
            Add SIFTO Network to Metamask!&nbsp;<img src="https://raw.githubusercontent.com/MetaMask/metamask-extension/develop/app/images/icon-16.png" alt="Metamask icon" />
        </Button>
                </p>
              </div>
            </Row>
            <Row>
              <Col md={12}>
                <p className="text-start mb-4 fs-7">
                  Copyright <a href="#" target="_blank" rel="noopener noreferrer"></a> 2024. All rights reserved.
                </p>
                </Col>
            </Row>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;