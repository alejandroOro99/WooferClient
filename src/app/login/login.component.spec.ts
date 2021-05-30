import {
  ComponentFixture,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../login.service';
import { User } from '../user';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let loginService: LoginService;
  let router: Router;

  class MockLoginService {
    login(): any {}
  }

  function pressTheButton(): void {
    fixture.debugElement.query(By.css('button')).nativeElement.click();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: LoginService, useClass: MockLoginService }],
      declarations: [LoginComponent],
      imports: [RouterTestingModule.withRoutes([]), FormsModule],
    }).compileComponents();
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'calls route.navigate successfully',
    waitForAsync(() => {
      component.username = 'The Maharajah of Mash';
      component.password = 'The Rajah of Rap';
      spyOn(loginService, 'login').and.returnValue(
        new Observable<User>((o) => {
          o.next({
            id: 1,
            username: 'username',
            password: 'password',
            name: 'name',
            email: 'email',
            dob: 'dob',
            phone: 'phone',
          });
        })
      );
      spyOn(router, 'navigate');
      pressTheButton();
      fixture.whenStable().then(() => {
        expect(router.navigate).toHaveBeenCalled();
        expect(loginService.login).toHaveBeenCalledTimes(1);
        expect(component.errorState).toBeFalse();
      });
    })
  );

  it(
    'rejects bad login',
    waitForAsync(() => {
      component.username = 'The Behemoth of Bust';
      component.password = 'Blunderbuss';
      spyOn(loginService, 'login').and.returnValue(
        new Observable<User>((o) => {
          throwError(new Error('test error'));
          o.next(null);
        })
      );
      spyOn(router, 'navigate');
      pressTheButton();
      fixture.whenStable().then(() => {
        expect(router.navigate).not.toHaveBeenCalled();
        expect(loginService.login).toHaveBeenCalledTimes(1);
        expect(component.errorState).toBeTrue();
      });
    })
  );

  it(
    'rejects no username',
    waitForAsync(() => {
      component.username = '';
      component.password = 'The Wali of Wallop';
      spyOn(loginService, 'login');
      spyOn(router, 'navigate');
      pressTheButton();
      fixture.whenStable().then(() => {
        expect(router.navigate).not.toHaveBeenCalled();
        expect(loginService.login).not.toHaveBeenCalled();
        expect(component.errorState).toBeTrue();
      });
    })
  );

  it(
    'rejects no password',
    waitForAsync(() => {
      component.username = 'The Wizard of Whack';
      component.password = '';
      spyOn(loginService, 'login');
      spyOn(router, 'navigate');
      pressTheButton();
      fixture.whenStable().then(() => {
        expect(router.navigate).not.toHaveBeenCalled();
        expect(loginService.login).not.toHaveBeenCalled();
        expect(component.errorState).toBeTrue();
      });
    })
  );
});
