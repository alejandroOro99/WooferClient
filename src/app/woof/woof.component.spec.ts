import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoofComponent } from './woof.component';

describe('WoofComponent', () => {
  let component: WoofComponent;
  let fixture: ComponentFixture<WoofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WoofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
