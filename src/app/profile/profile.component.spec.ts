import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { FollowService } from '../follow.service';
import { SignupService } from '../signup.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let signupService: SignupService;

  class MockFollowService {}
  class MockSignupService {
    getUserByUsername(): any {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: FollowService, useClass: MockFollowService },
        { provide: SignupService, useClass: MockSignupService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ username: 'toasters' }) },
          },
        },
      ],
      imports: [FormsModule],
      declarations: [ProfileComponent],
    }).compileComponents();
    signupService = TestBed.inject(SignupService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    spyOn(signupService, 'getUserByUsername');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
