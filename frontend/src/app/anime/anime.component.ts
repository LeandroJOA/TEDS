import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  providers: [MessageService, ConfirmationService]
})
export class AnimeComponent implements OnInit {

  animeDialogo: boolean;
  submetido: boolean;
  animes: any = [];
  anime: any = {};
  status: any = [];
  fotos: any = [];

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pesquisarAnime()

    this.status = [
      { label: 'Planejando', value: 'Planejando' },
      { label: 'Assistindo', value: 'Assistindo' },
      { label: 'Em Espera', value: 'Em Espera' },
      { label: 'Finalizado', value: 'Finalizado' }
    ];

    this.fotos = [
      { name: 'assets/miniatura01.jpg' },
      { name: 'assets/miniatura02.jpg' },
      { name: 'assets/miniatura03.jpg' },
      { name: 'assets/miniatura04.jpg' },
      { name: 'assets/miniatura07.jpg' },
      { name: 'assets/miniatura08.jpg' },
      { name: 'assets/miniatura09.jpg' },
      { name: 'assets/miniatura10.jpg' },
      { name: 'assets/miniatura11.jpg' },
      { name: 'assets/miniatura00.jpg' }
    ];
  }

  limparCampos() {
    this.anime = {
      id: '',
      title: '',
      status: '',
      socre: 0
    }
  }

  pesquisarAnime() {
    this.limparCampos();
    this.http.get(`http://localhost:8080/animes`)
      .subscribe(resultado => this.animes = resultado);
  }

  editAnime(anime) {
    this.animeDialogo = true;

    this.anime.id = anime.id;
    this.anime.status = anime.status
    this.anime.score = anime.score
    this.anime.progress = anime.progress
  }

  deleteAnime(anime) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`http://localhost:8080/animes/${anime.id}`)
          .subscribe(
            resultado => {
              this.pesquisarAnime();
            }
          );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Anime Deletado!', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.limparCampos()
    this.animeDialogo = false;
    this.submetido = false;
  }

  saveAnime() {
    this.submetido = true;

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(this.anime);

    const { id } = this.anime;

    this.http.put<any>(`http://localhost:8080/animes/${id}`, body, { headers })
      .subscribe(
        () => {
          this.pesquisarAnime();
        });
    this.hideDialog();
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Anime Atualizado!', life: 3000 });
  }
}
