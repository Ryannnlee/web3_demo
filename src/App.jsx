import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

const production = process.env.NODE_ENV === 'production'
function App() {
  const [address, setAddress] = useState(null)
  const [signer, setSigner] = useState(null)
  const [balance, setBalance] = useState(null)

  const shortenAddr = (addr) => `${addr.slice(0, 4)}...${addr.slice(-4)}`

  const connectWalletHandler = async () => {
    const web3Modal = new Web3Modal({
      network: production ? 'mainnet' : 'rinkeby', // optional
      // cacheProvider: true, // optional
      providerOptions: {}, // required
    })
    const instance = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(instance)
    const signer = provider.getSigner()
    setSigner(() => signer)
    const address = await signer.getAddress()
    setAddress(() => shortenAddr(address))
    const balance = await provider.getBalance(address)
    setBalance(() => ethers.utils.formatEther(balance))
  }

  const disconnectWalletHandler = () => {
    console.log('disconnect')
  }

  return (
    <div className="App">
      <Container className="mt-5">
        <Row>
          <Col>
            <h1>Hello {address}</h1>
            <p>You have {balance} ETH</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={connectWalletHandler}>Connect Wallet</Button>
          </Col>
          <Col>
            <Button onClick={disconnectWalletHandler}>Disconnect Wallet</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
