import {google} from 'googleapis'
import {envConfig} from '~/constants/config'
import nodemailer from 'nodemailer'

export const emailService = {
  MAIL_MAILER: envConfig.mail_mailer,
  MAIL_HOST: envConfig.mail_host,
  MAIL_PORT: envConfig.mail_port,
  MAIL_USERNAME: envConfig.mail_username,
  MAIL_PASSWORD: envConfig.mail_password,
  MAIL_ENCRYPTION: envConfig.mail_encryption,
  MAIL_FROM_ADDRESS: envConfig.mail_from_address,
  MAIl_FROM_NAME: envConfig.mail_from_name
}

const oAuth2Client = new google.auth.OAuth2(
  envConfig.ggmail_client_id,
  envConfig.ggmail_client_secret,
  envConfig.ggdriver_redirec_uri
)
oAuth2Client.setCredentials({refresh_token: envConfig.ggmail_refresh_token})

export const sendMail = async ({to, subject, htmlContent}: {to: string; subject: string; htmlContent: string}) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
      host: emailService.MAIL_HOST,
      port: parseInt(emailService.MAIL_PORT),
      secure: false,
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: emailService.MAIL_USERNAME,
        clientId: envConfig.ggmail_client_id,
        clientSecret: envConfig.ggmail_client_secret,
        refreshToken: envConfig.ggmail_refresh_token,
        accessToken: accessToken as string
      }
    })
    const options = {
      from: emailService.MAIL_FROM_ADDRESS,
      to: to,
      subject: subject,
      html: htmlContent
    }
    return transport.sendMail(options)
  } catch (err) {
    console.log(err)
  }
}
