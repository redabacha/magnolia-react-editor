import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';

import { AbstractComponent } from './abstract.component';
import { RendererContextService } from '../services/renderer-context.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  template: '<ng-container #child></ng-container>'
})
export class TestHostComponent extends AbstractComponent {}

@Component({
  template: ''
})
class DummyComponent { }

@NgModule({
  declarations: [ DummyComponent ],
  entryComponents: [ DummyComponent ]
})
class DummyModule { }

describe('AbstractComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let service: RendererContextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent, TestHostComponent ],
      providers: [ RendererContextService ],
      imports: [ DummyModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RendererContextService);
    fixture.detectChanges();
  });

  it('should load component dynamically', () => {
    jest.spyOn(service, 'getComponentMapping').mockReturnValue(DummyComponent);
    component.content = {
      'mgnl:template': 'templateId',
    };
    fixture.detectChanges();
    expect(service.getComponentMapping).toHaveBeenCalledTimes(1);
  });
});
