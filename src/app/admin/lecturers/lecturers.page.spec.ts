import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LecturersPage } from './lecturers.page';

describe('LecturersPage', () => {
  let component: LecturersPage;
  let fixture: ComponentFixture<LecturersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LecturersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
