import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostService } from '../post.service';

import { WoofComponent } from './woof.component';

describe('WoofComponent', () => {
  let component: WoofComponent;
  let fixture: ComponentFixture<WoofComponent>;

  class MockPostService {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WoofComponent],
      providers: [{ provides: PostService, useclass: MockPostService }],
    }).compileComponents();
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
