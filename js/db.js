let dbPromised = idb.open("football-reader", 1, function(upgradeDb) {
  let articlesObjectStore = upgradeDb.createObjectStore("competitions", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(competition) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("competitions", "readwrite");
      var store = tx.objectStore("competitions");
      console.log(competition);
      store.add(competition);
      return tx.complete;
    })
    .then(function() {
      console.log("Informasi berhasil di simpan.");
    });
}

function deleteTeams(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("competitions", "readwrite");
      var store = tx.objectStore("competitions");
      console.log(team);
      store.delete(team.id);
      return tx.complete;
    })
    .then(function() {
      console.log("Informasi berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject){
    dbPromised
      .then(function(db){
          let tx = db.transaction("competitions", "readonly");
          let store = tx.objectStore("competitions");
          return store.getAll();
      })
      .then(function(teams){
        resolve(teams);
      });
  });
}


function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("competitions", "readonly");
        var store = tx.objectStore("competitions");
        // console.log(id);
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}
