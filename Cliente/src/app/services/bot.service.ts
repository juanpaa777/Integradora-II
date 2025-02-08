import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  private dialogflowUrl = 'https://api.dialogflow.com/v1/query?v=20150910';

  // Mensajes predefinidos y sus respuestas
  private predefinedResponses: { [key: string]: any } = {
    'hola': '¡Hola! ¿Cómo puedo ayudarte hoy?',
    'ayuda': {
      text: 'Claro, ¿en qué necesitas ayuda?',
      options: [
        'Buscar libros',
        'Registrar un libro',
        'Gestionar multas',
        'Volver al menú principal'
      ]
    },
    'gracias': '¡De nada! Si tienes más preguntas, no dudes en preguntar.',
    'adiós': '¡Hasta luego! Que tengas un buen día.'
  };

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    // Verificar si el mensaje está en los predefinidos
    const response = this.predefinedResponses[message.toLowerCase()];
    if (response) {
      return of({ result: { fulfillment: { speech: response.text || response, options: response.options || [] } } });
    }

    // Si no está en los predefinidos, enviar a Dialogflow
    const body = {
      query: message,
      lang: 'es',
      sessionId: 'user-session-12345' 
    };
    const headers = new HttpHeaders({
      'Authorization': 'Jp123456@'
    });

    return this.http.post(this.dialogflowUrl, body, { headers });
  }
}
