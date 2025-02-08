import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGoogleService } from '../login/auth-google.service'; // Importar el servicio de Google
import { AuthDiscordService } from '../login/AuthDiscordService.service'; // Importar el servicio de Discord
import { TokenModalComponent } from '../../menu/Options/token-modal/token-modal.component';
import { UserService } from './user.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component {
  username: string = '';
  password: string = '';
  token: string | null = null; // Variable para almacenar el token
  userProfile: { username: string; email: string } | null = null; // Declarar userProfile

  constructor(
    private http: HttpClient,
    private router: Router,
    public activeModal: NgbActiveModal,
    private authGoogleService: AuthGoogleService,
    private authDiscordService: AuthDiscordService,
    private modalService: NgbModal, // Inyectar el servicio de modal
    private userService: UserService // Inyectar el servicio
  ) {}

  onSubmit() {
    const loginData = { username: this.username, password: this.password };
    console.log('Enviando datos de inicio de sesión:', loginData);
  
    this.http.post<any>('http://localhost:3000/api/login2', loginData).subscribe(
      response => {
        console.log('Respuesta recibida:', response);
        if (response.success) {
          this.token = response.token; // almacenar el token en la variable token
          localStorage.setItem('token', response.token);
          localStorage.setItem('userRole', response.role);
          
          // Almacenar la información del usuario
          this.userProfile = response.user; // Almacenar el nombre de usuario y el email
          
          // Verificar si userProfile no es null antes de actualizar
          if (this.userProfile) {
            this.userService.updateUserProfile(this.userProfile); // Actualizar el perfil del usuario en el servicio
          }
          
          this.activeModal.close();
          this.openTokenModal();
          this.router.navigate(['/menu']);
        } else {
          alert('Nombre de usuario o contraseña incorrectos');
        }
      },
      error => {
        console.error('Error en la solicitud de inicio de sesión:', error);
        alert('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    );
  }

  loginWithGoogle() {
    this.authGoogleService.login().then((googleUser: any) => {
      if (googleUser) {
        const email = googleUser.email;
        const name = googleUser.name;
        this.http.post<any>('http://localhost:3000/api/loginOrRegisterWithGoogle', { email, name }).subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            this.activeModal.close();
            this.router.navigate(['/menu']);
          },
          error: (error: any) => {
            console.error('Error al iniciar sesión con Google:', error);
            alert('Error al iniciar sesión con Google.');
          }
        });
      }
    }).catch((error: any) => {
      console.error('Error al iniciar sesión con Google:', error);
      alert('Error al iniciar sesión con Google.');
    });
  }

  loginWithDiscord() {
    this.authDiscordService.login();
  }

  closeModal() {
    this.activeModal.close();
  }

  openTokenModal() {
    const modalRef = this.modalService.open(TokenModalComponent);
    modalRef.componentInstance.token = this.token;
  }
}