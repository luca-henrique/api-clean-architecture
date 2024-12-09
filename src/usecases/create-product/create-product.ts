import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product";
import { Usecase } from "../usecase";

export type CreateProductInputDto = {
  name: string;
  price: number;
};

export type CreateProductOutputDto = {
  id: string;
};

export class CreateProduct
  implements Usecase<CreateProductInputDto, CreateProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new CreateProduct(productGateway);
  }

  public async execute({
    name,
    price,
  }: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const aProduct = Product.create(name, price);

    await this.productGateway.save(aProduct);

    const output = {
      id: aProduct.id,
    };

    return output;
  }
}
