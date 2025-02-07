import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Lector2 {
  IdLector: number;
  NombreUsuario: string;
  Contrasena: string;
  NombreCompleto: string;
  Correo: string;
}

@Component({
  selector: 'app-lectores2',
  templateUrl: './lectores2.component.html',
  styleUrls: ['./lectores2.component.css']
})
export class Lectores2Component implements OnInit {
  lectores: Lector2[] = [];
  nuevoLector: Lector2 = { IdLector: 0, NombreUsuario: '', Contrasena: '', NombreCompleto: '', Correo: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerLectores();
  }

  obtenerLectores() {
    this.http.get<Lector2[]>('http://localhost:3000/api/lectores2').subscribe(data => {
      this.lectores = data;
    });
  }

  agregarLector() {
    this.http.post('http://localhost:3000/api/lectores2', this.nuevoLector).subscribe(() => {
      this.obtenerLectores();
      this.nuevoLector = { IdLector: 0, NombreUsuario: '', Contrasena: '', NombreCompleto: '', Correo: '' };
    });
  }

  editarLector(lector: Lector2) {
    this.http.put(`http://localhost:3000/api/lectores2/${lector.IdLector}`, lector).subscribe(() => {
      this.obtenerLectores();
    });
  }

  eliminarLector(id: number) {
    this.http.delete(`http://localhost:3000/api/lectores2/${id}`).subscribe(() => {
      this.obtenerLectores();
    });
  }
}