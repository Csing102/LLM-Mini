class NLP {
  constructor() {
    this.vocabulary = {};
    this.tokenizer = new Tokenizer();
  }

  tokenize(text) {
    return this.tokenizer.tokenize(text);
  }

  addWord(word) {
    this.vocabulary[word] = true;
  }

  removeWord(word) {
    delete this.vocabulary[word];
  }

  containsWord(word) {
    return this.vocabulary[word] === true;
  }

  train(data) {
    const tokens = this.tokenize(data);
    tokens.forEach(token => {
      this.addWord(token);
    });
    return { message: 'Training complete' };
  }
}

class Tokenizer {
  tokenize(text) {
    return text.split(' ');
  }
}

module.exports = NLP;
