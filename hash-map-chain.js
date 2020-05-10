class _Node {
  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.DELETED = false;
  }
}

class HashMapChain {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    let head = this._hashTable[index];
    if (head.key === key && !head.DELETED) {
      return head.value;
    }
    while (head !== null) {
      if (head.key === key && !head.DELETED) {
        return head.value;
      } else head = head.next;
    }
    if (head === null) {
      throw new Error('Key error');
    }
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMapChain.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMapChain.SIZE_RATIO);
    }
    //Find the slot where this key should be in
    const index = this._findSlot(key);
    if (!this._hashTable[index]) {
      this.length++;
      this._hashTable[index] = new _Node(key, value, null);
      return;
    }
    let head = this._hashTable[index];
    if (head.key === key) {
      head.value = value;
      return;
    }
    while (head.next !== null) {
      if (head.key === key) {
        head.value = value;
        return;
      }
      head = head.next;
    }

    head.next = new _Node(key, value, null);
  }

  delete(key) {
    const index = this._findSlot(key);
    let head = this._hashTable[index];
    if (head === undefined) {
      throw new Error('Key error');
    }
    while (head !== null) {
      if (head.key === key) {
        head.DELETED = true;
        this.length--;
        this._deleted++;
        return true;
      }
      head = head.next;
    }

    if (head === null) {
      throw new Error('Key error');
    }
  }

  _findSlot(key) {
    const hash = HashMapChain._hashString(key);
    const index = hash % this._capacity;
    return index;
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //Bitwise left shift with 5 0s - this would be similar to
      //hash*31, 31 being the decent prime number
      //but bit shifting is a faster way to do this
      //tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //converting hash to a 32 bit integer
      hash = hash & hash;
    }
    //making sure hash is unsigned - meaning non-negtive number.
    return hash >>> 0;
  }
}
HashMapChain.MAX_LOAD_RATIO = 0.5;
HashMapChain.SIZE_RATIO = 3;
module.exports = HashMapChain;
