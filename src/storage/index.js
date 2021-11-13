import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,
  storageBackend: AsyncStorage, // for web: window.localStorage
  enableCache: true,
  sync: {
    // we'll talk about the details later.
  },
});

export default storage;
