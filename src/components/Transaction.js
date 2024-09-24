import { Card, Button, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom";

const Transaction = ({ transaction }) => {

    const receipt = {}
    for (let key in transaction.receipt) {
        receipt[key] = transaction.receipt[key]
    }
    const txStatusText = receipt.status ? 'success' : 'danger'
    const txStatusName = receipt.status ? 'Success' : 'Failed'

    let copyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>

    function copyToClipboard(text) {

        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    }

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
    <Card classMap="shadowCard">
        <Card.Header>
            <Card.Title className="std-card-title">Overview</Card.Title>
        </Card.Header>
        <Card.Body className="std-card-info">
            <ListGroup variant="flush">
                    <div className="row">
                        <div className="col-md-3">
                            <p>Transaction Hash:</p>
                        </div>
                        <div className="col-md-9">
                            <p> {transaction.hash}</p>
                        </div>
                        <hr class="hr-space"></hr>
                        <div className="col-md-3">
                            <p>Status:</p>
                        </div>
                        <div className="col-md-3">
                            <p> <Button variant={`${txStatusText}`} size="sm" className="ml-2">{`${txStatusName}`}</Button></p>
                        </div>
                        <div className="col-md-3">
                            <p>Block Number:</p>
                        </div>
                        <div className="col-md-3">
                            <p> <Link to={`/block/${transaction.blockNumber}`}>{transaction.blockNumber}</Link> <Button variant="secondary" size="sm" className="ml-2">{transaction.confirmations} Block confirmations</Button></p>
                        </div>
                        <hr class="hr-space"></hr>
                        <div className="col-md-3">
                            <p>From:</p>
                        </div>
                        <div className="col-md-9">
                            <p><Link to={`/address/${transaction.from}`}>{transaction.from ? transaction.from : null}</Link> <span onClick={() => copyToClipboard(transaction.from)}>{copyIcon}</span></p>
                        </div>
                        <div className="col-md-3">
                            <p>To:</p>
                        </div>
                        <div className="col-md-9">
                            <p> <Link to={`/address/${transaction.to}`}>{transaction.to ? transaction.to : null}</Link> <span onClick={() => copyToClipboard(transaction.to)}>{copyIcon}</span></p>
                        </div>
                        <div className="col-md-3">
                            <p>Method:</p>
                        </div>
                        <div className="col-md-9">
                            {/* Conditional logic to determine item.method */}
                            {transaction.receipt.logs && transaction.receipt.logs.length > 0 ? (
                                <Button variant="secondary btn-list" size="sm" className="ml-2">stake</Button>
                            ) : transaction.from === '0xeAEC5fb1Fd7bfBaE20971c626098342F9aD4F6bd' ? (
                                <Button variant="secondary btn-list" size="sm" className="ml-2">Miner</Button>
                            ) : transaction.to === '0x10245f281C35ecd3aA5F8BF9e87e62490C5bb2D8' && transaction.value.toString() / 10 ** 18 =='0.00072' ? (
                                <Button variant="secondary btn-list" size="sm" className="ml-2">Contract Creation</Button>
                            ) : (
                                <Button variant="secondary btn-list" size="sm" className="ml-2">Transfer</Button>
                            )}
                            </div>
                        <hr class="hr-space"></hr>
                         <div className="col-md-3">
                            <p>Timestamp:</p>
                        </div>
                        <div className="col-md-9">
                            <p> {transaction.block.timediff} sec(s) ago {transaction.block.humandate}</p>
                        </div>
                        <hr class="hr-space"></hr>
                         <div className="col-md-3">
                            <p>Value:</p>
                        </div>
                        <div className="col-md-3">
                            <p>{transaction.value.toString() / 10 ** 18} SIFTO</p>
                        </div>
                        <div className="col-md-3">
                            <p>Gas Price:</p>
                        </div>
                        <div className="col-md-3">
                            <p>{transaction.gasPrice / 10 ** 9} gwei</p>
                        </div>
                        <hr class="hr-space"></hr>
                         <div className="col-md-3">
                            <p>Gas Used:</p>
                        </div>
                        <div className="col-md-3">
                            <p> {receipt.gasUsed / 10 ** 0} gwei</p>
                        </div>
                        <div className="col-md-3">
                            <p>Gas Limit:</p>
                        </div>
                        <div className="col-md-3">
                            <p>{transaction.gas / 10 ** 0} gwei</p>
                        </div>
                         <hr class="hr-space"></hr>
                         <div className="col-md-3">
                            <p>Nonce:</p>
                        </div>
                        <div className="col-md-3">
                            <p> {transaction.nonce}</p>
                        </div>
                        <div className="col-md-3">
                            <p>Transaction Index:</p>
                        </div>
                        <div className="col-md-3">
                            <p> {transaction.transactionIndex}</p>
                        </div>
                        <hr class="hr-space"></hr>
                         {/* <div className="col-md-3">
                            <p>Transaction Type:</p>
                        </div>
                        <div className="col-md-3">
                            {transaction.to === '0x10245f281C35ecd3aA5F8BF9e87e62490C5bb2D8' ?
                                <p>Stacked</p> :
                                <p>{receipt.type}</p>
                            }
                        </div> */}
                        <div className="col-md-3">
                            <p>V:</p>
                        </div>
                        <div className="col-md-3">
                            <p> {transaction.v}</p>
                        </div>
                        <hr class="hr-space"></hr>
                         <div className="col-md-3">
                            <p>R:</p>
                        </div>
                        <div className="col-md-3">
                            <p> {transaction.r}</p>
                        </div>
                        <div className="col-md-3">
                            <p>S:</p>
                        </div>
                        <div className="col-md-3">
                            <p> {transaction.s}</p>
                        </div>
                        <hr class="hr-space"></hr>
                         <div className="col-md-3">
                            <p>Input:</p>
                        </div>
                        <div className="col-md-9">
                            <p> {transaction.input}</p>
                        </div>
                        <hr class="hr-space"></hr>
                         <div className="col-md-3">
                            <p>logs Bloom:</p>
                        </div>
                        <div className="col-md-9">
                            <p> {receipt.logsBloom}</p>
                        </div>
                    </div>

            
            </ListGroup>
        </Card.Body>
    </Card>
    );
}
export default Transaction