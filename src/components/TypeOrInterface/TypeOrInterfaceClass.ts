export type DashboardItem = {
  totalInvested: bigint
  getContractBalance: bigint
  getPlanInfo: bigint
  getUserDividends?: any
  getUserActivePlansAmount: bigint
  getUserTotalWithdrawn: bigint
  getUserCheckpoint?: any
  getUserReferrer?: any
  getUserTotalReferrals: bigint
  getUserReferralTotalBonus: bigint
  getUserReferralWithdrawn: bigint
  getUserAvailable: bigint
  getUserAmountOfDeposits: bigint
  getUserTotalDeposits: bigint
  getUserDepositInfo: bigint
  getUserActionLength?: any
  getUserInfo?: any
  getSiteInfo?: any
}

export interface WagmiUserProp {
  wagmiConfig?: any
  useAccount?: any
  chains?: any
  useBalance?: any
  useContractRead?: any
  dashboardItem?: DashboardItem
}
