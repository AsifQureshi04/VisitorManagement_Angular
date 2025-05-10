import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorRequestComponent } from './visitor-request.component';

describe('VisitorRequestComponent', () => {
  let component: VisitorRequestComponent;
  let fixture: ComponentFixture<VisitorRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitorRequestComponent]
    });
    fixture = TestBed.createComponent(VisitorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
