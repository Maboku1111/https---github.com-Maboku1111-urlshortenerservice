export default class Db {
  static saveToStorage(storageName, storageData) {
    localStorage.setItem(storageName, JSON.stringify(storageData));
  }

  static getData(storageName) {
    const data = JSON.parse(localStorage.getItem(storageName) || "[]");
    return data;
  }
}
