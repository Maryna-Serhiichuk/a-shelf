const readline = require('readline');

class ConsoleReader {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  ask(question) {
    return new Promise(resolve => {
      this.rl.question(question, answer => {
        resolve(answer);
        this.rl.close();
      });
    });
  }
}

module.exports = ConsoleReader;