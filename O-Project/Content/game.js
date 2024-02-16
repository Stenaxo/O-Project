function levenshtein(a, b) {
    var tmp;
    if (a.length === 0) { return b.length; }
    if (b.length === 0) { return a.length; }
    if (a.length > b.length) { tmp = a; a = b; b = tmp; }
  
    var i, j, res, alen = a.length, blen = b.length, row = Array(alen);
    for (i = 0; i <= alen; i++) { row[i] = i; }
  
    for (i = 1; i <= blen; i++) {
      res = i;
      for (j = 1; j <= alen; j++) {
        tmp = row[j - 1];
        row[j - 1] = res;
        res = b[i - 1] === a[j - 1] ? tmp : Math.min(tmp + 1, Math.min(res + 1, row[j] + 1));
      }
    }
    return res;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
      var submitButton = document.querySelector('.submit-button');
      var inputField = document.querySelector('.input-field');
  
      inputField.addEventListener('keydown', function(event) {
          if (event.key === "Enter") {
              event.preventDefault();
              submitButton.click();
          }
      });
  
      submitButton.addEventListener('click', function() {
          var userInput = inputField.value.toLowerCase();
          document.querySelectorAll('.word span').forEach(function(span) {
              var text = span.textContent.toLowerCase().trim();
              // Acceptez le mot si la distance de Levenshtein est de 1 ou moins
              if(levenshtein(text, userInput) <= 1) {
                  span.parentNode.querySelector('.mask').style.opacity = '0';
                  span.style.visibility = 'visible';
              }
          });
  
          var allFound = Array.from(document.querySelectorAll('.mask')).every(function(mask) {
              return mask.style.opacity === '0';
          });
  
          if(allFound) {
              document.getElementById('congratulations-popup').style.display = 'flex';
          }
  
          inputField.value = '';
      });
  
      document.querySelectorAll('.hint-btn').forEach(button => {
          button.addEventListener('click', function() {
              var wordId = this.getAttribute('data-word');
              var hint = getHintById(wordId);
              document.getElementById('hint-text').textContent = hint;
              document.getElementById('hint-popup').style.display = 'flex';
          });
      });
  
      document.querySelectorAll('.close-btn').forEach(button => {
          button.addEventListener('click', function() {
              this.parentElement.parentElement.style.display = 'none';
          });
      });
  });
  
  function getHintById(wordId) {
      var hints = {
          "1": "Ce que tu es pour moi?",
          "2": "Les femmes à la...",
          "3": "Si on oublie l'aspect familial tu es ma...",
          "4": "Rappeur en commun.",
          "5": "Tu as un caractère de...",
          "6": "Tu t'énerves quand je dis que tu es une...",
          "7": "Ton plus gros avantage avec les garçons.",
          "8": "Tu es vraiment nulle dans ce domaine.",
          // Ajoutez d'autres indices ici selon vos mots
      };
      return hints[wordId];
  }
  