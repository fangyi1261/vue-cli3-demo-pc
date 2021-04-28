const myStorage = (function() {
  const ms = 'myStorage';
  const storage = window.sessionStorage;

  return {
    test() {
      return !!window.sessionStorage;
    },
    init() {
      storage.setItem(ms, {});
    },
    setItem(key, value) {
      let myStorage = storage.getItem(ms);

      if (!myStorage) {
        this.init();
        myStorage = storage.getItem(ms);
      }
      myStorage = JSON.parse(myStorage);
      myStorage[key] = value;
      storage.setItem(ms, JSON.stringify(myStorage));
      return myStorage.data;
    },
    getItem(key) {
      let myStorage = storage.getItem(ms);

      if (!myStorage) {
        return false;
      }
      myStorage = JSON.parse(myStorage);
      return myStorage[key];
    },
    removeItem(key) {
      let myStorage = storage.getItem(ms);

      if (!myStorage) {
        return false;
      }
      myStorage = JSON.parse(myStorage);
      delete myStorage[key];
      storage.setItem(ms, JSON.stringify(myStorage));
      return myStorage.data;
    },
    clear() {
      storage.removeItem(ms);
    }
  };
})();

export default myStorage;
