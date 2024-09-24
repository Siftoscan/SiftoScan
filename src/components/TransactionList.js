import React from "react";
import { Card, Button, Table } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { getAddress, linkCopyAddress } from '../class/Tools'
import { getProvider, isContract } from '../class/Evm'

const TransactionList = ({txs}) => {

    return (
        <Card >
            <Card.Header>
                <Card.Title className="std-card-title">Transaction List</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover responsive size="sm" >
                    <thead>
                        <tr>
                            <th>Txn Hash</th>
                            <th>Method</th>
                            <th>Block</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Value</th>
                            <th>Txn Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                    {txs ? txs.map((item, idx) => {

                        console.log("item",item);
                    // Set method based on to_address
                    // if (item.from_address === '0xeAEC5fb1Fd7bfBaE20971c626098342F9aD4F6bd') {
                    //     item.method = 'Miner';
                    // } else if(item.to_address=='null'){
                    //     item.method = 'Contract Creation';
                    // }else {
                    //     item.method = 'Transfer';
                    // }

                    return (
                        <tr key={idx}>
                            <td><Link to={`/tx/${item.hash}`}>{item.hash ? item.hash.slice(0, 7) + '...' : null}</Link></td>
                            <td><Button variant="secondary btn-list" size="sm" className="ml-2">{item.method}</Button></td>
                            <td><Link to={`/block/${item.blocknumber}`}>{item.blocknumber}</Link></td>
                            <td><Link to={`/address/${item.from_address}`}>{item.from_address ? linkCopyAddress(item.from_address) : null}</Link></td>
                            {/* <td>{item.to_address ? <Link to={`/address/${item.to_address}`}>{linkCopyAddress(item.to_address)}</Link> : null}</td> */}
                        <td>{item.to_address !== 'null' ? (<Link to={`/address/${item.to_address}`}>{linkCopyAddress(item.to_address)}</Link>) : ('--')}</td>
                            {/* <td>{item.value.toString() / 10 ** 18} SIFTO</td> */}
                            <td>{item.value} SIFTO</td>
                            <td>{item.gas / 10 ** 9} gwei</td>
                        </tr>
                    );
                }) : null}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};
export default TransactionList;