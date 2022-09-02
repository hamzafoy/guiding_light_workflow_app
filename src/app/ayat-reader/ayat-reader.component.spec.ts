import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyatReaderComponent } from './ayat-reader.component';

describe('AyatReaderComponent', () => {
  let component: AyatReaderComponent;
  let fixture: ComponentFixture<AyatReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AyatReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AyatReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
