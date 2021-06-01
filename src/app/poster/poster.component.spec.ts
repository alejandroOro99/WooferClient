import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';

import { PosterComponent } from './poster.component';

describe('PosterComponent', () => {
  let component: PosterComponent;
  let fixture: ComponentFixture<PosterComponent>;

  let postService: PostService;

  class MockPostService {
    getAll(): any {}
    post(): any {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [{ provide: PostService, useClass: MockPostService }],
      declarations: [PosterComponent],
    }).compileComponents();
    postService = TestBed.inject(PostService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doesnt exist with no user', () => {
    expect(fixture.debugElement.query(By.css('table'))).toBeNull();
    component.userExists = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('table'))).not.toBeNull();
    component.userExists = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('table'))).toBeNull();
  });

  it('only has the button when there is content', () => {
    component.userExists = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button'))).toBeNull();
    component.body = 'The Sachem of Slug';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button'))).not.toBeNull();
    component.body = '';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button'))).toBeNull();
  });

  it(
    'submits',
    waitForAsync(() => {
      component.userExists = true;
      component.body = 'The Prince of Pounders';
      spyOn(postService, 'post').and.returnValue(
        new Observable((o) => o.next(new Post()))
      );
      fixture.detectChanges();
      fixture.debugElement.query(By.css('button')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(postService.post).toHaveBeenCalledWith('The Prince of Pounders');
      });
    })
  );
});
