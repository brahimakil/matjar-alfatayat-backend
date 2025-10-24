import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore } from '../config/firebase.config';
import { CreateHeroImageDto } from './dto/create-hero-image.dto';
import { UpdateHeroImageDto } from './dto/update-hero-image.dto';
import { UpdateWhatsAppDto } from './dto/update-whatsapp.dto';

@Injectable()
export class SettingsService {
  private db = getFirestore();

  // Hero Images
  async createHeroImage(createHeroImageDto: CreateHeroImageDto) {
    const heroImageData = {
      ...createHeroImageDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const heroImageRef = await this.db.collection('heroImages').add(heroImageData);

    return {
      id: heroImageRef.id,
      ...heroImageData,
    };
  }

  async findAllHeroImages() {
    const snapshot = await this.db.collection('heroImages').orderBy('order', 'asc').get();
    
    const heroImages: any[] = [];
    snapshot.forEach(doc => {
      heroImages.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return heroImages;
  }

  async findOneHeroImage(id: string) {
    const doc = await this.db.collection('heroImages').doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException('Hero image not found');
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async updateHeroImage(id: string, updateHeroImageDto: UpdateHeroImageDto) {
    const heroImageRef = this.db.collection('heroImages').doc(id);
    const doc = await heroImageRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Hero image not found');
    }

    // Filter out undefined values
    const updateData = Object.entries({
      ...updateHeroImageDto,
      updatedAt: new Date().toISOString(),
    }).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as any);

    await heroImageRef.update(updateData);

    return {
      id,
      ...doc.data(),
      ...updateData,
    };
  }

  async removeHeroImage(id: string) {
    const heroImageRef = this.db.collection('heroImages').doc(id);
    const doc = await heroImageRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Hero image not found');
    }

    await heroImageRef.delete();

    return { message: 'Hero image deleted successfully', id };
  }

  // WhatsApp Settings
  async getWhatsApp() {
    const doc = await this.db.collection('settings').doc('whatsapp').get();

    if (!doc.exists) {
      return { countryCode: '+961', phoneNumber: '', fullNumber: '' };
    }

    const data = doc.data();
    
    if (!data) {
      return { countryCode: '+961', phoneNumber: '', fullNumber: '' };
    }

    return {
      id: doc.id,
      ...data,
      fullNumber: `${data.countryCode}${data.phoneNumber}`,
    };
  }

  async updateWhatsApp(updateWhatsAppDto: UpdateWhatsAppDto) {
    const whatsappRef = this.db.collection('settings').doc('whatsapp');

    const updateData = {
      ...updateWhatsAppDto,
      fullNumber: `${updateWhatsAppDto.countryCode}${updateWhatsAppDto.phoneNumber}`,
      updatedAt: new Date().toISOString(),
    };

    await whatsappRef.set(updateData, { merge: true });

    return updateData;
  }
}

