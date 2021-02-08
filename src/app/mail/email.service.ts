import nodemailer from 'nodemailer';

export class EmailService {
  constructor(options: EmailServiceOptions) {
    this.userEmail = options.userEmail;
    this.userName = options.userName;
  }

  private userEmail: string;
  private userName: string;

  async send(): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    await transport.sendMail({
      from: process.env.SMTP_FROM,
      to: this.userEmail,
      subject: `Hello ${this.userName}`,
      html: `
        <h1>Hello ${this.userName}</h1>
        <p>this is a test email</p>
      `,
    });
  }
}

interface EmailServiceOptions {
  userName: string;
  userEmail: string;
}
