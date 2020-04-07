import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableArea } from './editable-area.component';
import { CommentComponent } from '../comment/comment.component';
import { EditableComponent } from '../component/editable-component.component';
import { EditorContextService } from '../services/editor-context.service';

describe('EditableArea', () => {
  let component: EditableArea;
  let fixture: ComponentFixture<EditableArea>;
  let service: EditorContextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent, EditableComponent, EditableArea ],
      providers: [ EditorContextService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableArea);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(EditorContextService);
    fixture.detectChanges();
  });

  it('should get area components', () => {
    component.name = 'area-node';
    component.content = {'area-node': {'component-node': {'@nodeType': 'mgnl:component'}, '@nodes': ['component-node']}};
    fixture.detectChanges();
    expect(component.components.length).toBe(1);
  });

  it('should not fail on non-existing areas', () => {
    component.name = 'area-node';
    component.content = {};
    fixture.detectChanges();
    expect(component.components.length).toBe(0);
  });

  it('should generate area greenbar', () => {
    jest.spyOn(service, 'inEditor').mockReturnValue(true);
    component.content = {};
    expect(service.inEditor).toHaveBeenCalledTimes(1);
    expect(component.closeComment).toBe('/cms:area');
  });
});
