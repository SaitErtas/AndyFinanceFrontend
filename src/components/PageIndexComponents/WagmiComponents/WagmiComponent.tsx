import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig, useAccount, useBalance, useConnect, useContractRead, useContractReads } from 'wagmi'
import { arbitrum, localhost, mainnet, bscTestnet } from 'wagmi/chains'


import WagmiContratDeposit from './WagmiContratDeposit'
import { Abi } from 'viem'
import SetDashboardItem from './SetDashboardItem'
import { WagmiUserProp } from 'src/components/TypeOrInterface/TypeOrInterfaceClass'
import { useState } from 'react'


// 1. Get projectId
const projectId = 'a37e64dd529e0f9d577889cd5f0a3039'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, localhost, bscTestnet]
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






const GetWagmiStatus = (props: { wagmiUserProp: WagmiUserProp, setIsConnected: any }) => {
  const { isConnecting, isDisconnected, isConnected, connector, address } = useAccount()

  props.wagmiUserProp.useAccount.useAccount = useAccount()

  console.log("props.wagmiUseAccount.useAccount", props.wagmiUserProp.useAccount)

  props.wagmiUserProp.useBalance = useBalance({
    address: props.wagmiUserProp.useAccount.useAccount.address,
  });

  // if (isConnecting) return <div>Connecting…</div>
  // if (isDisconnected) return <div>Disconnected </div>

  if (isConnected) {
    props.setIsConnected(true);
  }
  else {
    props.setIsConnected(false);
  }

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

// function WagmiContratReads() {
//   const { data, isError, isLoading } = useContractRead({
//     address: process.env.NEXT_PUBLIC_ANDY_FINANCE_CURRENT as `0x${string}`,
//     abi: bnbAndyFinanceContract.abi,
//     functionName: 'getContractBalance',
//     onSettled(data, error) {
//       console.log('Settled', { data, error })
//     },
//   })

//   return <div>{ }</div>
// }


const WagmiComponent = (props: { wagmiUserProp: WagmiUserProp, setDashboardItem: any, isConnected: boolean, setIsConnected: any, openDepositPopup: boolean, setOpenDepositPopup: any }) => {

  props.wagmiUserProp.wagmiConfig = wagmiConfig;

  return (
    <WagmiConfig config={wagmiConfig}>
      <w3m-button balance="show" />
      <GetWagmiStatus wagmiUserProp={props.wagmiUserProp} setIsConnected={props.setIsConnected} />
      {props.isConnected && <WagmiContratDeposit wagmiUserProp={props.wagmiUserProp} isConnected={props.isConnected} openDepositPopup={props.openDepositPopup} setOpenDepositPopup={props.setOpenDepositPopup}  ></WagmiContratDeposit>
      }
      {props.isConnected && <SetDashboardItem wagmiUserProp={props.wagmiUserProp} setDashboardItem={props.setDashboardItem}></SetDashboardItem>}
    </WagmiConfig>
  )

}

export default WagmiComponent



