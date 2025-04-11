import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductosService } from './products.service';
import { product } from '../interface/productos';

describe('ProductosService', () => {
  let service: ProductosService;
  let httpMock: HttpTestingController;

  const mockProducts: product[] = [
    { id: 1, nombre: 'Producto 1', precio: 10, descripcion: '', tipoProducto: '', productoOfrerta: '', img: '' },
    { id: 2, nombre: 'Producto 2', precio: 20, descripcion: '', tipoProducto: '', productoOfrerta: '', img: '' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductosService],
    });

    service = TestBed.inject(ProductosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('debería ser creado correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener productos desde la API', () => {
    service.obtenerProductos().subscribe((productos) => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/productos');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('debería cargar productos y actualizar la señal', () => {
    service.loadProducts();

    const req = httpMock.expectOne('http://localhost:5000/api/productos');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    const currentProducts = service.products();
    expect(currentProducts).toEqual(mockProducts);
  });

  it('debería agregar un nuevo producto y actualizar la señal', () => {
    const nuevoProducto: product = {
      id: 3,
      nombre: 'Producto nuevo',
      precio: 30,
      descripcion: 'Ropa nueva',
      tipoProducto: 'calzado',
      productoOfrerta: '',
      img: 'url-imagen.jpg',
    };

    const respuestaMock = { message: 'Producto creado', product: nuevoProducto };

    service.products.set(mockProducts); // Establece los productos actuales

    service.addProduct(nuevoProducto);

    const req = httpMock.expectOne('http://localhost:5000/api/productos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevoProducto);

    req.flush(respuestaMock); // Emula respuesta de la API

    const productosActualizados = service.products();
    expect(productosActualizados.length).toBe(3);
    expect(productosActualizados.find(p => p.id === 3)).toEqual(nuevoProducto);
  });
});
