import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { MgnlPageComponent } from './mgnl-page.component';
import { RendererContextService } from '../services/renderer-context.service';
import { CommentComponent } from '../comment/comment.component';

describe('MagnoliaPageComponent', () => {
  let component: MgnlPageComponent;
  let fixture: ComponentFixture<MgnlPageComponent>;
  let service: RendererContextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent, MgnlPageComponent ],
      providers: [ RendererContextService ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgnlPageComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RendererContextService);
    fixture.detectChanges();
  });

  it('should generate page greenbar', () => {
    jest.spyOn(service, 'isEditMode').mockReturnValue(true);
    component.ngOnChanges({content: new SimpleChange(null, {}, true)});
    expect(service.isEditMode).toHaveBeenCalledTimes(1);
    expect(component.closeComment).toBe('/cms:page');
  });
});
