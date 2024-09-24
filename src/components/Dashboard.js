import React from "react";
import { ListGroup, Table, Image, Row, Col, Card } from 'react-bootstrap'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts'

//const Dashboard = ({stats,data}) => {
const Dashboard = ({stats,data}) => {
    const { lastBlock, current_supply } = stats;
    //console.log("lastBlock",stats);
    return (
        <Col xs={12} md={12} lg={12}>
            <Card className="std-card-info">
                <Card.Body className="card-body">
                    <Table striped bordered hover>
                        <Row>
                            <Col xs={12} md={12} lg={12}>
                                <Row>
                                <Col xs={12} md={6} lg={4}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="p-3">
                                                {/* <span className="text-truncate"><b>Avg Daily Blocktime</b>: </span> */}


                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src="/siftocoin.png" alt="My Image" style={{ marginRight: '10px',width: '25px' }} />
                                                <div>
                                                    <span className="cs">SIFTO PRICE</span><br />
                                                    <span className="text-truncate">$62 @1 SIFTO</span>
                                                </div>
                                                </div>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="p-3">
                                                {/* <span className="text-truncate"><b>Daily Transactions Fee</b>: {Math.round((stats.dailytxnfee) * 1000000) / 1000000} xEth</span> */}
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src="/initial.png" alt="My Image" style={{ marginRight: '10px',width:'33px' }} />
                                                <div>
                                                    <span className="cs" >INITIAL SUPPLY</span><br />
                                                    <span className="text-truncate">100000 SIFTO</span>
                                                </div>
                                                </div>
                                            </ListGroup.Item>
                                            {/* <ListGroup.Item>
                                                <span className="text-truncate"><b>Transactions</b>: </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Net Utilization</b>: {Math.round((stats.dailynetutilization*100) * 1000) / 1000}% </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Daily New Adresses</b>: {stats.dailynewaddress} </span>
                                            </ListGroup.Item> */}
                                        </ListGroup>
                                    </Col>
                                   <Col xs={12} md={6} lg={4}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="p-3">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src="/mining.png" alt="My Image" style={{ marginRight: '10px', width:'40px' }} />
                                                <div>
                                                    <span className="cs">CURRENT BLOCK</span><br />
                                                    <span className="text-truncate">{(lastBlock)}</span>
                                                </div>
                                                </div>

                                            </ListGroup.Item>
                                            <ListGroup.Item className="p-3">

                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src="/supplychain.png" alt="My Image" style={{ marginRight: '10px',  width:'40px' }} />
                                                <div>
                                                    <span className="cs">MAXIMUM SUPPLY</span><br />
                                                    <span className="text-truncate">100000000 SIFTO</span>
                                                </div>
                                                </div>
                                            </ListGroup.Item>
                                            {/* <ListGroup.Item>
                                                <span className="text-truncate"><b>Avg Daily GasPrice</b>: {stats.dailyavggasprice/1000000000} gwei </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Daily Gas Used</b>: {stats.dailygasused} gwei </span>
                                            </ListGroup.Item> */}
                                        </ListGroup>
                                    </Col>

                                    <Col xs={12} md={6} lg={4}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="p-3">

                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src="/gas.png" alt="My Image" style={{ marginRight: '10px',width:'35px' }} />
                                                <div>
                                                    <span className="cs">MED GAS PRICE</span><br />
                                                    <span className="text-truncate">1 GWEI ($0.0000000431)</span>
                                                </div>
                                                </div>

                                            </ListGroup.Item>
                                            <ListGroup.Item className="p-3">

                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src="/current.png" alt="My Image" style={{ marginRight: '10px',width:'33px' }} />
                                                <div>
                                                    <span className="cs">CURRENT SUPPLY</span><br />
                                                    <span className="text-truncate">{(current_supply)} SIFTO</span>
                                                </div>
                                                </div>

                                            </ListGroup.Item>
                                            {/* <ListGroup.Item>
                                                <span className="text-truncate"><b>Avg Daily GasPrice</b>: {stats.dailyavggasprice/1000000000} gwei </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <span className="text-truncate"><b>Daily Gas Used</b>: {stats.dailygasused} gwei </span>
                                            </ListGroup.Item> */}
                                        </ListGroup>
                                    </Col>


                                </Row>
                            </Col>
                            {/* <Col xs={12} md={6} lg={6} xl={6}>
                                <LineChart width={300} height={200} data={data}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Line type="monotone" dataKey="d1" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="d2" stroke="#82ca9d" />
                                    <Tooltip/>
                                    <Legend />
                                </LineChart>
                            </Col> */}
                        </Row>
                    </Table>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Dashboard;