import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { SignupService } from '../signup.service';
import { User } from '../user';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  class MockService {
    addUser(): any {}
    getUserByEmail(): any {}
    getUserByUsername(): any {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: SignupService, useClass: MockService }],
      declarations: [SignupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
