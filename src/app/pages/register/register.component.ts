import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { RegisterUser } from '../../models/registerUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  senha: string = '';
  senhaError: boolean = false;
  registerError: string = '';

  constructor(private router: Router, private accountService: AccountService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.senhaError = !this.validateSenha(this.senha);

    if (!this.senhaError) {
      let data: RegisterUser = {
        Email: this.email,
        Senha: this.senha,
      };

      this.accountService.createUser(data).subscribe({
        next: () => {
          alert('Conta criada com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.error == 'E-mail já está em uso.')
            this.registerError = `Falha no registro. E-mail já está em uso.`;
          else this.registerError = 'Erro interno.';
          console.error(err);
        },
      });
    }
  }

  validateSenha(senha: string): boolean {
    const minLength = senha.length >= 8;
    const hasUpper = /[A-Z]/.test(senha);
    const hasSymbol = /[^A-Za-z0-9]/.test(senha);
    return minLength && hasUpper && hasSymbol;
  }
}
