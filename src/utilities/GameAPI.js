class GameAPI {

  static gameDataInLocalStorage() {
    let data = localStorage.getItem("data");
    if (data) {
      data = JSON.parse(data);
      if (data.source === "preview") return "preview";
      if (data.source === "uploaded") return "uploaded";
      if (data.source === "server") return "server";
    }
    return "server";
  }

  static loadGame() {
    const source = this.gameDataInLocalStorage();
    let dataToLoad;
 
    if (source === "server") {
      dataToLoad = localStorage.getItem("serversave");
    } else if (source === "preview") {
      dataToLoad = localStorage.getItem("previewsave");
    } else if (source === "upload") {
      dataToLoad = localStorage.getItem("uploadsave");
    }

    if (dataToLoad) return JSON.parse(dataToLoad)

  }

  static saveGame(playerData) {
    let data = localStorage.getItem("data");
    let dataToSave = JSON.stringify(playerData);
    if (data) {
      data = JSON.parse(data);
      if (data.autosave) {
        if (data.source === "server") {
          localStorage.setItem("serversave", dataToSave);
        } else if (data.source === "preview") {
          localStorage.setItem("previewsave", dataToSave);
        } else if (data.source === "uploaded") {
          localStorage.setItem("uploadsave", dataToSave);
        }
      }
    }
  }

}

export default GameAPI;