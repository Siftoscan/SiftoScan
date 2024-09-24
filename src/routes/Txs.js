import Config from '../config.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios';
//import { Link } from "react-router-dom";

import TransactionList from '../components/TransactionList'

//const axios = require('axios').default;

const Txs = ({ networkName }) => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [blockContent, setTxsContent] = useState([])
    const [blockNumber, setBlockNumber] = useState(parseInt(params.blockNumber))

    // ---------------------------------------------------------------------------------------------------------- //
    

    const eth_getTransactions = async () => {
        try {
            const response = await axios.get(Config.restAPI + 'all_transection_list');
            //console.log("Response:", response.data.data);
            setTxsContent(response.data.data);
            // Handle response data
        } catch (error) {
            console.error("Error fetching latest transactions:", error);
            // Handle error
        }
    };
    
    
    
    
    
    

    

    // ---------------------------------------------------------------------------------------------------------- //
    useEffect(() => {
       // let timer = setTimeout(() => {
            if (blockContent.length === 0) {
                setBlockNumber(parseInt(params.blockNumber))
                //eth_getTransactionByBlockNumber()
               // const contractAddress = '0x60A58a473Cc18F0177a8A839F2E8551502A3eCd9';
             eth_getTransactions();
                setLoading(false)
            }

       // }, 1000);
       // return () => clearTimeout(timer)
    })
      if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
          <h4 className='Title'>Transactions</h4>
          Loading transaction for block #{params.blockNumber}
          <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
      )

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className='Title'>Transactions</h4>
            For block #{params.blockNumber}
            <TransactionList txs={blockContent} />
            A total of {blockContent.length} transaction(s) found.
        </main>
    );
}
export default Txs