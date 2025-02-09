import { Injectable } from '@nestjs/common';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from './email.service';

@Injectable()
@Processor('email')
export class EmailProcessor {
  constructor(private readonly emailService: EmailService) {}

  @Process('sendEmail')
  async handleSendEmail(job: Job) {
    const { email, subject, content } = job.data;
    console.log(`Sending email to ${email} with subject: ${subject}`);

    await this.emailService.sendMail(email, subject, content);
  }
}
