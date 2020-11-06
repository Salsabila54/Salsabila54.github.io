document.addEventListener("DOMContentLoaded", function() {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");

  let save = document.getElementById("save");
  let del = document.getElementById("delete");

  let item = getTeamsById();

  if (isFromSaved) {
    // Hide fab jika dimuat dari indexed db
    save.style.display = 'none';

    // ambil artikel lalu tampilkan
    getSavedTeamsById();
  } else {
    del.style.display = 'none';
  }

  save.onclick = function() {
    console.log("Tombol FAB di klik.");
    item.then(function(article) {
      console.log(article);
      saveForLater(article);
    });
  };

  del.onclick = function() {
    console.log("Tombol FAB di klik.");
    item.then(function(article) {
      console.log(article);
      deleteTeams(article);
    });
  };
});
