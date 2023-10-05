import { useContractReads } from "wagmi"
import ContractBnbAndyFinance from 'src/contract/ContractBnbAndyFinance.json'
import { Abi } from "viem"
import { DashboardItem, WagmiUserProp } from "src/components/TypeOrInterface/TypeOrInterfaceClass"


const wagmiBnbDailyContract = {
  address: process.env.NEXT_PUBLIC_ANDY_FINANCE_CURRENT as `0x${string}`,
  abi: ContractBnbAndyFinance.abi as Abi,
}

export default function SetDashboardItem(props: { wagmiUserProp: WagmiUserProp, setDashboardItem: any }) {
  const { data, isError, isLoading, isSuccess, status } = useContractReads({
    contracts: [
      {
        ...wagmiBnbDailyContract,
        functionName: 'totalInvested'
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getContractBalance'
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getPlanInfo'
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserDividends',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserActivePlansAmount',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserTotalWithdrawn',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserCheckpoint',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserReferrer',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserTotalReferrals',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserReferralTotalBonus',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserReferralWithdrawn',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserAvailable',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserAmountOfDeposits',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserTotalDeposits',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserDepositInfo',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserActionLength',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getUserInfo',
        args: [props.wagmiUserProp.useAccount.useAccount.address]
      },
      {
        ...wagmiBnbDailyContract,
        functionName: 'getSiteInfo'
      },
    ],
    watch: true,
    onSettled(data) {
      console.log('Settled-data', data)
      const dasboardItem = {} as unknown as DashboardItem;
      if (data) {
        let i = 0;
        dasboardItem.totalInvested = data[i++].result as bigint;
        dasboardItem.getContractBalance = data[i++].result as bigint;
        dasboardItem.getPlanInfo = data[i++].result as bigint;
        dasboardItem.getUserDividends = data[i++].result as bigint;
        dasboardItem.getUserActivePlansAmount = data[i++].result as bigint;
        dasboardItem.getUserTotalWithdrawn = data[i++].result as bigint;
        dasboardItem.getUserCheckpoint = data[i++].result as bigint;
        dasboardItem.getUserReferrer = data[i++].result;
        dasboardItem.getUserTotalReferrals = data[i++].result as bigint;
        dasboardItem.getUserReferralTotalBonus = data[i++].result as bigint;
        dasboardItem.getUserReferralWithdrawn = data[i++].result as bigint;
        dasboardItem.getUserAvailable = data[i++].result as bigint;
        dasboardItem.getUserAmountOfDeposits = data[i++].result as bigint;
        dasboardItem.getUserTotalDeposits = data[i++].result as bigint;
        dasboardItem.getUserDepositInfo = data[i++].result as bigint;
        dasboardItem.getUserActionLength = data[i++].result;
        dasboardItem.getUserInfo = data[i++].result;
        dasboardItem.getSiteInfo = data[i++].result;
        props.setDashboardItem(dasboardItem)
      }
    },
  })



  return <div>{ }</div>
}
