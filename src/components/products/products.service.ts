import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/core/db/category.entity';
import { Product } from 'src/core/db/product.entity';
import { DeleteProductDto, NewProductDto, UpdateProductDto } from 'src/core/dto/product.dto';
import { responseError, responseSusses } from 'src/core/shared/utils';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) {
    }

    /**
     * Retrieves all products from the repository, including their categories.
     * 
     * @async
     * @returns {Promise<Object>} Success response with the list of products or error response.
     * @throws {Error} If there's an issue retrieving the products.
     */
    async getAllPrducts() {
        try {
            const dataProducts = await this.productRepository.find({
                relations: {
                    category: true
                }
            })
            return responseSusses('', dataProducts);
        } catch (error) {
            return responseError('Error geting all products', {})
        }
    }

    /**
     * Retrieves a product by its ID, including its category.
     * 
     * @async
     * @param {number} id - The ID of the product to retrieve.
     * @returns {Promise<Object>} Success response with the product or error if not found.
     * @throws {Error} If there's an issue retrieving the product.
     */
    async getPrductById(id: number) {
        try {
            const dataProduct = await this.productRepository.findOne({
                where: { id: id }, relations: {
                    category: true
                }
            });
            if (!dataProduct) return responseError('Product not exist', {}, 404)
            return responseSusses('', dataProduct);
        } catch (error) {
            return responseError('Error geting product', {})
        }
    }

    /**
     * Retrieves all products belonging to a specific category.
     * 
     * @async
     * @param {number} idCategory - The ID of the category to retrieve products for.
     * @returns {Promise<Object>} Success response with the list of products or error if the category is not found.
     * @throws {Error} If there's an issue retrieving the products.
     */
    async getAllPrductsOfCategory(idCategory: number) {
        try {
            const category = await this.categoryRepository.findOne({ where: { id: idCategory } });
            if (!category) return responseError('Category not exist', {}, 404)
            const dataProducts = await this.productRepository.find({
                where: { category: category }, relations: {
                    category: true
                }
            })
            return responseSusses('', dataProducts);
        } catch (error) {
            return responseError('Error geting all products', {})
        }
    }

    /**
     * Creates a new product and associates it with a category.
     * 
     * @async
     * @param {NewProductDto} product - The product data to create.
     * @returns {Promise<Object>} Success response with the new product's ID or error response.
     * @throws {Error} If there's an issue creating the product.
     */
    async createProduct(product: NewProductDto) {
        try {
            let category = null;

            if (product.idCategory != -1) {
                category = await this.categoryRepository.findOne({ where: { id: product.idCategory } });
                if (!category) return responseError('Category not exist', {}, 404)
            }

            const newProduct = new Product();
            newProduct.name = product.name;
            newProduct.description = product.description;
            newProduct.price = product.price;
            newProduct.category = category;

            const insertedProduct = await this.productRepository.insert(newProduct);
            return insertedProduct ? responseSusses('', insertedProduct.identifiers[0]) : responseError('Product not exist', {}, 404);
        } catch (error) {
            return responseError('Error creating product', {})
        }

    }

    /**
     * Updates an existing product by its ID.
     * 
     * @async
     * @param {UpdateProductDto} product - The product data to update.
     * @returns {Promise<Object>} Success response with the updated product or error if not found.
     * @throws {Error} If there's an issue updating the product.
     */
    async updateProduct(product: UpdateProductDto) {
        try {
            const dbProduct = await this.productRepository.findOne({ where: { id: product.id }, relations: {category: true}});

            if (!dbProduct) {
                return responseError('Product not exist', {}, 404)
            }

            let category = null;

            if (product.idCategory != -1) {
                category = await this.categoryRepository.findOne({ where: { id: product.idCategory } });
                if (!category) return responseError('Category not exist', {}, 404)
            }

            if (product.name) dbProduct.name = product.name;
            if (product.description) dbProduct.description = product.description;
            if (product.idCategory) dbProduct.category = category;
            if (product.price) dbProduct.price = product.price;

            const savedProduct = await this.productRepository.save(dbProduct);
            return responseSusses('', savedProduct);
        } catch (err) {
            return responseError('Error update product', {})
        }
    }

    /**
     * Deletes products based on provided data.
     * 
     * @async
     * @param {DeleteProductDto} product - The product data to delete.
     * @returns {Promise<Object>} Success response with the deleted product ID or error if not found.
     * @throws {Error} If there's an issue deleting the product.
     */
    async deleteProduct(product: DeleteProductDto) {
        try {
            const respone = await this.productRepository.delete(product.id);

            if (respone.affected) {
                return responseSusses('', { id: product.id });
            } else {
                return responseSusses('Products not found', []);
            }
        } catch (err) {
            return responseError('Error deleting produts', {})
        }
    }

    /**
     * Deletes a product by its ID.
     * 
     * @async
     * @param {number} productId - The ID of the product to delete.
     * @returns {Promise<Object>} Success response with the deleted product ID or error if not found.
     * @throws {Error} If there's an issue deleting the product.
     */
    async deleteProductById(productId: number) {
        try {
            const respone = await this.productRepository.delete(productId);

            if (respone.affected) {
                return responseSusses('', { id: productId });
            } else {
                return responseSusses('Products not found', []);
            }
        } catch (err) {
            return responseError('Error deleting produts', {})
        }
    }
}
