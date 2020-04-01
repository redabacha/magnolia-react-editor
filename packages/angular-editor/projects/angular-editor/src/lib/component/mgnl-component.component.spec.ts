import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { EditorContextService } from '../services/editor-context.service';
import { MagnoliaComponent } from './mgnl-component.component';
import { CommentComponent } from '../comment/comment.component';

describe('MagnoliaComponent', () => {
  let component: MagnoliaComponent;
  let fixture: ComponentFixture<MagnoliaComponent>;
  let service: EditorContextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent, MagnoliaComponent ],
      providers: [ EditorContextService ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnoliaComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(EditorContextService);
  });

  it('should generate component greenbar', () => {
    jest.spyOn(service, 'inEditor').mockReturnValue(true);
    component.content = {};
    component.ngOnChanges({content: new SimpleChange(null, {}, true)});
    expect(service.inEditor).toHaveBeenCalledTimes(1);
    expect(component.closeComment).toBe('/cms:component');
  });
});
