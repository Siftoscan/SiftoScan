import { Card,ListGroup } from 'react-bootstrap'
//import { Link } from "react-router-dom";

const AddressOverview = ({ address }) => {

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Card className="infobox box">
            <Card.Header>
                <Card.Title><b>Overview</b></Card.Title>
            </Card.Header>
            <Card.Body>
                    <ListGroup variant="flush">

                    {(address.address === '0x10245f281C35ecd3aA5F8BF9e87e62490C5bb2D8' || address.address === '0xeAEC5fb1Fd7bfBaE20971c626098342F9aD4F6bd' || address.address === '0x4F4EDD1d27dAe9e746c264b64D429DB410966651' || address.address === '0xaA718cFe1B94910Ea030491397F69Aa2eebf0DA4' || address.address === '0xa042CD5D4Ba25CA3F8657Ace554D646F711fd46F' || address.address === '0xF0880920C5FAf7fB6E83769b760411D39770eE80' || address.address === '0x245e7e297a84564D671324B69df1F009527991D3' || address.address === '0x86d153229544991dbC17Db97e0a27a05602BA537' || address.address === '0xeFfD0797B9d6171245417ba932CFA12a0D464547' || address.address === '0xd78A960a5dfbb44055F7B3406f19e445801BbbF8' || address.address === '0x4A0e7ab552707e084320A33C7D611cA08f329696' || address.address === 
                    '0xE7aBcb34c17C8bd049594dCcc9c45ae07b449a5b' || address.address === '0xa57525fE58267845884cc36a6D312F91Ceb7E012' || address.address === '0xED32Ff260E60d401D8c453Ff9b9A6eedd3087f3A' || address.address === '0x00a6ed2E858b841DBf44A57f910C94041565880B') ? (
                            <ListGroup.Item><b>Balance</b>: 0 SIFTO</ListGroup.Item>
                        ) : (
                            <ListGroup.Item><b>Balance</b>: {address.balance} SIFTO</ListGroup.Item>
                        )}


                        {<ListGroup.Item><b>Balance</b>: {address.balance} SIFTO</ListGroup.Item> }
                        {/* <ListGroup.Item><b>eth Value</b>: ${address.value}</ListGroup.Item>
                        <ListGroup.Item><b>Tokens</b>: </ListGroup.Item> */}
                        <ListGroup.Item></ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
        );
}
export default AddressOverview;