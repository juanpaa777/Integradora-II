// twilio.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-twilio',
  templateUrl: './twilio.component.html',
  styleUrls: ['./twilio.component.css']
})
export class TwilioComponent {
  phoneNumber: string = '';
  message: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' | null = null;

  constructor(private http: HttpClient) {}

  sendWhatsAppMessage() {
    const twilioUrl = '';
    const twilioAccountSid ='';
    const twilioAuthToken = '';

    const formData = new FormData();
    formData.append('From', 'whatsapp:+14155238886');
    formData.append('To', `whatsapp:+${this.phoneNumber}`);
    formData.append('Body', this.message);

    this.http.post(twilioUrl, formData, {
      headers: {
      'Authorization': 'Basic ' + btoa(`${twilioAccountSid}:${twilioAuthToken}`)
      }
    }).subscribe(
      (response) => {
        console.log('WhatsApp message sent successfully:', response);
        this.alertMessage = 'Mensaje enviado correctamente.';
        this.alertType = 'success';
      },
      (error) => {
        console.error(  'Error sending WhatsApp message:', error);
        this.alertMessage = 'Error al enviar el mensaje. Por favor, verifica el número y vuelve a intentarlo.';
        this.alertType = 'error';
      }
    );
  }

  closeAlert() {
    this.alertMessage = '';
    this.alertType = null;
  }
}
