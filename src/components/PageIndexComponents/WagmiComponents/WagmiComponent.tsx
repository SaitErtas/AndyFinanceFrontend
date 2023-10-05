import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig, useAccount, useBalance, useConnect, useContractRead, useContractReads } from 'wagmi'
import { arbitrum, localhost, mainnet } from 'wagmi/chains'

import bnbAndyFinanceContract from 'src/contract/BnbAndyFinance.json'
import bnbAndyAbi from 'src/contract/'
import WagmiContratDeposit from './WagmiContratDeposit'
import { Abi } from 'viem'


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

type DashboardItem = {
  totalInvested: 0
  getContractBalance: 0
  getPlanInfo: 0
  getUserDividends: null
  getUserActivePlansAmount: 0
  getUserTotalWithdrawn: 0
  getUserCheckpoint: null
  getUserReferrer: 0
  getUserTotalReferrals: 0
  getUserReferralTotalBonus: 0
  getUserReferralWithdrawn: 0
  getUserAvailable: 0
  getUserAmountOfDeposits: 0
  getUserTotalDeposits: 0
  getUserDepositInfo: null
  getUserActionLength: null
  getUserInfo: null
  getSiteInfo: null
  walletBalance: 0
}

export interface WagmiUserProp {
  wagmiConfig?: any;
  useAccount?: any;
  chains?: any;
  useBalance?: any;
  useContractRead?: any;
  dashboardItem?: DashboardItem;
}


const wagmiBnbDailyContract = {
  address: process.env.NEXT_PUBLIC_ANDY_FINANCE_CURRENT as `0x${string}`,
  abi: bnbAndyFinanceContract.abi as Abi,
}

function SetDashboardItem(props: { wagmiUserProp: WagmiUserProp }) {
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...wagmiBnbDailyContract,
        functionName: 'totalInvested'
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getContractBalance'
      },

    ],
  })

  props.wagmiUserProp.dashboardItem = data



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

const WagmiComponent = (props: { wagmiUserProp: WagmiUserProp, openDepositPopup: boolean, setOpenDepositPopup: any }) => {

  props.wagmiUserProp.wagmiConfig = wagmiConfig;

  SetDashboardItem({ wagmiUserProp: props.wagmiUserProp });

  return (
    <WagmiConfig config={wagmiConfig}>
      <w3m-button balance="show" />
      <GetWagmiStatus wagmiUserProp={props.wagmiUserProp} />
      <WagmiContratDeposit wagmiUserProp={props.wagmiUserProp} openDepositPopup={props.openDepositPopup} setOpenDepositPopup={props.setOpenDepositPopup}  ></WagmiContratDeposit>
    </WagmiConfig>
  )
}

export default WagmiComponent

