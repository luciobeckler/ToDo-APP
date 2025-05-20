import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { RegisterUser } from '../../models/registerUser';

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
  senha: string = '';
  senhaError: boolean = false;
  loginError: string = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    this.senhaError = this.senha.length < 8;

    if (!this.senhaError) {
      let data: RegisterUser = {
        Email: this.email,
        Senha: this.senha,
      };

      this.accountService.loginUser(data).subscribe({
        next: () => {
          this.router.navigate(['/inicio']);
        },
        error: (err: any) => {
          this.loginError = 'Falha no login. Verifique suas credenciais.';
          alert('Falha no login. Verifique suas credenciais.');
          console.error(err);
        },
      });
    }
  }
}
