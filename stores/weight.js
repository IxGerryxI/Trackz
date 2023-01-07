import { addDoc, collection, getDocs, getDoc, doc } from "firebase/firestore"
const COLLECTION_NAME = 'weights';
const NUXT = useNuxtApp();
export const useWeightStore = defineStore('weight', {
    state: () => ({
        items: [],
        loaded: false,
    }),
    getters: {
    },
    actions: {
        async load() {
            console.log('loadweights');
            const snapshot = await getDocs(collection(NUXT.$firestore, COLLECTION_NAME)).catch(err => console.warn(err));
            snapshot.forEach(doc => this.items.push(doc.data()));
            console.log('loaded weights:\n', this.items);
            // this.loaded = true;
            return this.items;
        },
        /**
         * add another weight entry to the db
         * @param {Object} item 
         */
        async add(item) {
            item.creationdate = new Date();
            const savedRef = await addDoc(collection(NUXT.$firestore, COLLECTION_NAME), item);
            if (savedRef.id) {
                const docRef = doc(NUXT.$firestore, COLLECTION_NAME, savedRef.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) this.items.push(docSnap.data());
            }
        }
    },
})