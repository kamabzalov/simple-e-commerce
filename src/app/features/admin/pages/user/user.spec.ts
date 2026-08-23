import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetails } from './user';
import { UserService } from '../../services/user/user';
import { provideRouter, Router } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { RouterTestingHarness } from '@angular/router/testing';

describe('UserDetails', () => {
  let component: UserDetails;
  let fixture: ComponentFixture<UserDetails>;
  let mockUserService: Partial<UserService>;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  const userFormData = {
    id: 1,
    email: 'mail@kamil-abzalov.com',
    phone: '112233',
    username: 'kamabzalov',
    name: { firstname: 'Kamil', lastname: 'Abzalov' },
  };

  const submitUserForm = () => {
    const fakeEvent = { preventDefault: vi.fn() } as unknown as Event;

    component['saveUser'](fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
  };

  beforeEach(async () => {
    mockUserService = {
      getById: vi.fn(),
      update: vi.fn(),
      add: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserDetails],
      providers: [
        provideRouter([
          {
            path: 'users/:id',
            component: UserDetails,
          },
        ]),
        provideTranslateService(),
      ],
    })
      .overrideComponent(UserDetails, {
        set: {
          providers: [
            {
              provide: UserService,
              useValue: mockUserService,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetails);
    component = fixture.componentInstance;

    const router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new user', () => {
    component['userFormModel'].set({
      ...userFormData,
      id: 0,
    });

    mockUserService.add = vi.fn().mockReturnValue(
      of({
        ...userFormData,
        id: 1,
      })
    );

    submitUserForm();

    expect(mockUserService.add).toHaveBeenCalled();
    expect(mockUserService.update).not.toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['admin', 'dashboard', 'users']);
  });

  it('should update existing user', () => {
    component['userFormModel'].set(userFormData);

    mockUserService.update = vi.fn().mockReturnValue(of(userFormData));

    submitUserForm();

    expect(mockUserService.update).toHaveBeenCalled();
    expect(mockUserService.add).not.toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['admin', 'dashboard', 'users']);
  });

  it('should get user data by id and fill form model', async () => {
    const user = {
      id: 1,
      email: 'mail@kamil-abzalov.com',
      phone: '112233',
      username: 'kamabzalov',
      name: { firstname: 'Kamil', lastname: 'Abzalov' },
    };

    mockUserService.getById = vi.fn().mockReturnValue(of(user));
    const harness = await RouterTestingHarness.create();

    const component = await harness.navigateByUrl(`/users/1`, UserDetails);

    expect(mockUserService.getById).toHaveBeenCalledWith(1);
    expect(component['userFormModel']()).toEqual({
      id: 1,
      email: 'mail@kamil-abzalov.com',
      phone: '112233',
      username: 'kamabzalov',
      name: { firstname: 'Kamil', lastname: 'Abzalov' },
    });
  });
});
