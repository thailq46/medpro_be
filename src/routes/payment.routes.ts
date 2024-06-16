import axios from 'axios'
import crypto from 'crypto'
import {Request, Response, Router} from 'express'
import {envConfig} from '~/constants/config'

const paymentRouter = Router()

/**
 * Account test
 * NGUYEN VAN A
 * 9704 0000 0000 0018
 * 03/07
 * OTP
 */
paymentRouter.post('/', async (req: Request, res: Response) => {
  const {price} = req.body
  const partnerCode = envConfig.momo_partner_code
  const accessKey = envConfig.momo_access_key
  const secretkey = envConfig.momo_secret_key
  const requestId = partnerCode + new Date().getTime()
  const orderId = requestId
  const orderInfo = 'pay with MoMo'
  const redirectUrl = `${envConfig.clientUrl}/payment`
  const ipnUrl = `${envConfig.clientUrl}/payment`
  const amount = price.toString()
  const requestType = envConfig.momo_request_type
  const extraData = ''

  const rawSignature =
    'accessKey=' +
    accessKey +
    '&amount=' +
    amount +
    '&extraData=' +
    extraData +
    '&ipnUrl=' +
    ipnUrl +
    '&orderId=' +
    orderId +
    '&orderInfo=' +
    orderInfo +
    '&partnerCode=' +
    partnerCode +
    '&redirectUrl=' +
    redirectUrl +
    '&requestId=' +
    requestId +
    '&requestType=' +
    requestType

  //signature
  const signature = crypto.createHmac('sha256', secretkey).update(rawSignature).digest('hex')

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: 'en'
  })

  const options = {
    url: 'https://test-payment.momo.vn/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    },
    data: requestBody
  }
  try {
    const result = await axios(options)
    return res.status(200).json(result.data)
  } catch (error) {
    return res.status(500).json(error)
  }
})

export default paymentRouter
