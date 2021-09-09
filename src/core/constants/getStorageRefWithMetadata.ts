import { auth, storage } from '../firebase';
import firebase from 'firebase';

export interface MetadataEntity {
    contentType: string,
}

export function getStorageRefWithMetadata(): [firebase.storage.Reference, MetadataEntity] {
    const anonymousUser = 'anonymous';
    const userId = !auth.currentUser ? anonymousUser : auth.currentUser.uid;
    const imgFile = storage.ref().child(`images/${userId}.png`);
    const metadata = {
        contentType: 'image/jpeg',
    };

    return [imgFile, metadata];
}
