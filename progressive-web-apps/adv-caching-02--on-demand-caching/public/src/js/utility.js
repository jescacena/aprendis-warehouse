var dbPromise = idb.open("post-store", 1, function (db) {
    if (!db.objectStoreNames.contains("posts")) {
        db.createObjectStore("posts", { keyPath: "id" });
    }
});

function writePromise(objectStore, data) {
    return dbPromise.then(function (db) {
        var tx = db.transaction(objectStore, "readwrite");
        var store = tx.objectStore(objectStore);
        store.put(data);
        return tx.complete;
    });
}

function readAllData(objectStore) {
    return dbPromise.then(function (db) {
        var tx = db.transaction(objectStore, "readonly");
        var store = tx.objectStore(objectStore);
        return store.getAll();
    });
}

function clearAllData(objectStore) {
    return dbPromise.then(function (db) {
        var tx = db.transaction(objectStore, "readwrite");
        var store = tx.objectStore(objectStore);
        store.clear();
        return tx.complete;
    });
}

function deleteItemFromData(objectStore,id) {
    return dbPromise.then(function (db) {
        var tx = db.transaction(objectStore, "readwrite");
        var store = tx.objectStore(objectStore);
        store.delete(id);
        return tx.complete;
    });
}
