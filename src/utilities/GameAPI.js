class GameAPI {

  static loadGame() {
    const savedGame = localStorage.getItem('qbnengine');
    if (savedGame) {
      return JSON.parse(savedGame);
    }
    return false;
  }
}

export default GameAPI;