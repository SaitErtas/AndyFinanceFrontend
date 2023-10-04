import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig, useAccount, useBalance, useConnect, useContractRead } from 'wagmi'
import { arbitrum, localhost, mainnet } from 'wagmi/chains'

import bnbAndyFinanceContract from 'src/contract/BnbAndyFinance.json'
import WagmiContratDeposit from './WagmiContratDeposit'


// 1. Get projectId
const projectId = 'a37e64dd529e0f9d577889cd5f0a3039'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, localhost]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })


export type WagmiChains = {
  chains?: any
}

export type UserTypeWagmiConfig = {
  wagmiConfig?: any
}
export type WagmiUseAccount = {
  useAccount?: any
}

export interface WagmiUserProp {
  wagmiConfig?: any;
  useAccount?: any;
  chains?: any;
  useBalance?: any;
  useContractRead?: any;
}





const GetWagmiStatus = (props: { wagmiUserProp: WagmiUserProp }) => {
  const { isConnecting, isDisconnected, isConnected, connector, address } = useAccount()

  props.wagmiUserProp.useAccount.useAccount = useAccount()

  console.log("props.wagmiUseAccount.useAccount", props.wagmiUserProp.useAccount)

  props.wagmiUserProp.useBalance = useBalance({
    address: props.wagmiUserProp.useAccount.useAccount.address,
  });

  // if (isConnecting) return <div>Connecting…</div>
  // if (isDisconnected) return <div>Disconnected </div>

  // if (props.wagmiUseAccount.useAccount.isConnected) {


  // }
  // else if (props.wagmiUseAccount.useAccount.isDisconnected) {
  // }

  // console.log("connector", connector.name);

  return (
    <>
      {isConnected && connector && <div>Connected to {connector.name}</div>}

    </>
  )

  return <div>{ }</div>
}

function WagmiContratReads() {
  const { data, isError, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_ANDY_FINANCE_CURRENT as `0x${string}`,
    abi: bnbAndyFinanceContract.abi,
    functionName: 'getContractBalance',
    onSettled(data, error) {
      console.log('Settled', { data, error })
    },
  })

  return <div>{ }</div>
}

const WagmiComponent = (props: { wagmiUserProp: WagmiUserProp, openDepositPopup: boolean, setOpenDepositPopup: any }) => {

  props.wagmiUserProp.wagmiConfig = wagmiConfig;

  console.log("wagmiConfig", wagmiConfig)

  props.wagmiUserProp.useContractRead = useContractRead;


  return (
    <WagmiConfig config={wagmiConfig}>
      <w3m-button balance="show" />
      <GetWagmiStatus wagmiUserProp={props.wagmiUserProp} />
      <WagmiContratReads ></WagmiContratReads>
      <WagmiContratDeposit wagmiUserProp={props.wagmiUserProp} openDepositPopup={props.openDepositPopup} setOpenDepositPopup={props.setOpenDepositPopup}  ></WagmiContratDeposit>


    </WagmiConfig>
  )
}

export default WagmiComponent

