import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Renderer2, Type } from '@angular/core';

import { EditorContextService } from '../services/editor-context.service';
import { CommentComponent } from './comment.component';

@Component({
  template: `<mgnl-comment [text]="'foo'"></mgnl-comment>`
})
export class TestHostComponent {}

describe('CommentComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let service: EditorContextService;
  let renderer: Renderer2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, CommentComponent ],
      providers: [ EditorContextService, Renderer2 ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(EditorContextService);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
  });

  it('should be replaced with html comment', async(() => {
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('<!-- foo -->');
  }));
});
