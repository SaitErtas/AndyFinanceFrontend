/* eslint-disable react-hooks/exhaustive-deps */
// const Home = () => {
//   return <>Home Page</>
// }
// export default Home


// ** React Imports
import { useState, useEffect, Fragment, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Button, Grid, TextField, Box, Typography, Card, CardContent } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CustomChip from 'src/@core/components/mui/chip'
import WagmiComponent from 'src/components/PageIndexComponents/WagmiComponents/WagmiComponent'
import { WagmiUserProp } from 'src/components/TypeOrInterface/TypeOrInterfaceClass'
import { formatEther } from 'viem'

// ** Styled Component for the wrapper of all the features of a plan

const Home = () => {
  const [isLoading, setLoading] = useState(false)
  const [isLoadingForDeposit, setIsLoadingForDeposit] = useState(false)
  const { t } = useTranslation()


  const [openDepositPopup, setOpenDepositPopup] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [dashboardItem, setDashboardItem] = useState({
    totalInvested: 0 as unknown as bigint,
    getContractBalance: 0 as unknown as bigint,
    getPlanInfo: 0 as unknown as bigint,
    getUserDividends: null,
    getUserActivePlansAmount: 0 as unknown as bigint,
    getUserTotalWithdrawn: 0 as unknown as bigint,
    getUserCheckpoint: null,
    getUserReferrer: 0 as unknown as bigint,
    getUserTotalReferrals: 0 as unknown as bigint,
    getUserReferralTotalBonus: 0 as unknown as bigint,
    getUserReferralWithdrawn: 0 as unknown as bigint,
    getUserAvailable: 0 as unknown as bigint,
    getUserAmountOfDeposits: 0 as unknown as bigint,
    getUserTotalDeposits: 0 as unknown as bigint,
    getUserDepositInfo: 0 as unknown as bigint,
    getUserActionLength: null,
    getUserInfo: null,
    getSiteInfo: null,
  })

  const wagmiUserProp = {
    chains: {}, useAccount: {}, wagmiConfig: {}, useBalance: {}, useContractRead: {}
  } as WagmiUserProp;


  async function GetWagmiValues() {
    console.log("wagmiUserProp", wagmiUserProp)

  }

  //************************************************* */

  // function Account() {
  //   return (
  //     <>
  //       <span>Account</span>
  //       <span role="img" aria-label="robot">
  //         🤖
  //       </span>
  //       <span>
  //         {stateEther.walletAddress === null
  //           ? '-'
  //           : stateEther.walletAddress
  //             ? `${stateEther.walletAddress.substring(0, 6)}...${stateEther.walletAddress.substring(stateEther.walletAddress.length - 4)}`
  //             : ''}
  //       </span>
  //     </>
  //   )
  // }

  // function Balance() {

  //   return (
  //     <>
  //       <span>Balance</span>
  //       <span role="img" aria-label="gold">
  //         💰
  //       </span>
  //       <span>{dashboardItem!.walletBalance === null ? 'Error' : dashboardItem!.walletBalance! ? `Ξ${formatEther(dashboardItem!.walletBalance!)}` : ''}</span>
  //     </>
  //   )
  // }









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

      {/* {!(window.ethereum) && (
        <Fragment>

          <Grid container spacing={6} sx={{ mt: 2, p: 3 }}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" sx={{}}>
                      Plase install Wallet Provider
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>


        </Fragment>
      )} */}

      {!isLoading && dashboardItem && (
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
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item xs={4} >
                    <Box sx={{ textAlign: '-webkit-center'! }}>
                      <WagmiComponent wagmiUserProp={wagmiUserProp} isConnected={isConnected} openDepositPopup={openDepositPopup}
                        setOpenDepositPopup={setOpenDepositPopup} setIsConnected={setIsConnected} setDashboardItem={setDashboardItem} ></WagmiComponent>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Fragment>
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
                        {"" + dashboardItem.getPlanInfo}
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
                            setOpenDepositPopup(true)
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
                        {"" + dashboardItem.getUserTotalWithdrawn}
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
            <Grid container sx={{ mt: 2, mb: 12, justifyContent: 'center' }}>
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

            {/* <Grid item xs={4}>
              <Button
                size='large'
                variant='contained'
                color='error'
                sx={{ margin: 3 }}
                onClick={() => {
                  console.log("dashboardItem : ", dashboardItem)
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

              >
                {t('Refresh Values').toString()}
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                size='large'
                variant='contained'
                color='error'
                sx={{ margin: 3 }}
                onClick={async () => {
                  await GetWagmiValues();
                }}
              >
                {t('Get Wagmi Values').toString()}
              </Button>
            </Grid> */}
          </Fragment>
        </Grid>
      )}
    </Fragment >
  )
}


Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Home.guestGuard = true

export default Home
