import storageAvailable from './utils.js'
import pkg from 'node-localstorage';
const {localStorage} = pkg;

export default class Db {
    static saveToStorage(storageName, storageData) {
        if (storageAvailable("localSorage")) {
            return localStorage.setItem(storageName, JSON.stringify(storageData))
        }
    }

    static getData(storageName) {
        if (storageAvailable("localStorage")) {
            const data = JSON.parse(localStorage.getItem(storageName) || '[]')
            return data
        }
    }
}
