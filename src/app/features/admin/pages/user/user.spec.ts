import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetails } from './user';
import { UserService } from '../../services/user/user';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

describe('UserDetails', () => {
  let component: UserDetails;
  let fixture: ComponentFixture<UserDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetails],
      providers: [provideRouter([]), provideTranslateService()],
    })
      .overrideComponent(UserDetails, {
        set: {
          providers: [
            {
              provide: UserService,
              useValue: {
                getById: () => Promise.resolve({}),
              },
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
