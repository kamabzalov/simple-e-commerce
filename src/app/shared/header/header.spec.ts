import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { TranslateService } from '@ngx-translate/core';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  const translateServiceMock = {
    getCurrentLang: vi.fn().mockReturnValue('en'),
    use: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize lang from translate service', () => {
    expect(component['lang']()).toBe('en');
  });

  it('should set current language', () => {
    component['changeLanguage']('ru');
    fixture.detectChanges();
    expect(component['lang']()).toEqual('ru');
    expect(translateServiceMock.use).toHaveBeenCalledWith('ru');
  });
});
