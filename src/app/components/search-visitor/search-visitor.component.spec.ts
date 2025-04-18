import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVisitorComponent } from './search-visitor.component';

describe('SearchVisitorComponent', () => {
  let component: SearchVisitorComponent;
  let fixture: ComponentFixture<SearchVisitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchVisitorComponent]
    });
    fixture = TestBed.createComponent(SearchVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
