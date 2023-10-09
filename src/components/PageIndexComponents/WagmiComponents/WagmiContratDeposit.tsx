
import { formatEther, formatUnits, parseEther } from "viem";
import { usePrepareContractWrite, useContractWrite, useBalance } from "wagmi";
import { Dialog, DialogContent, Typography, TextField, Button, DialogActions, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import { Fragment, useEffect, useState } from "react";
import { WagmiUserProp } from "src/components/TypeOrInterface/TypeOrInterfaceClass";
import ContractBnbAndyFinance from 'src/contract/ContractBnbAndyFinance.json'
import toast from "react-hot-toast";

export default function WagmiContratDeposit(props: { wagmiUserProp: WagmiUserProp, isConnected: boolean, openDepositPopup: boolean, setOpenDepositPopup: any }) {
  const [depositValue, setDepositValue] = useState<number>(0)
  const [referrerWallet, setReferrerWallet] = useState(props.wagmiUserProp.useAccount.useAccount.address)
  const [isLoadingForDeposit, setIsLoadingForDeposit] = useState(false)

  const { config, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ANDY_FINANCE_CURRENT as `0x${string}`,
    abi: ContractBnbAndyFinance.abi,
    functionName: 'invest',
    args: [props.wagmiUserProp.useAccount.useAccount.address],
    value: parseEther("" + depositValue, "wei")
  })

  const { data, isLoading, isSuccess, write, isError } = useContractWrite(config)

  function colmn() {
    //console.log("props.wagmiUserProp : ", props.wagmiUserProp)

    return ""
  }

  function setDepositValueToInvest(ratio: number): void {
    const returnVal = (Number(formatEther(props.wagmiUserProp.useBalance.data.value)) * ratio).toFixed(5)
    setDepositValue(Number(returnVal))
  }


  useEffect(
    () => {
      function DepositOperationCompleted(): void {
        setIsLoadingForDeposit(false);
        props.setOpenDepositPopup(false);
        console.log("Test");
      }
      (isSuccess || isError) && DepositOperationCompleted()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [isSuccess, isError]
  )


  useEffect(
    () => {

      (props.openDepositPopup) && setDepositValueToInvest(.9999)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [props.openDepositPopup]
  )


  return (
    <Fragment>
      <Typography variant='h5' >
        {props.isConnected && isLoading && !props.isConnected && "Check Wallet"}
      </Typography>
      <Typography variant='body2' sx={{}}>
        {props.isConnected && isSuccess && "Successful Transaction Hash:"}
      </Typography>
      <Typography variant='body2' sx={{ color: 'success.main' }}>
        {props.isConnected && isSuccess && data?.hash}
      </Typography>
      {/* <div> {"" + isSuccess + " - " + isError}</div> */}


      {
        props.isConnected &&

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
                {props.wagmiUserProp.useBalance.isSuccess && t('BNB in Your Wallet').toString() + " : " + Number(formatEther(props.wagmiUserProp.useBalance?.data?.value)).toLocaleString(undefined, { maximumFractionDigits: 5 })}
              </Typography>
              {colmn()}
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
          {error && (<Fragment>
            <Typography variant='body1' sx={{ textAlign: 'center', color: "error.main" }}>
              {"Error :  Please check your parameters"}
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'left' }}>
              {"Details : " + error}
            </Typography>
          </Fragment>
          )}
        </Dialog>

      }
    </Fragment >
  )
}
