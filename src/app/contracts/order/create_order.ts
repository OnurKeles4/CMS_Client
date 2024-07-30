export class CreateOrder {
  name?: string;
  description?: string;
  address?: string;
  status?: string;

  //Foreign Key
  CustomerId: string;
}
