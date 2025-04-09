import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
    declarations: [
        AppComponent,
        InicioComponent,
        MenuComponent
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
