import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {
    id: 1,
    name: '',
    price: 0,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.readById(id).subscribe(product => {
      this.product = product
    });
  }

  deleteProduct(): void {
    if (this.product.id == undefined) {
      throw new Error('Falha ao encontrar id do produto');
    }

    this.productService.delete(this.product.id).subscribe((product) => {
      this.productService.showMessage('Produto excluido com sucesso');
      this.product = product
    });
    this.router.navigate(['/products'])
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
