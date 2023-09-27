/* eslint-disable react-hooks/exhaustive-deps */
// const Home = () => {
//   return <>Home Page</>
// }
// export default Home


// ** React Imports
import { useState, useEffect, Fragment, ReactNode } from 'react'
import { BrowserProvider, Contract as ContractEthers, formatEther, parseUnits } from 'ethers'
import bnbAndyFinanceContract from 'src/contract/BnbAndyFinance.json'


import { useTranslation } from 'react-i18next'
import { CircularProgress, Button, Grid, TextField, Box, Typography, Card, CardContent, Dialog, DialogActions, DialogContent } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CustomChip from 'src/@core/components/mui/chip'


// ** Styled Component for the wrapper of all the features of a plan


interface UserEther {
  providerEther: any
  provider: any
  signer: any
  contract: any
  walletAddress: any
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



const deployedContractAddress = process.env.NEXT_PUBLIC_ANDY_FINANCE_ADDRESS as string
const Home = () => {
  const [isLoading, setLoading] = useState(false)
  const [isLoadingForDeposit, setIsLoadingForDeposit] = useState(false)
  const { t } = useTranslation()
  const [stateEther, setStateEther] = useState<UserEther>({
    providerEther: null,
    signer: null,
    contract: null,
    provider: null,
    walletAddress: ""
  });

  const [dashboardItem, setDashboardItem] = useState<DashboardItem>({
    totalInvested: 0,
    getContractBalance: 0,
    getPlanInfo: 0,
    getUserDividends: null,
    getUserActivePlansAmount: 0,
    getUserTotalWithdrawn: 0,
    getUserCheckpoint: null,
    getUserReferrer: 0,
    getUserTotalReferrals: 0,
    getUserReferralTotalBonus: 0,
    getUserReferralWithdrawn: 0,
    getUserAvailable: 0,
    getUserAmountOfDeposits: 0,
    getUserTotalDeposits: 0,
    getUserDepositInfo: null,
    getUserActionLength: null,
    getUserInfo: null,
    getSiteInfo: null,
    walletBalance: 0
  })

  const [openVersionPopup, setOpenVersionPopup] = useState(false)
  const [depositValue, setDepositValue] = useState(0)
  const [referrerWallet, setReferrerWallet] = useState("0x779D0fe3C586C8492d7a04141a7F92048e4d180e")




  useEffect(
    () => {
      const provider = window.ethereum; //new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
      async function template() {
        setLoading(true);
        const providerEther = await new BrowserProvider(window.ethereum)
        const signer = await providerEther.getSigner()
        const contractEther = await new ContractEthers(deployedContractAddress, bnbAndyFinanceContract.abi, signer);
        setStateEther({ providerEther: providerEther, provider: provider, signer: signer, contract: contractEther, walletAddress: provider.selectedAddress });
        setLoading(false);
      }
      provider && template();
    }
    , [])

  useEffect(
    () => {

      const { contract } = stateEther;
      async function readData() {
        if (!contract) return;
        await GetDashboardItem();
      }
      contract && readData();

    }, [stateEther])


  async function GetDashboardItem() {
    const { contract, providerEther, provider } = stateEther

    // totalDeposit:  0
    // activeInvestments:  0
    // totalReferralEarnings:  0
    // bnbToHarvest:  0
    if (!contract) return;
    const totalInvested = await contract.totalInvested();
    const getContractBalance = await contract.getContractBalance();
    const getPlanInfo = await contract.getPlanInfo();
    const getUserDividends = await contract.getUserDividends(stateEther.walletAddress);
    const getUserActivePlansAmount = await contract.getUserActivePlansAmount(stateEther.walletAddress);
    const getUserTotalWithdrawn = await contract.getUserTotalWithdrawn(stateEther.walletAddress);
    const getUserCheckpoint = await contract.getUserCheckpoint(stateEther.walletAddress);
    const getUserReferrer = await contract.getUserReferrer(stateEther.walletAddress);
    const getUserTotalReferrals = await contract.getUserTotalReferrals(stateEther.walletAddress);
    const getUserReferralTotalBonus = await contract.getUserReferralTotalBonus(stateEther.walletAddress);
    const getUserReferralWithdrawn = await contract.getUserReferralWithdrawn(stateEther.walletAddress);
    const getUserAvailable = await contract.getUserAvailable(stateEther.walletAddress);
    const getUserAmountOfDeposits = await contract.getUserAmountOfDeposits(stateEther.walletAddress);
    const getUserTotalDeposits = await contract.getUserTotalDeposits(stateEther.walletAddress);
    const getUserDepositInfo = await contract.getUserDepositInfo(stateEther.walletAddress);

    //const getUserActions = await contract.getUserActions(stateEther.walletAddress);
    const getUserActionLength = await contract.getUserActionLength(stateEther.walletAddress);
    const getUserInfo = await contract.getUserInfo(stateEther.walletAddress);
    const getSiteInfo = await contract.getSiteInfo();
    const walletBalance = await providerEther.getBalance(provider.selectedAddress)



    setDashboardItem({
      totalInvested: totalInvested,
      getContractBalance: getContractBalance,
      getPlanInfo: getPlanInfo,
      getUserDividends: getUserDividends,
      getUserActivePlansAmount: getUserActivePlansAmount,
      getUserTotalWithdrawn: getUserTotalWithdrawn,
      getUserCheckpoint: getUserCheckpoint,
      getUserReferrer: getUserReferrer,
      getUserTotalReferrals: getUserTotalReferrals,
      getUserReferralTotalBonus: getUserReferralTotalBonus,
      getUserReferralWithdrawn: getUserReferralWithdrawn,
      getUserAvailable: getUserAvailable,
      getUserAmountOfDeposits: getUserAmountOfDeposits,
      getUserTotalDeposits: getUserTotalDeposits,
      getUserDepositInfo: getUserDepositInfo,
      getUserActionLength: getUserActionLength,
      getUserInfo: getUserInfo,
      getSiteInfo: getSiteInfo,
      walletBalance: walletBalance
    })


  }

  async function investEtherJs() {
    const etherValue = parseUnits("" + depositValue, 18);

    console.log(etherValue);
    const { contract } = stateEther
    const totalDeposit = await contract.invest(referrerWallet, { value: etherValue });
    console.log("data:", totalDeposit);
    await totalDeposit.wait();

    await GetDashboardItem();
  }

  async function setDepositValueToInvest(ratio: number) {
    const returnVal = (Number(formatEther(dashboardItem!.walletBalance)) * ratio).toFixed(5)
    setDepositValue(Number(returnVal))

    return returnVal
  }


  async function investDeposit(): Promise<void | PromiseLike<void>> {
    await investEtherJs();
    setOpenVersionPopup(false);
  }

  //************************************************* */

  function Account() {
    return (
      <>
        <span>Account</span>
        <span role="img" aria-label="robot">
          🤖
        </span>
        <span>
          {stateEther.walletAddress === null
            ? '-'
            : stateEther.walletAddress
              ? `${stateEther.walletAddress.substring(0, 6)}...${stateEther.walletAddress.substring(stateEther.walletAddress.length - 4)}`
              : ''}
        </span>
      </>
    )
  }

  function Balance() {

    return (
      <>
        <span>Balance</span>
        <span role="img" aria-label="gold">
          💰
        </span>
        <span>{dashboardItem!.walletBalance === null ? 'Error' : dashboardItem!.walletBalance! ? `Ξ${formatEther(dashboardItem!.walletBalance!)}` : ''}</span>
      </>
    )
  }









  ////////////////////////////////////////////////////END Contract İşlemleri///////////////////////////////////////////////////////////

  return (

    // <Card>
    //   <CardContent>
    //     {propCryptoWalletOperationType && <CryptoWalletOperationHeader {...propCryptoWalletOperationType} />}
    //     {propCryptoWalletOperationType && <ResultGrid {...propCryptoWalletOperationType} />}
    //   </CardContent>
    // </Card>

    <Fragment >
      {isLoading && (
        <Fragment>
          <CircularProgress color='inherit' size={20} />
        </Fragment>
      )}
      {!isLoading && stateEther && stateEther.contract && dashboardItem && (
        <Grid container spacing={6} sx={{ mt: 2, p: 3 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body1" sx={{}}>
                    ANDY FINANCE
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} >
            <Card>
              <CardContent >
                <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                  <Grid item xs={4} >
                    <Box sx={{ textAlign: 'left' }}>
                      {Account()}
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                      {Balance()}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

          </Grid>

          <Grid container sx={{ mt: 2, justifyContent: 'center' }}>
            <Grid item xs={3} sx={{ mr: 2 }}>
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" sx={{}}>
                      Total Deposited Value
                    </Typography>
                    <Typography sx={{}}>
                      {"" + formatEther(dashboardItem.getUserTotalDeposits)}

                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3} sx={{ mr: 2 }} >
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" sx={{}}>
                      Active Investments
                    </Typography>
                    <Typography sx={{}}>
                      {"" + formatEther(dashboardItem.getContractBalance)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3} >
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" sx={{}}>
                      Total Referral Earnings
                    </Typography>
                    <Typography sx={{}}>
                      {"" + formatEther(dashboardItem.getUserTotalReferrals)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2, justifyContent: 'center' }}>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent >
                  <Box sx={{ height: "19px" }}>
                    <Typography variant="body1" sx={{}}>
                      Dashboard
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2, justifyContent: 'center' }}>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent >
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>
                    <Typography variant="body1" sx={{}}>
                      DAILY ROI
                    </Typography>
                    <Typography sx={{}}>
                      {"" + dashboardItem?.getPlanInfo}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mr: 2 }} >
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>
                    <Typography variant="body1" sx={{}}>
                      Total Deposit
                    </Typography>
                    <Typography sx={{}}>
                      {"" + formatEther(dashboardItem.getUserTotalDeposits)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>
                    <Typography variant="body1" sx={{}}>
                      Remaining Earnings
                    </Typography>
                    <Typography sx={{}}>
                      {"" + formatEther(dashboardItem.getUserTotalWithdrawn)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>
                    <Typography variant="body1" sx={{}}>
                      Total Withdrawn
                    </Typography>
                    <Typography sx={{}}>
                      {"" + formatEther(dashboardItem.getUserTotalWithdrawn)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mr: 2 }} >
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>
                    <Typography variant="body1" sx={{}}>
                      BNB to Harvest
                    </Typography>
                    <Typography sx={{}}>
                      {"" + formatEther(dashboardItem.getContractBalance)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item  >
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>

                    <Typography sx={{}}>
                      <Button
                        size='small'
                        variant='contained'
                        color='success'
                        sx={{ margin: 1, width: "170px" }}
                        onClick={() => {
                          setOpenVersionPopup(true)
                        }}
                      >
                        {t('Deposit').toString()}
                      </Button>
                    </Typography>
                    <Typography sx={{}}>
                      <Button
                        size='small'
                        variant='contained'
                        color='warning'
                        sx={{ margin: 1, width: "170px" }}
                        onClick={async () => {
                          await investEtherJs()
                        }}
                      >
                        {t('Harvest').toString()}
                      </Button>
                    </Typography>
                    <Typography sx={{}}>
                      <Button
                        size='small'
                        variant='contained'
                        color='info'
                        sx={{ margin: 1, width: "170px" }}
                        onClick={() => {
                          //investEtherJs()
                        }}
                      >
                        {t('Calculate Reward').toString()}
                      </Button>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: 2, justifyContent: 'center' }}>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent >
                  <Box sx={{ height: "19px" }}>
                    <Typography variant="body1" sx={{}}>
                      Insurance
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: 2, justifyContent: 'center' }}>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent >
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>
                    <Typography variant="body1" sx={{}}>
                      Insure With
                    </Typography>
                    <Typography sx={{}}>
                      {"10%"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mr: 2 }} >
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>

                    <Typography sx={{}}>
                      <CustomChip
                        size="small"
                        label={"Passive"}
                        color={'error'}
                        sx={{
                          height: 20,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          borderRadius: '5px',
                          textTransform: 'capitalize',
                        }}
                      />
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                      Your Insurance Status
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>
                    <Typography sx={{}}>
                      {"" + formatEther(dashboardItem.totalInvested)}
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                      Your Total Investment
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>
                    <Typography sx={{}}>
                      {"" + dashboardItem?.getUserTotalWithdrawn}
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                      Insurance Fee
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item   >
              <Card >
                <CardContent >
                  <Box sx={{ textAlign: 'center', height: "100px", width: "425px" }}>
                    <Typography >
                      <Button
                        size='small'
                        variant='outlined'
                        color='secondary'
                        sx={{ margin: 1, width: "170px" }}
                        onClick={() => {
                          //investEtherJs()
                        }}
                      >
                        {t('Insurance').toString()}
                      </Button>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: 2, justifyContent: 'center' }}>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent >
                  <Box sx={{ height: "19px" }}>
                    <Typography variant="body1" sx={{}}>
                      Affiliate Program
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Affiliate Program */}
          <Grid container sx={{ mt: 2, justifyContent: 'center' }}>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent >
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>
                    <Typography variant="body1" sx={{}}>
                      Bonus
                    </Typography>
                    <Typography sx={{}}>
                      {"Level 1 = 10%"}
                    </Typography>
                    <Typography sx={{}}>
                      {"Level 1 = 10%"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mr: 2 }} >
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "425px" }}>

                    <Typography sx={{}}>
                      Your Personal Link:

                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>

                    <Typography sx={{}}>
                      {"" + 0}
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                      Invited Users
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mr: 2 }}>
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190px" }}>

                    <Typography sx={{}}>
                      {"" + dashboardItem.getUserTotalReferrals}
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                      Total Referral Earnings
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item   >
              <Card >
                <CardContent >
                  <Box sx={{ textAlign: 'center', height: "100px", width: "190" }}>
                    <Typography sx={{}}>
                      {"" + formatEther(dashboardItem.getUserTotalReferrals)}
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                      Available Referral Earnings
                    </Typography>
                    <Typography >
                      <Button
                        size='small'
                        variant='outlined'
                        color='secondary'
                        sx={{ margin: 1, width: "170px" }}
                        onClick={() => {
                          //investEtherJs()
                        }}
                      >
                        {t('Harvest').toString()}
                      </Button>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* 
          <Grid item xs={4}>
            <Button
              size='large'
              variant='contained'
              color='error'
              sx={{ margin: 3 }}
              onClick={() => {
                console.log("dashboardItem", dashboardItem)
              }}
            >
              {t('Dashboard Item').toString()}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              size='large'
              variant='contained'
              color='error'
              sx={{ margin: 3 }}
              onClick={() => {
                GetDashboardItem();
              }}
            >
              {t('Refresh Values').toString()}
            </Button>
          </Grid> */}
        </Grid>
      )}

      <Dialog
        fullWidth
        open={openVersionPopup}
        maxWidth='sm'
        scroll='body'
        onClose={() => setOpenVersionPopup(false)}
        onBackdropClick={() => setOpenVersionPopup(false)}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <Box sx={{}}>

            <Typography variant='h5' sx={{ mb: 5, lineHeight: '2rem' }}>
              {t('Deposit').toString()}
            </Typography>

            <Typography sx={{ lineHeight: '2rem' }}>
              {t('BNB in Your Wallet').toString() + " : " + Number(formatEther(dashboardItem!.walletBalance)).toLocaleString(undefined, { maximumFractionDigits: 5 })}
            </Typography>

            <Typography sx={{ mb: 5, lineHeight: '2rem' }}>
              {t('Min Deposit').toString() + " : 0.00001"}
            </Typography>

            <TextField
              fullWidth

              InputLabelProps={{ shrink: true }}
              label={t('Deposit Amount').toString()}
              value={depositValue}
              onChange={e => {
                setDepositValue(Number(e.target.value))
              }}
            />
            <Box sx={{ mt: 1, mb: 5 }}>
              <Button sx={{ mr: 3 }} variant='contained' size='small' color='success' onClick={() => setDepositValueToInvest(0.25)}>
                {t('25%').toString()}
              </Button>
              <Button sx={{ mr: 3 }} variant='contained' size='small' color='success' onClick={() => setDepositValueToInvest(0.55)}>
                {t('50%').toString()}
              </Button>
              <Button sx={{ mr: 3 }} variant='contained' size='small' color='success' onClick={() => setDepositValueToInvest(0.75)}>
                {t('75%').toString()}
              </Button>
              <Button variant='contained' size='small' color='success' onClick={() => setDepositValueToInvest(.99999)}>
                {t('100%').toString()}
              </Button>
            </Box>
            <TextField
              fullWidth

              InputLabelProps={{ shrink: true }}
              label={t('Referrer Wallet').toString()}
              value={referrerWallet}
              onChange={e => {
                setReferrerWallet("" + e.target.value)
              }}
            />
          </Box>{' '}
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          {isLoadingForDeposit && (
            <Fragment>
              <CircularProgress color='inherit' size={20} />
            </Fragment>
          )}
          {!isLoadingForDeposit && (
            <Button variant='contained' sx={{ width: "100%" }} color='primary' onClick={async () => {
              setIsLoadingForDeposit(true);
              await investDeposit();
              setIsLoadingForDeposit(false);
            }
            }>
              {t('Deposit').toString()}
            </Button>
          )}

        </DialogActions>
      </Dialog>
    </Fragment >
  )
}


Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Home.guestGuard = true

export default Home
