import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimetablesPage } from './timetables.page';

describe('TimetablesPage', () => {
  let component: TimetablesPage;
  let fixture: ComponentFixture<TimetablesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TimetablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
