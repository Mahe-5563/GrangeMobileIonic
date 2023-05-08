import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TweetsPage } from './tweets.page';

describe('TweetsPage', () => {
  let component: TweetsPage;
  let fixture: ComponentFixture<TweetsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TweetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
