const base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getCompetitions() {
  if ('caches' in window) {
    caches.match("v2/competitions/").then((response) => { // URL disesuaikan dengan URL cache yang ingin kamu cek
        if(response){
          // Bila sudah ada di cache datanya, maka tampilkan ke web
          const fungsi = data => {
            console.log(data);
            let articlesHTML = "";
            data.competitions.forEach(function(article) {
              articlesHTML += `
                      <tr>
                        <td>${article.name}</td>
                        <td>${article.area.name}</td>
                        <td>${article.numberOfAvailableSeasons}</td>
                        <td>${article.plan}</td>
                        <td>${article.lastUpdated}</td>
                      </tr>
                  `;
            });

            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("competition").innerHTML = articlesHTML;
          }
        } else {
          // Bila belum ada di cache datanya, fetch terlebih dahulu
          // Lalu tampilkan ke web
          fetchApi(base_url + "competitions/");
        }
    });
  }

  const fetchApi = url => {
      return fetch(url, {
          headers: {
              'X-Auth-Token': "b96743ec0ea14ae29a0706699cc69d47"
          }
      })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        let articlesHTML = "";
        data.competitions.forEach(function(article) {
          articlesHTML += `
                  <tr>
                    <td>${article.name}</td>
                    <td>${article.area.name}</td>
                    <td>${article.numberOfAvailableSeasons}</td>
                    <td>${article.plan}</td>
                    <td>${article.lastUpdated}</td>
                  </tr>
              `;
        });

        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("competition").innerHTML = articlesHTML;
        // Menyusun komponen card artikel secara dinamis
      })
      .catch(error);
  }
}

