import { Component, OnInit } from '@angular/core';
import { UserService } from '../home/login2/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userProfile: { username: string; email: string } | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUserProfile.subscribe(profile => {
      this.userProfile = profile; // Obtener el perfil del usuario
    });
  }
}
