import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore } from '../config/firebase.config';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  private db = getFirestore();

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryData = {
      ...createCategoryDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const categoryRef = await this.db.collection('categories').add(categoryData);

    return {
      id: categoryRef.id,
      ...categoryData,
    };
  }

  async findAll() {
    const snapshot = await this.db.collection('categories').orderBy('createdAt', 'desc').get();
    
    const categories: any[] = [];
    snapshot.forEach(doc => {
      categories.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return categories;
  }

  async findOne(id: string) {
    const doc = await this.db.collection('categories').doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException('Category not found');
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryRef = this.db.collection('categories').doc(id);
    const doc = await categoryRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Category not found');
    }

    const updateData = {
      ...updateCategoryDto,
      updatedAt: new Date().toISOString(),
    };

    await categoryRef.update(updateData);

    return {
      id,
      ...doc.data(),
      ...updateData,
    };
  }

  async remove(id: string) {
    const categoryRef = this.db.collection('categories').doc(id);
    const doc = await categoryRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Category not found');
    }

    await categoryRef.delete();

    return { message: 'Category deleted successfully', id };
  }
}

