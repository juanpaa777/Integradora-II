import { Component } from '@angular/core';
import { BotService } from '../../services/bot.service';
import { MenuComponent } from '../menu/menu.component'; // Importar MenuComponent

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userMessage: string = '';
  messages: { text: string, from: string }[] = []; // Almacenar mensajes
  options: string[] = []; // Almacenar opciones del bot

  constructor(private botService: BotService, private menuComponent: MenuComponent) {} // Inyectar MenuComponent

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, from: 'user' }); // Agregar mensaje del usuario
      this.botService.sendMessage(this.userMessage).subscribe(response => {
        this.messages.push({ text: response.result.fulfillment.speech, from: 'bot' }); // Agregar respuesta del bot
        this.options = response.result.fulfillment.options || []; // Obtener opciones
        this.userMessage = ''; // Limpiar el campo de entrada
      }, error => {
        console.error('Error al comunicarse con Dialogflow:', error);
        this.messages.push({ text: 'Lo siento, no pude entender tu mensaje.', from: 'bot' });
      });
    }
  }

  selectOption(option: string) {
    this.messages.push({ text: option, from: 'user' }); // Agregar opción seleccionada
    this.userMessage = option; // Establecer el mensaje del usuario

    // Llamar a los métodos del MenuComponent según la opción seleccionada
    switch (option) {
      case 'Buscar libros':
        this.menuComponent.showSearchBooks(); // Llamar al método para buscar libros
        break;
      case 'Registrar un libro':
        this.menuComponent.showNewBook(); // Llamar al método para registrar un libro
        break;
      case 'Gestionar multas':
        this.menuComponent.showMulta(); // Llamar al método para gestionar multas
        break;
      case 'Volver al menú principal':
        this.menuComponent.resetViews(); // Llamar al método para volver al menú principal
        break;
      default:
        this.sendMessage(); // Enviar el mensaje si no es una opción de navegación
        break;
    }
  }
}
