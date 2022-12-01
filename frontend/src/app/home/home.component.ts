import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  putOrPost: boolean
  animeDialogo: boolean;
  submetido: boolean;
  animes: any = [];
  fotos: any = [];
  anime: any = {};

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pesquisarAnime()

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

  pesquisarAnime() {
    this.http.get(`https://api.jikan.moe/v4/top/anime`)
      .subscribe(resultado => {
        this.animes = resultado;
      });
  }

  includeAnime(anime) {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      id: anime.mal_id,
      title: anime.title,
      score: 0,
      status: "Planejando",
      progress: 0,
    }
    
    this.confirmationService.confirm({
      message: 'Deseja adicionar esse anime a sua lista?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.post<any>('http://localhost:8080/animes', body, { headers })
          .subscribe((result) => {
            console.log(result);
          
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Anime adicionado a sua lista!', life: 3000 });
      }
    });
  }
}