function getMatches() {
  if ('caches' in window) {
    caches.match("v2/competitions/2014/matches?matchday=1").then((response) => { // URL disesuaikan dengan URL cache yang ingin kamu cek
        if(response){
          // Bila sudah ada di cache datanya, maka tampilkan ke web
          const fungsi = data => {
            let matchesHTML = "";
            console.log(data);
            data.matches.forEach(function(matches) {
              let match = matches.utcDate;
              let localDate = new Date(match);
              let strDate = localDate.toString();
              let matchDate = strDate.substring(0,21);
              matchesHTML += `
              <div class="card">
                <div class="card-content">
                  <table class="responsive-table highlight">
                    <tbody>
                      <tr>
                        <td id="matchTd1" class="col l4 s12">${matches.homeTeam.name}</td>
                        <td id="matchTd2" class="col l4 s12">${matchDate}</td>
                        <td id="matchTd3" class="col l4 s12">${matches.awayTeam.name}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
                  `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("match").innerHTML = matchesHTML;
          }
        } else {
          // Bila belum ada di cache datanya, fetch terlebih dahulu
          // Lalu tampilkan ke web
          fetchApi(base_url + "competitions/2014/matches?matchday=1");
        }
    });
  }

  const fetchApi = url => {
      return fetch(url, {
          headers: {
              'X-Auth-Token': "b96743ec0ea14ae29a0706699cc69d47"
          }
      })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        let matchesHTML = "";
        console.log(data);
        data.matches.forEach(function(matches) {
          let match = matches.utcDate;
          let localDate = new Date(match);
          let strDate = localDate.toString();
          let matchDate = strDate.substring(0,21);
          matchesHTML += `
          <div class="card">
            <div class="card-content">
              <table class="responsive-table highlight">
                <tbody>
                  <tr id="matchTd">
                    <td id="matchTd1" class="col l4 s12">${matches.homeTeam.name}</td>
                    <td id="matchTd2" class="col l4 s12">${matchDate}</td>
                    <td id="matchTd3" class="col l4 s12">${matches.awayTeam.name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
              `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("match").innerHTML = matchesHTML;
      })
      .catch(error);
  }
}

function getTeams() {
  if ('caches' in window) {
    caches.match("v2/competitions/2014/teams/").then((response) => { // URL disesuaikan dengan URL cache yang ingin kamu cek
        if(response){
          // Bila sudah ada di cache datanya, maka tampilkan ke web
          const fungsi = data => {
            // Objek/array JavaScript dari response.json() masuk lewat data.
            // Menyusun komponen card artikel secara dinamis
            let teamsHTML = "";
            data.teams.forEach(function(article) {
              console.log(data);
              teamsHTML += `
                      <tr>
                        <td>${article.name}</td>
                        <td>${article.tla}</td>
                        <td>${article.website}</td>
                        <td>${article.lasUpdated}</td>
                      </tr>
                  `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("team").innerHTML = teamsHTML;
            // Menyusun komponen card artikel secara dinamis
          }
        } else {
          // Bila belum ada di cache datanya, fetch terlebih dahulu
          // Lalu tampilkan ke web
          fetchApi(base_url + "competitions/2014/teams/");
        }
    });
  }

  const fetchApi = url => {
      return fetch(url, {
          headers: {
              'X-Auth-Token': "b96743ec0ea14ae29a0706699cc69d47"
          }
      })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        // Menyusun komponen card artikel secara dinamis
        let teamsHTML = "";
        data.teams.forEach(function(article) {
          console.log(data);
          teamsHTML += `
                  <tr>
                    <td>${article.name}</td>
                    <td>${article.tla}</td>
                    <td>${article.website}</td>
                    <td>${article.lasUpdated}</td>
                  </tr>
              `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("team").innerHTML = teamsHTML;
      })
      .catch(error);
  }
}

function getStandings() {
  if ('caches' in window) {
    caches.match("v2/competitions/2014/standings/").then((response) => { // URL disesuaikan dengan URL cache yang ingin kamu cek
        if(response){
          // Bila sudah ada di cache datanya, maka tampilkan ke web
          const fungsi = data => {
            // Objek/array JavaScript dari response.json() masuk lewat data.
            // Menyusun komponen card artikel secara dinamis
            let articlesHTML = "";
            data.standings.forEach(function(hasilKlasimen) {
              hasilKlasimen.table.forEach(function(club){
                club = JSON.parse(JSON.stringify(club).replace(/http:/g, "https:"));
                console.log(data);
                articlesHTML += `
                        <tr>
                          <td class="center" style="width:5%">${club.position}</td>
                          <td class="center" style="width:10%">
                            <a href="./detail_team.html?id=${club.team.id}">
                              <img src="${club.team.crestUrl}" width="50" height="50" alt="Logo Team"></img>
                            </a>
                          </td>
                          <td class="left">${club.team.name}</td>
                          <td class="center" style="width:5%">${club.playedGames}</td>
                          <td class="center" style="width:5%">${club.won}</td>
                          <td class="center" style="width:5%">${club.lost}</td>
                          <td class="center" style="width:5%">${club.goalsFor}</td>
                          <td class="center" style="width:5%">${club.goalsAgainst}</td>
                          <td class="center" style="width:5%">${club.goalDifference}</td>
                          <td class="center" style="width:5%">${club.points}</td>
                        </tr>
                    `;
              });
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("standing").innerHTML = articlesHTML;
          }
        } else {
          // Bila belum ada di cache datanya, fetch terlebih dahulu
          // Lalu tampilkan ke web
          fetchApi(base_url + "competitions/2014/standings/");
        }
    });
  }

  const fetchApi = url => {
      return fetch(url, {
          headers: {
              'X-Auth-Token': "b96743ec0ea14ae29a0706699cc69d47"
          }
      })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        // Menyusun komponen card artikel secara dinamis
        let articlesHTML = "";
        data.standings.forEach(function(hasilKlasimen) {
          hasilKlasimen.table.forEach(function(club){
            club = JSON.parse(JSON.stringify(club).replace(/http:/g, "https:"));
            console.log(data);
            articlesHTML += `
                    <tr>
                      <td class="center" style="width:5%">${club.position}</td>
                      <td class="center" style="width:10%">
                        <a href="./detail_team.html?id=${club.team.id}">
                          <img src="${club.team.crestUrl}" width="50" height="50" alt="Logo Team"></img>
                        </a>
                      </td>
                      <td class="left">${club.team.name}</td>
                      <td class="center" style="width:5%">${club.playedGames}</td>
                      <td class="center" style="width:5%">${club.won}</td>
                      <td class="center" style="width:5%">${club.lost}</td>
                      <td class="center" style="width:5%">${club.goalsFor}</td>
                      <td class="center" style="width:5%">${club.goalsAgainst}</td>
                      <td class="center" style="width:5%">${club.goalDifference}</td>
                      <td class="center" style="width:5%">${club.points}</td>
                    </tr>
                `;
          });
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("standing").innerHTML = articlesHTML;
      })
      .catch(error);
  }
}

function getTeamsById(){
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match("v2/teams/" + idParam).then((response) => { // URL disesuaikan dengan URL cache yang ingin kamu cek
          if(response){
            // Bila sudah ada di cache datanya, maka tampilkan ke web
            const fungsi = data => {
              // Objek/array JavaScript dari response.json() masuk lewat data.
              // Menyusun komponen card artikel secara dinamis
              let team = "";
              team += `
              <div class="card center">
                <a href="./detail_team.html?id=${data.id}">
                  <img src="${data.crestUrl}" alt="Logo Team"></img>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${data.name}</span>
                  <table class="responsive-table">
                    <tr>
                      <td>Nama Tim</td>
                      <td>:</td>
                      <td>${data.name}</td>
                    </tr>
                    <tr>
                      <td>Nama Singkatan</td>
                      <td>:</td>
                      <td>${data.shortName}</td>
                    </tr>
                    <tr>
                      <td>TLA</td>
                      <td>:</td>
                      <td>${data.tla}</td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>:</td>
                      <td>${data.address}</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>:</td>
                      <td>${data.website}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>${data.email}</td>
                    </tr>
                    <tr>
                      <td>Founded</td>
                      <td>:</td>
                      <td>${data.founded}</td>
                    </tr>
                    <tr>
                      <td>Warna Club</td>
                      <td>:</td>
                      <td>${data.clubColors}</td>
                    </tr>
                    <tr>
                      <td>Venue</td>
                      <td>:</td>
                      <td>${data.venue}</td>
                    </tr>
                  </table>
                </div>
              </div>
              `;

              let squads = "";
              data.squad.forEach(function(squad){
                squads += `
                  <tr>
                    <td class="center">${squad.name}</td>
                  </tr>
                `;
              });
              // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("body-content").innerHTML = team;
              document.getElementById("pemain").innerHTML = squads;
              // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
              resolve(data);
            }
          } else {
            // Bila belum ada di cache datanya, fetch terlebih dahulu
            // Lalu tampilkan ke web
            fetchApi(base_url + "teams/" + idParam);
          }
      });
    }

    const fetchApi = url => {
        return fetch(url, {
            headers: {
                'X-Auth-Token': "b96743ec0ea14ae29a0706699cc69d47"
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
          // Objek/array JavaScript dari response.json() masuk lewat data.
          // Menyusun komponen card artikel secara dinamis
          let team = "";
          team += `
          <div class="card center">
            <a href="./detail_team.html?id=${data.id}">
              <img src="${data.crestUrl}" alt="Logo Team"></img>
            </a>
            <div class="card-content">
              <span class="card-title truncate">${data.name}</span>
              <table class="responsive-table">
                <tr>
                  <td>Nama Tim</td>
                  <td>:</td>
                  <td>${data.name}</td>
                </tr>
                <tr>
                  <td>Nama Singkatan</td>
                  <td>:</td>
                  <td>${data.shortName}</td>
                </tr>
                <tr>
                  <td>TLA</td>
                  <td>:</td>
                  <td>${data.tla}</td>
                </tr>
                <tr>
                  <td>Alamat</td>
                  <td>:</td>
                  <td>${data.address}</td>
                </tr>
                <tr>
                  <td>Website</td>
                  <td>:</td>
                  <td>${data.website}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>${data.email}</td>
                </tr>
                <tr>
                  <td>Founded</td>
                  <td>:</td>
                  <td>${data.founded}</td>
                </tr>
                <tr>
                  <td>Warna Club</td>
                  <td>:</td>
                  <td>${data.clubColors}</td>
                </tr>
                <tr>
                  <td>Venue</td>
                  <td>:</td>
                  <td>${data.venue}</td>
                </tr>
              </table>
            </div>
          </div>
          `;

          let squads = "";
          data.squad.forEach(function(squad){
            squads += `
              <tr>
                <td class="center">${squad.name}</td>
              </tr>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = team;
          document.getElementById("pemain").innerHTML = squads;
          // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
          resolve(data);
        })
        .catch(error);
      }

  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    let teamsHTML = "";
    teams.forEach(function(team) {
      // var description = article.post_content.substring(0, 100);

      teamsHTML += `
        <div class="row">
          <div class="col l12 s12 m6 center">
            <div class="card">
              <a href="./detail_team.html?id=${team.id}&saved=true">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${team.crestUrl}" width="200%" height="200" alt="Logo Team"></img>
                </div>
              </a>
              <div class="card-content">
                <span class="card-title truncate center">${team.name} - ${team.tla}</span>
              </div>
            </div>
          </div>
        </div>
        `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getSavedTeamsById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function(team) {
    let teamHTML = "";
    teamHTML += `
      <div class="card">
        <a href="./detail_team.html?id=${team.id}">
          <img src="${team.crestUrl}" alt="Logo Team"></img>
        </a>
        <div class="card-content">
          <span class="card-title truncate">${team.name}</span>
          <table class="responsive-table">
            <tr>
              <td>Nama Tim</td>
              <td>:</td>
              <td>${team.name}</td>
            </tr>
            <tr>
              <td>Nama Singkatan</td>
              <td>:</td>
              <td>${team.shortName}</td>
            </tr>
            <tr>
              <td>TLA</td>
              <td>:</td>
              <td>${team.tla}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>:</td>
              <td>${team.address}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>:</td>
              <td>${team.website}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>${team.email}</td>
            </tr>
            <tr>
              <td>Founded</td>
              <td>:</td>
              <td>${team.founded}</td>
            </tr>
            <tr>
              <td>Warna Club</td>
              <td>:</td>
              <td>${team.clubColors}</td>
            </tr>
            <tr>
              <td>Venue</td>
              <td>:</td>
              <td>${team.venue}</td>
            </tr>
          </table>
        </div>
      </div>
      `;

      let squads = "";
      team.squad.forEach(function(squad){
        squads += `
          <tr>
            <td class="center">${squad.name}</td>
          </tr>
        `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = team;
      document.getElementById("pemain").innerHTML = squads;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);
  });
}
