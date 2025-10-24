import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore } from '../config/firebase.config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private db = getFirestore();

  async create(createProductDto: CreateProductDto) {
    const productData = {
      ...createProductDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFeatured: createProductDto.isFeatured || false,
      colors: createProductDto.colors || [],
      images: createProductDto.images || [],
      dimensions: createProductDto.dimensions || { length: null, width: null, height: null },
      weight: createProductDto.weight || null,
    };

    const productRef = await this.db.collection('products').add(productData);

    return {
      id: productRef.id,
      ...productData,
    };
  }

  async findAll(limit: number = 20) {
    const snapshot = await this.db
      .collection('products')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    
    const products: any[] = [];
    snapshot.forEach(doc => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  }

  async findByCategory(categoryId: string) {
    const snapshot = await this.db
      .collection('products')
      .where('categoryId', '==', categoryId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const products: any[] = [];
    snapshot.forEach(doc => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  }

  async findFeatured() {
    const snapshot = await this.db
      .collection('products')
      .where('isFeatured', '==', true)
      .orderBy('createdAt', 'desc')
      .get();
    
    const products: any[] = [];
    snapshot.forEach(doc => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  }

  async findOne(id: string) {
    const doc = await this.db.collection('products').doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException('Product not found');
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productRef = this.db.collection('products').doc(id);
    const doc = await productRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Product not found');
    }

    const updateData = {
      ...updateProductDto,
      updatedAt: new Date().toISOString(),
    };

    await productRef.update(updateData);

    return {
      id,
      ...doc.data(),
      ...updateData,
    };
  }

  async remove(id: string) {
    const productRef = this.db.collection('products').doc(id);
    const doc = await productRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Product not found');
    }

    await productRef.delete();

    return { message: 'Product deleted successfully', id };
  }
}

