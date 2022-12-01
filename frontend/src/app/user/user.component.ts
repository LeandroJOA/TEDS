import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  putOrPost: boolean
  userDialogo: boolean;
  submetido: boolean;
  users: any = [];
  user: any = {};
  
  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.pesquisarUsers();
  }

  limparCampos() {
    this.user = {
      id: '',
      username: '',
      password: '',
      role: '',
    }
  }

  pesquisarUsers() {
    this.limparCampos();
    this.http.get(`http://localhost:8080/users`)
      .subscribe(resultado => {
        this.users = resultado
      });
  }

  criarUser() {
    this.putOrPost = false;
    this.submetido = false;
    this.userDialogo = true;
  }

  editUser(user) {
    this.putOrPost = true;
    this.userDialogo = true;

    this.user.id = user.id
    this.user.username = user.username
    this.user.password = user.password
    this.user.role = user.role
  }

  deleteUser(user) {
    this.confirmationService.confirm({
      message: 'Tem certeza que gostaria de remover esse usuario ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`http://localhost:8080/users/${user.id}`)
          .subscribe(
            resultado => {
              this.pesquisarUsers();
            }
          );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Deletado!', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.limparCampos()
    this.userDialogo = false;
    this.submetido = false;
  }

  saveUser() {
    this.submetido = true;

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(this.user);

    if (this.user.username !== '' && this.user.password !== '' && this.user.role !== '') {
      if (this.putOrPost) {
        const { id } = this.user

        this.http.put<any>(`http://localhost:8080/users/${id}`, body, { headers })
          .subscribe(
            () => {
              this.pesquisarUsers();
            });
        this.hideDialog();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Atualizado!', life: 3000 });
      }
      else {
        this.http.post<any>('http://localhost:8080/users', body, { headers })
          .subscribe(() => {
            this.pesquisarUsers();
          });
        this.hideDialog()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Criado!', life: 3000 });
      }
    }
  }
}
