import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { MgnlPageComponent } from './mgnl-page.component';
import { EditorContextService } from '../services/editor-context.service';
import { CommentComponent } from '../comment/comment.component';

describe('MagnoliaPageComponent', () => {
  let component: MgnlPageComponent;
  let fixture: ComponentFixture<MgnlPageComponent>;
  let service: EditorContextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent, MgnlPageComponent ],
      providers: [ EditorContextService ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgnlPageComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(EditorContextService);
    fixture.detectChanges();
  });

  it('should generate page greenbar', () => {
    jest.spyOn(service, 'inEditor').mockReturnValue(true);
    component.ngOnChanges({content: new SimpleChange(null, {}, true)});
    expect(service.inEditor).toHaveBeenCalledTimes(1);
    expect(component.closeComment).toBe('/cms:page');
  });
});
