import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as Mailgen from 'mailgen';
import { SendMailDto } from './sendMail.Dto';

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'Nara Blogs',
    link: 'http://localhost:3000',
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});

@Injectable()
export class MailService {
  constructor(private readonly maileService: MailerService) {}

      async sendEmail({to, subject, text}: SendMailDto){
        await this.maileService.sendMail({
            to, 
            subject,
            html: text 
        })
        .then()
        .catch((err) => console.log(err))

    }

    templateConfirmationAccount(accountEmail: string, accountName: string, accountToken: string){
      const email = {
          body: {
              name: accountName,
              action: {
                  instructions: 'Clique no botão abaixo para confirmar sua conta:',
                  button: {
                      color: '#22BC66',
                      text: 'Confirmar conta',
                      link: `https://kanva.vercel.app/accountConfirmation/${accountToken}`
                  }
              },
              outro: 'Necessita de ajuda ou tem dúvidas? Basta responder a este e-mail. Teremos todo o gosto em ajudar. Sinceramente, Kanva'
          }
      }

      const emailBody = mailGenerator.generate(email)
      const emailTemplate = {
          to: accountEmail,
          subject: "Confirmação de conta",
          text: emailBody
      }

      return emailTemplate
    }
}