
import { formatEther, parseEther, parseUnits } from "viem";
import { usePrepareContractWrite, useContractWrite, useBalance } from "wagmi";
import bnbAndyFinanceContract from 'src/contract/BnbAndyFinance.json'
import { Dialog, DialogContent, Typography, TextField, Button, DialogActions, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import { Fragment, useState } from "react";
import { WagmiUserProp } from "./WagmiComponent";

export default function WagmiContratDeposit(props: { wagmiUserProp: WagmiUserProp, openDepositPopup: boolean, setOpenDepositPopup: any }) {

  const [depositValue, setDepositValue] = useState(0)
  const [referrerWallet, setReferrerWallet] = useState("0x779D0fe3C586C8492d7a04141a7F92048e4d180e")
  const [isLoadingForDeposit, setIsLoadingForDeposit] = useState(false)


  async function setDepositValueToInvest(ratio: number) {
    const returnVal = (Number(formatEther(props.wagmiUserProp.useBalance.data.value)) * ratio).toFixed(5)
    setDepositValue(Number(returnVal))

    return returnVal
  }

  const { config, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ANDY_FINANCE_CURRENT as `0x${string}`,
    abi: bnbAndyFinanceContract.abi,
    functionName: 'invest',
    args: ["0xc2b642856f06fE467a046189cC466E8c4BEFA469"],
    value: parseUnits("" + depositValue, 18)
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return (
    <Fragment>

      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}



      <Dialog
        fullWidth
        open={props.openDepositPopup}
        maxWidth='sm'
        scroll='body'
        onClose={() => props.setOpenDepositPopup(false)}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <Box sx={{}}>

            <Typography variant='h5' sx={{ mb: 5, lineHeight: '2rem' }}>
              {t('Deposit').toString()}
            </Typography>

            <Typography sx={{ lineHeight: '2rem' }}>
              {t('BNB in Your Wallet').toString() + " : " + Number(formatEther(props.wagmiUserProp.useBalance.data.value)).toLocaleString(undefined, { maximumFractionDigits: 5 })}
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
              <Button variant='contained' size='small' color='success' onClick={() => setDepositValueToInvest(.9999)}>
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
            <Button variant='contained' disabled={!write} sx={{ width: "100%" }} color='primary' onClick={async () => {
              setIsLoadingForDeposit(true);
              await write?.();
              setIsLoadingForDeposit(false);
            }
            }>
              {t('Deposit').toString()}
            </Button>
          )}

          {/* <Typography variant="body2" sx={{ mb: 5, lineHeight: '2rem' }}>
            {console.log(error)}
            {JSON.stringify(error)}
          </Typography> */}


        </DialogActions>
      </Dialog>


    </Fragment>
  )
}
