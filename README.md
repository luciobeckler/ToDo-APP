
# ToDo-APP

Aplicação front-end desenvolvida com Angular para consumo da [ToDo-API](https://github.com/luciobeckler/ToDo-API), permitindo o gerenciamento de tarefas de forma prática e intuitiva.


## Interface
### Home
![image](https://github.com/user-attachments/assets/c94003de-0fee-4e0f-9142-c2fa538491c4)
### Modal de adição de tarefas
![image](https://github.com/user-attachments/assets/c9c157e3-08b0-47df-9f56-531d237a60ec)
### Modal de gerenciamento de grupos
![image](https://github.com/user-attachments/assets/43ac5d1e-c5c8-4786-806c-af4e180971b7)

## Como rodar o projeto

1. Clone o repositório

```bash
git clone https://github.com/luciobeckler/ToDo-APP
cd ToDo-APP    
```

2. Com o back-end rodando, verifique a porta utilizada pelo swagger para disponibilizar a API, vá em constantes/constantes.ts e altere verifique se o número da porta corresponde.
```bash
export const apiUrl: string = 'https://localhost:NumeroPorta/api';
},
```

3. Instale os node_modules
```bash
npm install
```

4. Execute a aplicação
```bash
ng serve
```

5. Acesse a url disponibilizada no terminal, normalmente "http://localhost:4200/"
