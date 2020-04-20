import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { EditablePage } from './editable-page.component';
import { EditorContextService } from '../services/editor-context.service';
import { CommentComponent } from '../comment/comment.component';

describe('EditablePage', () => {
  let component: EditablePage;
  let fixture: ComponentFixture<EditablePage>;
  let service: EditorContextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent, EditablePage ],
      providers: [ EditorContextService ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditablePage);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(EditorContextService);
    fixture.detectChanges();
  });

  it('should generate page greenbar', () => {
    jest.spyOn(service, 'inEditor').mockReturnValue(true);
    component.content = {}
    expect(service.inEditor).toHaveBeenCalledTimes(1);
    expect(component.closeComment).toBe('/cms:page');
  });
});
