import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnoliaAreaComponent } from './mgnl-area.component';
import { CommentComponent } from '../comment/comment.component';
import { MagnoliaComponent } from '../component/mgnl-component.component';
import { RendererContextService } from '../services/renderer-context.service';

describe('MagnoliaAreaComponent', () => {
  let component: MagnoliaAreaComponent;
  let fixture: ComponentFixture<MagnoliaAreaComponent>;
  let service: RendererContextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent, MagnoliaComponent, MagnoliaAreaComponent ],
      providers: [ RendererContextService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnoliaAreaComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RendererContextService);
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
