import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private accountService: AccountService) {}
  ngOnInit(): void {
    console.log('Login renderizado');
  }

  email: string = '';
  password: string = '';
  passwordError: boolean = false;
  loginError: string = '';

  onSubmit(event: Event): void {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    this.passwordError = this.password.length < 8;

    if (!this.passwordError) {
      this.accountService
        .loginUser({ Email: this.email, Senha: this.password })
        .subscribe({
          next: () => {
            this.router.navigate(['/inicio']);
          },
          error: (err: any) => {
            this.loginError = 'Falha no login. Verifique suas credenciais.';
            console.error(err);
          },
        });
    }
  }
}
