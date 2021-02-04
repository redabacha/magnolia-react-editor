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
    service.setTemplateAnnotations({'/0': 'cms:content content=\"website:/0\"'});
    component.content = {'@path' : '/0'};
    expect(service.inEditor).toHaveBeenCalledTimes(1);
    expect(component.openComment).toBe('cms:content content=\"website:/0\"');
    expect(component.closeComment).toBe('/cms:component');
  });
});
