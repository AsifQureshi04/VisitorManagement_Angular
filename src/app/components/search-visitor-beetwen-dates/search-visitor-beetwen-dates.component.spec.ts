import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVisitorBeetwenDatesComponent } from './search-visitor-beetwen-dates.component';

describe('SearchVisitorBeetwenDatesComponent', () => {
  let component: SearchVisitorBeetwenDatesComponent;
  let fixture: ComponentFixture<SearchVisitorBeetwenDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchVisitorBeetwenDatesComponent]
    });
    fixture = TestBed.createComponent(SearchVisitorBeetwenDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
