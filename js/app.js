const myModule = (() => {
  "use strict";
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let results = [];
  let hits = [];
  let productSuccess;

  const btnReset = document.querySelector("#btnReset"),
    multiplier = document.querySelector("#multiplier"),
    multiplying = document.querySelector("#multiplying"),
    resultsContainer = document.querySelector("#resultsContainer"),
    msgConfirmation = document.querySelector("#msgConfirmation"),
    hitsContainer = document.querySelector("#hitsContainer")

  const start = () => {
    msgConfirmation.style.display = "none";
    resultsContainer.innerHTML = "";
    results = [];
    let opeMultiplier = numbers[Math.floor(Math.random() * 9)];
    let opeMultiplying = numbers[Math.floor(Math.random() * 9)];
    productSuccess = opeMultiplying * opeMultiplier;
    multiplier.innerHTML = opeMultiplier;
    multiplying.innerHTML = opeMultiplying;
    results.push(productSuccess);
    for (let i = 0; i < 10; i++) {
      results.push(Math.floor(Math.random() * 100));
    }
    addResults();
  };

  const validateOperation = (element) => {
    element = element.srcElement;
    if (productSuccess == parseInt(element.innerHTML)) {
      element.className = "result col mt-1 result-success";
      msgConfirmation.style.display = "block";
      setTimeout(() => {
        start();
      }, 1000);
      hits.push(1);
    } else {
      element.className = "result col mt-1 result-error";
      hits.push(0);
    }

    console.log();
    let opeMultiplier = parseInt(multiplier.textContent);
    let opeMultiplying = parseInt(multiplying.textContent);
  };

  const addResults = () => {
    shuffle(results).forEach((resultValue) => {
      const resultItem = document.createElement("div");
      resultItem.className = "result col mt-1";
      resultItem.innerHTML = resultValue;
      resultItem.addEventListener("click", (e) => {
        validateOperation(e);
        drawHits();
      });
      resultsContainer.append(resultItem);
    });
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const drawHits = ()=> {
    hitsContainer.innerHTML = "";
    hits.forEach(hit => {
      const hitElement = document.createElement('div');
      hitElement.className = (hit ) ? 'hit hit-success':'hit hit-error';
      hitsContainer.append(hitElement); 
    })

  }

  btnReset.addEventListener("click", () => {
    start();
    hits = [];
    drawHits();
  });

  start();
})();
