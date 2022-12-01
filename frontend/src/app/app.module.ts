import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

import { AppComponent } from './app.component';

import { AnimeComponent } from './anime/anime.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'animes', component: AnimeComponent },
  { path: 'users', component: UserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AnimeComponent,
    HomeComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    HttpClientModule,
    InputTextModule,
    ConfirmPopupModule,
    InputTextareaModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastModule,
    CarouselModule,
    InputNumberModule,
    RatingModule,
    FieldsetModule,
    CardModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
