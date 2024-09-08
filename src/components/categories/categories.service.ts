import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/core/db/category.entity';
import { DeleteCategoryDto, NewCategoryDto, UpdateCategoryDto } from 'src/core/dto/categories.dto';
import { responseError, responseSusses } from 'src/core/shared/utils';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) {
    }

    /**
     * Fetches all categories from the repository.
     * 
     * @async
     * @returns {Promise<Object>} Success response with categories or error response.
     * @throws {Error} If there's an issue retrieving the categories.
     */
    async getAllCategories() {
        try {
            const dataCategories = await this.categoryRepository.find()
            return responseSusses('', dataCategories);
        } catch (error) {
            return responseError('Error geting all categories', {})
        }
    }

    /**
     * Fetches a category by its ID.
     * 
     * @async
     * @param {number} id - The ID of the category to retrieve.
     * @returns {Promise<Object>} Success response with the category or error response.
     * @throws {Error} If there's an issue retrieving the category.
     */
    async getCategoryById(id: number) {
        try {
            const dataCategory = await this.categoryRepository.findOne({ where: { id: id } });
            return responseSusses('', dataCategory);
        } catch (error) {
            return responseError('Error geting category', {})
        }
    }

    /**
     * Creates a new category.
     * 
     * @async
     * @param {NewCategoryDto} category - The category data to create.
     * @returns {Promise<Object>} Success response with the new category ID or error response.
     * @throws {Error} If there's an issue creating the category.
     */
    async createCategory(category: NewCategoryDto) {
        const newCategory = new Category();
        newCategory.name = category.name;
        newCategory.description = category.description;

        try {
            const insertedCategory = await this.categoryRepository.insert(category);
            return responseSusses('', insertedCategory.identifiers);
        } catch (error) {
            return responseError('Error creating category', {})
        }

    }

    /**
     * Updates an existing category.
     * 
     * @async
     * @param {UpdateCategoryDto} category - The category data to update.
     * @returns {Promise<Object>} Success response with the updated category or error response.
     * @throws {Error} If there's an issue updating the category.
     */
    async updateCategory(category: UpdateCategoryDto) {
        try {
            const dbCategory = await this.categoryRepository.findOne({ where: { id: category.id } });
            if (!dbCategory) {
                return responseError('Category not exist', {}, 404)
            }
            if (category.name) dbCategory.name = category.name;
            if (category.description) dbCategory.description = category.description;
            const savedCategory = await this.categoryRepository.save(category);
            return responseSusses('', savedCategory);
        } catch (err) {
            return responseError('Error update category', {})
        }
    }

    /**
     * Deletes categories based on provided data.
     * 
     * @async
     * @param {DeleteCategoryDto} category - The category data to delete.
     * @returns {Promise<Object>} Success response with deleted category ID or error if not found.
     * @throws {Error} If there's an issue deleting the category.
     */
    async deleteCategory(category: DeleteCategoryDto) {
        try {
            const respone = await this.categoryRepository.delete(category.id);

            if (respone.affected) {
                return responseSusses('', { id: category.id });
            } else {
                return responseSusses('Categories not found', []);
            }
        } catch (err) {
            return responseError('Error deleting categories', {})
        }
    }

    /**
     * Deletes a category by its ID.
     * 
     * @async
     * @param {number} categoryId - The ID of the category to delete.
     * @returns {Promise<Object>} Success response with deleted category ID or error if not found.
     * @throws {Error} If there's an issue deleting the category.
     */
    async deleteCategoryById(categoryId: number) {
        try {
            const respone = await this.categoryRepository.delete(categoryId);

            if (respone.affected) {
                return responseSusses('', { id: categoryId });
            } else {
                return responseSusses('Category not found', []);
            }
        } catch (err) {
            return responseError('Error deleting category', {})
        }
    }
}
