export interface Order {
    id: string,
    customer_email: string,
    customer_name: String,
    customer_phone: String,
    payment_type: String,
    url: String,
    total: string,
    date: string | undefined,
    order_desciption: String,
    status: String,
    rejected_reasons: String,
    products: [{
      id: string,
      item_name: string,
      brand: string,
      product_total: string
    }] | []
}