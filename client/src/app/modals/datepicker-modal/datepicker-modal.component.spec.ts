import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerModalComponent } from './datepicker-modal.component';

describe('DatepickerModalComponent', () => {
  let component: DatepickerModalComponent;
  let fixture: ComponentFixture<DatepickerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatepickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
