import { Injectable } from '@angular/core';
import {Order} from "../model/order.model";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";

const url = '/api/orders';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient, private tokenService: TokenService<Order>) { }

  getOrderById(id: number): Observable<Order> {
    return this.tokenService.get(`${url}/${id}`);
  }

  getOrders(): Observable<Order[]> {
    return this.tokenService.get(url);
  }

  create(order: Order): Observable<Order> {
    console.log("Order service: create order");
    return this.tokenService.post(url, order);
  }

}
