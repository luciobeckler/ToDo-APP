import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { TaskDetailModalComponent } from './components/task-detail-modal/task-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    ClickOutsideDirective,
    TaskBoardComponent,
    NewTaskModalComponent,
    TaskDetailModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
