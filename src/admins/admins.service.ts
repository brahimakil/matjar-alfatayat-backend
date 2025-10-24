import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore } from '../config/firebase.config';

@Injectable()
export class AdminsService {
  private db = getFirestore();

  async findAll() {
    const snapshot = await this.db.collection('admins').orderBy('createdAt', 'desc').get();
    
    const admins: any[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      admins.push({
        id: doc.id,
        email: data.email,
        name: data.name,
        createdAt: data.createdAt,
        lastLogin: data.lastLogin,
      });
    });

    return admins;
  }

  async remove(id: string) {
    const adminRef = this.db.collection('admins').doc(id);
    const doc = await adminRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Admin not found');
    }

    await adminRef.delete();

    return { message: 'Admin deleted successfully', id };
  }
}

