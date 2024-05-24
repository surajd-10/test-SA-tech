class Storage {
  storage: globalThis.Storage;

  constructor() {
    this.storage = sessionStorage;
  }

  save(key: string, value: NonNullable<any>) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string, defaultValue: NonNullable<any>) {
    const valueString = this.storage.getItem(key);
    if (!valueString) return defaultValue;
    return JSON.parse(valueString);
  }
}

const StorageInstance = new Storage();
export default StorageInstance;
