import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Post } from '../post';

import { FeedComponent } from './feed.component';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [FeedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create no child posts', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-post'))).toBeFalsy;
  });

  it('should create 2 child posts', () => {
    component.posts = [new Post(), new Post()];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('app-post')).length).toEqual(2);
  });
});
