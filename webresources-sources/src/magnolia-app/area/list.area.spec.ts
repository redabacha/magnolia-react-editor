import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAreaComponent } from './list-area.component';

describe('ListAreaComponent', () => {
  let component: ListAreaComponent;
  let fixture: ComponentFixture<ListAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
