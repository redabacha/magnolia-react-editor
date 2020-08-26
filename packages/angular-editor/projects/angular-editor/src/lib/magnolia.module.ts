import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Services
import { WindowRefService } from './services/windowref.service';
import { EditorContextService } from './services/editor-context.service';
import { RendererContextService } from './services/renderer-context.service';
// Components
import { EditableArea } from './area/editable-area.component';
import { AbstractComponent } from './abstract/abstract.component';
import { CommentComponent } from './comment/comment.component';
import { EditablePage } from './page/editable-page.component';
import { EditableComponent } from './component/editable-component.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AbstractComponent,
    EditablePage,
    EditableComponent,
    EditableArea,
    CommentComponent
  ],
  providers: [
    WindowRefService,
    EditorContextService,
    RendererContextService
  ],
  exports: [
    EditableArea,
    EditableComponent,
    EditablePage,
    CommentComponent
  ],
})
export class MagnoliaModule { }
