import { Component, OnInit } from '@angular/core';
import { JwtRequestDTO } from '../../models/jwtRequestDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login-service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-autenticador',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './autenticador.html',
  styleUrl: './autenticador.css',
})
export class Autenticador implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void {}
  login() {
    let request = new JwtRequestDTO();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigateByUrl('/homes');
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['registro']);
  }
}