import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
    declarations: [
        AppComponent,
        InicioComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MatIconModule
    ],
    providers: [
    provideAnimationsAsync('noop')
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
