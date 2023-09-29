import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig, useAccount } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'

// 1. Get projectId
const projectId = 'a37e64dd529e0f9d577889cd5f0a3039'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

function GetWagmiStatus() {
  const { address, isConnecting, isDisconnected } = useAccount()

  const test = useAccount()

  if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>

  console.log("test", test)

  return <div>{address}</div>
}

export default function WagmiComponent() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <w3m-button balance="show" />
      <GetWagmiStatus />
    </WagmiConfig>
  )
}
