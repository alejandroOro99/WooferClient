import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggedUserService } from '../logged-user.service';
import { LoginService } from '../login.service';

import { LoginComponent } from './login.component';

class mockLoginService {
  login() {}
}

class mockLoggedUserService {
  username: string;
  name: string;
  id: number;
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: LoginService, useClass: mockLoginService },
        { provide: LoggedUserService, useClass: mockLoggedUserService },
      ],
      declarations: [LoginComponent],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
