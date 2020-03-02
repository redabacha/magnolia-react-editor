import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Services
import { WindowRefService } from './services/windowref.service';
import { RendererContextService } from './services/renderer-context.service';
// Components
import { MagnoliaAreaComponent } from './area/mgnl-area.component';
import { AbstractComponent } from './abstract/abstract.component';
import { CommentComponent } from './comment/comment.component';
import { MgnlPageComponent } from './page/mgnl-page.component';
import { MagnoliaComponent } from './component/mgnl-component.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AbstractComponent,
    MgnlPageComponent,
    MagnoliaComponent,
    MagnoliaAreaComponent,
    CommentComponent
  ],
  providers: [
    WindowRefService,
    RendererContextService
  ],
  exports: [
    MgnlPageComponent,
    MagnoliaAreaComponent
  ],
})
export class MagnoliaModule { }
