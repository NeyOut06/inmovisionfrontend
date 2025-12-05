import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from '../../services/login-service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    MatSidenavModule,
    MatExpansionModule,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {
  role: string = '';
  usuario: string = '';
  collapsed = false;

  constructor(
    public loginService: LoginService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.role = this.loginService.showRole();
    this.usuario =
      (this.loginService as any).showUser?.() || sessionStorage.getItem('username') || '';
  }

  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['/homes']).then(() => {
      window.location.reload();
    });
  }

  verificar() {
    this.role = this.loginService.showRole();
    this.usuario =
      (this.loginService as any).showUser?.() || sessionStorage.getItem('username') || '';
    return this.loginService.verificar();
  }

  
}
