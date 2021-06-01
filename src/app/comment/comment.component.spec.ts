import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  class MockCommentService {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent],
      providers: [{ provide: CommentService, useclass: MockCommentService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = new Comment();
    component.comment.timestamp = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
