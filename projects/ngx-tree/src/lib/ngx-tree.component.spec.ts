import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTreeComponent } from './ngx-tree.component';

describe('NgxTreeComponent', () => {
  let component: NgxTreeComponent;
  let fixture: ComponentFixture<NgxTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
