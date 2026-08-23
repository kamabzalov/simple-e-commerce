import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideTranslateService()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const translateService = TestBed.inject(TranslateService);
    const translateAddLangsSpy = vi.spyOn(translateService, 'addLangs');

    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
    expect(translateAddLangsSpy).toHaveBeenCalledWith(['en', 'ru']);
  });
});
