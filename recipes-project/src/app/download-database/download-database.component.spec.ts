import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDatabaseComponent } from './download-database.component';

describe('DownloadDatabaseComponent', () => {
  let component: DownloadDatabaseComponent;
  let fixture: ComponentFixture<DownloadDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
