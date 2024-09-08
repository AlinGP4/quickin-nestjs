import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteProductDto, NewProductDto, UpdateProductDto } from 'src/core/dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags("Products")
export class ProductsController {


    constructor(
        private productsService: ProductsService
    ) {

    }

    /**
     * Get all products.
     * 
     * @route GET /products
     * @summary Get all products from the database.
     * @returns {Promise<Object>} The list of all products.
     */
    @Get()
    @ApiOperation({ summary: 'Get all products' })
    async getAllCategories() {
        return await this.productsService.getAllPrducts()
    }

    /**
     * Get a specific product by ID.
     * 
     * @route GET /products/:id
     * @param {number} id - The ID of the product to retrieve.
     * @summary Get a product with a specific ID.
     * @returns {Promise<Object>} The product with the given ID.
     */
    @Get(':id')
    @ApiOperation({ summary: 'Get product with specific id' })
    async getCategoryById(@Param('id') id: number) {
        return await this.productsService.getPrductById(id);
    }

    /**
     * Get all products by category ID.
     * 
     * @route GET /products/category/:id
     * @param {number} id - The ID of the category.
     * @summary Get all products from a specific category.
     * @returns {Promise<Object>} The list of products in the specified category.
     */
    @Get('category/:id')
    @ApiOperation({ summary: 'Get product with specific id' })
    async getAllPrductsOfCategory(@Param('id') id: number) {
        return await this.productsService.getAllPrductsOfCategory(id);
    }

    /**
     * Create a new product.
     * 
     * @route POST /products
     * @param {NewProductDto} product - The product data to create.
     * @summary Create a new product.
     * @returns {Promise<Object>} The created product's ID.
     */
    @Post()
    @ApiOperation({ summary: 'Create a product' })
    async createCategory(@Body() product: NewProductDto) {
        return await this.productsService.createProduct(product);
    }

    /**
     * Update an existing product.
     * 
     * @route PUT /products
     * @param {UpdateProductDto} product - The product data to update.
     * @summary Update a product.
     * @returns {Promise<Object>} The updated product data.
     */
    @Put()
    @ApiOperation({ summary: 'Update a product' })
    async updateCategory(@Body() product: UpdateProductDto) {
        return await this.productsService.updateProduct(product);
    }

    /**
     * Delete products by ID.
     * 
     * @route DELETE /products
     * @param {DeleteProductDto} product - The product data to delete.
     * @summary Delete a product using a DTO.
     * @returns {Promise<Object>} The deleted product's ID.
     */
    @Delete()
    @ApiOperation({ summary: 'Delete products with specific id' })
    async deleteProduct(@Body() product: DeleteProductDto) {
        return await this.productsService.deleteProduct(product);
    }

    /**
     * Delete a product by its ID.
     * 
     * @route DELETE /products/:id
     * @param {number} id - The ID of the product to delete.
     * @summary Delete a product by ID.
     * @returns {Promise<Object>} The deleted product's ID.
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product with specific id' })
    async deleteProductById(@Param('id') id: number) {
        return await this.productsService.deleteProductById(id);
    }
}
