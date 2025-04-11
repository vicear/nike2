import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component'; 
import { ProductosService } from '../../services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


//codigo-testing
describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockService: jasmine.SpyObj<ProductosService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ProductosService', ['addProduct', 'uploadImage']);
    mockService.uploadImage.and.returnValue(Promise.resolve('http://fakeurl.com/image.jpg'));

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: ProductosService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    expect(component.MyNewForm.value).toEqual({
      id: 0,
      nombre: '',
      precio: '',
      descripcion: '',
      tipoProducto: '',
      productoOferta: false,
      img: ''
    });
  });

  it('debería marcar inválido el formulario si los campos obligatorios están vacíos', () => {
    component.MyNewForm.patchValue({
      id: '',
      nombre: '',
      precio: '',
      tipoProducto: ''
    });
    expect(component.MyNewForm.valid).toBeFalsy();
  });

  it('debería marcar válido el formulario si los campos obligatorios están completos', () => {
    component.MyNewForm.patchValue({
      id: 1,
      nombre: 'Zapatillas Nike',
      precio: '120',
      tipoProducto: 'Deporte'
    });
    expect(component.MyNewForm.valid).toBeTruthy();
  });

  it('debería llamar a uploadImage y addProduct al enviar el formulario', async () => {
    component.MyNewForm.patchValue({
      id: 1,
      nombre: 'Zapatillas Nike',
      precio: '120',
      tipoProducto: 'Deporte'
    });

    component.selectedFile = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });

    await component.onSubmit();

    expect(mockService.uploadImage).toHaveBeenCalled();
    expect(mockService.addProduct).toHaveBeenCalledWith({
      id: 1,
      nombre: 'Zapatillas Nike',
      precio: 120,
      descripcion: '',
      tipoProducto: 'Deporte',
      productoOfrerta: '',
      img: 'http://fakeurl.com/image.jpg'
    });
  });

  it('no debería llamar a addProduct si el formulario es inválido', async () => {
    component.MyNewForm.patchValue({
      id: '',
      nombre: '',
      precio: '',
      tipoProducto: ''
    });

    await component.onSubmit();

    expect(mockService.addProduct).not.toHaveBeenCalled();
  });
});