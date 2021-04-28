import myStorage from '@/utils/myStorage';

function copy(obj) {
  const copy = Object.create(Object.getPrototypeOf(obj));
  const propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach(function(name) {
    const desc = Object.getOwnPropertyDescriptor(obj, name);

    Object.defineProperty(copy, name, desc);
  });
  return copy;
}

const vuexToLocalStorage = store => {
  const savedState = myStorage.getItem('vuex');

  if (savedState) {
    if (typeof savedState === 'object') {
      store.replaceState(savedState);
    }
  }
  store.subscribe((mutation, state) => {
    const storeClone = copy(state);

    myStorage.setItem('vuex', storeClone);
  });
};

export default vuexToLocalStorage;
