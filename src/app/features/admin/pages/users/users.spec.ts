import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Users } from './users';
import { provideTranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user/user';
import { provideRouter } from '@angular/router';

describe('Users', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users],
      providers: [provideTranslateService(), provideRouter([])],
    })
      .overrideComponent(Users, {
        set: {
          providers: [{ provide: UserService, useValue: { getAll: () => Promise.resolve([]) } }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
