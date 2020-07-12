import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreExplorerPage } from './store-explorer.page';

describe('StoreExplorerPage', () => {
  let component: StoreExplorerPage;
  let fixture: ComponentFixture<StoreExplorerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreExplorerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreExplorerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
