import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Category } from 'src/core/db/category.entity';
import { DeleteCategoryDto, NewCategoryDto, UpdateCategoryDto } from 'src/core/dto/categories.dto';

@Controller('categories')
@ApiTags("Categories")
export class CategoriesController {

    constructor(
        private categoriesService: CategoriesService
    ) {

    }

    /**
     * Get all categories.
     * 
     * @route GET /categories
     * @summary Get all categories from the database.
     * @returns {Promise<Object>} The list of all categories.
     */
    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    async getAllCategories() {
        return await this.categoriesService.getAllCategories()
    }

    /**
     * Get a specific category by ID.
     * 
     * @route GET /categories/:id
     * @param {number} id - The ID of the category to retrieve.
     * @summary Get a category with a specific ID.
     * @returns {Promise<Object>} The category with the given ID.
     */
    @Get(':id')
    @ApiOperation({ summary: 'Get category with specific id' })
    async getCategoryById(@Param('id') id: number) {
        return await this.categoriesService.getCategoryById(id);
    }

    /**
     * Create a new category.
     * 
     * @route POST /categories
     * @param {NewCategoryDto} category - The category data to create.
     * @summary Create a new category.
     * @returns {Promise<Object>} The created category's ID.
     */
    @Post()
    @ApiOperation({ summary: 'Create a category' })
    async createCategory(@Body() category: NewCategoryDto) {
        return await this.categoriesService.createCategory(category);
    }

    /**
     * Update an existing category.
     * 
     * @route PUT /categories
     * @param {UpdateCategoryDto} category - The category data to update.
     * @summary Update a category.
     * @returns {Promise<Object>} The updated category data.
     */
    @Put()
    @ApiOperation({ summary: 'Update a category' })
    async updateCategory(@Body() category: UpdateCategoryDto) {
        return await this.categoriesService.updateCategory(category);
    }

    /**
     * Delete categories by ID.
     * 
     * @route DELETE /categories
     * @param {DeleteCategoryDto} category - The category data to delete.
     * @summary Delete categories using a DTO.
     * @returns {Promise<Object>} The deleted category's ID.
     */
    @Delete()
    @ApiOperation({ summary: 'Delete categories with specific id' })
    async deleteCategory(@Body() category: DeleteCategoryDto) {
        return await this.categoriesService.deleteCategory(category);
    }

    /**
     * Delete a category by its ID.
     * 
     * @route DELETE /categories/:id
     * @param {number} id - The ID of the category to delete.
     * @summary Delete a category by ID.
     * @returns {Promise<Object>} The deleted category's ID.
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category with specific id' })
    async deleteCategoryById(@Param('id') id: number) {
        return await this.categoriesService.deleteCategoryById(id);
    }
}
