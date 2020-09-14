class GameAPI {

  static gameDataInLocalStorage() {
    let data = localStorage.getItem("data");
    if (data) {
      data = JSON.parse(data);
      if (data.source==="storage") return true;
    }
    return false
  }

  static loadGame() {
    const savedGame = localStorage.getItem('qbnengine');
    if (savedGame) {
      return JSON.parse(savedGame);
    }
    return false;
  }
}

export default GameAPI;