export class CreateOrder {
  Name?: string;
  Description?: string;
  Address?: string;
  Status?: string;

  //Foreign Key
  CustomerId: string;
}
