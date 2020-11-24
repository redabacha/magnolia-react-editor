import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ComponentFactory, ComponentRef, Input, NgModule, SimpleChange, Type } from '@angular/core';

import { AbstractComponent } from './abstract.component';
import { EditorContextService } from '../services/editor-context.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  template: '<ng-container #child></ng-container>'
})
export class TestHostComponent extends AbstractComponent { }

@Component({
  template: ''
})
class DummyComponent {
  @Input() property: string;
  @Input() metadata: object;
}

@NgModule({
  declarations: [ DummyComponent ],
  entryComponents: [ DummyComponent ]
})
class DummyModule { }

class MockComponentRef extends ComponentRef<any> {
  constructor(instance: any) {
    super();
    this.instance = instance;
  }
  readonly changeDetectorRef: any;
  readonly componentType: Type<any>;
  readonly hostView: any;
  readonly injector: any;
  readonly instance: any;
  readonly location: any;
  destroy(): void { }
  onDestroy(callback: () => void): void { }
}

describe('AbstractComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let service: EditorContextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent, TestHostComponent ],
      providers: [ EditorContextService ],
      imports: [ DummyModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(EditorContextService);
    fixture.detectChanges();
  });

  it('should load component dynamically', () => {
    jest.spyOn(service, 'getComponentMapping').mockReturnValue(DummyComponent);
    const resolvedComponentInstance = new DummyComponent();
    function mockGetRef(_: ComponentFactory<any>) : ComponentRef<any> {
      return new MockComponentRef(resolvedComponentInstance);
    }
    jest.spyOn(component.child, 'createComponent').mockImplementationOnce(mockGetRef);
    jest.useFakeTimers();
    const content = {
      'property': 'value',
      'mgnl:template': 'templateId',
    };
    component.ngOnChanges({content: new SimpleChange(null, content, true)});
    jest.runAllTimers();
    expect(component.child.createComponent).toHaveBeenCalledTimes(1);
    expect(resolvedComponentInstance.property).toBe('value');
    expect(resolvedComponentInstance.metadata['mgnl:template']).toBe('templateId');
  });
});
