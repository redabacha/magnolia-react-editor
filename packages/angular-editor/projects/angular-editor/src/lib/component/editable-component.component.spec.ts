import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorContextService } from '../services/editor-context.service';
import { EditableComponent } from './editable-component.component';
import { CommentComponent } from '../comment/comment.component';

describe('EditableComponent', () => {
  let component: EditableComponent;
  let fixture: ComponentFixture<EditableComponent>;
  let service: EditorContextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent, EditableComponent ],
      providers: [ EditorContextService ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(EditorContextService);
  });

  it('should generate component greenbar', () => {
    jest.spyOn(service, 'inEditor').mockReturnValue(true);
    component.content = {};
    expect(service.inEditor).toHaveBeenCalledTimes(1);
    expect(component.closeComment).toBe('/cms:component');
  });
});
