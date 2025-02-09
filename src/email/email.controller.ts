import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from 'src/dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    const { to, subject, content } = sendEmailDto;
    await this.emailService.sendMail(to, subject, content);
    return { message: 'Email sent successfully!' };
  }
}
