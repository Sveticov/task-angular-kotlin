import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsGeneralComponent } from './months-general.component';

describe('MonthsGeneralComponent', () => {
  let component: MonthsGeneralComponent;
  let fixture: ComponentFixture<MonthsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthsGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
