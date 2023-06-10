$(function () {
  $(document).scroll(function () {
    var $nav = $('#mainNavbar');
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

function rpsGame(yourChoice) {
  // yourChoice is an object from html this
  let result, printMessage;
  const humanChoice = yourChoice.id;
  const virtualArray = ['rock', 'paper', 'scissor'];
  const virtualChoice = virtualArray[Math.floor(Math.random() * 3)];

  console.log(`${humanChoice}, ${virtualChoice}`);

  //[0,1] human lost | virtual won
  result = decideWinner(humanChoice, virtualChoice);

  //{'message' :'You Won','color' : 'green'}
  printMessage = finalMessage(result);
  console.log(printMessage);

  rpsFrontEnd(humanChoice, virtualChoice, printMessage);
}

function decideWinner(human, virtual) {
  const rpsDataSet = {
    rock: { scissor: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissor: 0 },
    scissor: { paper: 1, scissor: 0.5, rock: 0 },
  };

  const humanScore = rpsDataSet[human][virtual];
  const virtualScore = rpsDataSet[virtual][human];

  return [humanScore, virtualScore];
}

function finalMessage([humanScore, virtualScore]) {
  let resultObject = {};
  if (humanScore === 0) {
    resultObject = { message: 'You Lost!', color: 'red' };
  } else if (humanScore === 1) {
    resultObject = { message: 'You Won!', color: 'green' };
  } else {
    resultObject = { message: 'You Tied!', color: 'gray' };
  }

  return resultObject;
}

function rpsFrontEnd(humanChoice, virtualChoice, messageObject) {
  let imageContainer = document.querySelector('#project');

  const imageDataSet = {
    rock: document.querySelector('#rock').src,
    paper: document.querySelector('#paper').src,
    scissor: document.querySelector('#scissor').src,
  };

  //let's remove all images when clicked

  document.querySelector('.image').remove();

  imageContainer.style.display = 'flex';

  let humanImage = document.createElement('img');
  let virtualImage = document.createElement('img');
  let messageDiv = document.createElement('div');

  humanImage.src = imageDataSet[humanChoice];
  humanImage.style.boxShadow = '0px 10px 50px rgba(0, 112, 255, 0.5)';
  imageContainer.append(humanImage);

  messageDiv.innerText = messageObject.message;
  messageDiv.style.color = messageObject.color;
  messageDiv.style.fontSize = '50px';
  messageDiv.style.marginTop = '20vh';
  imageContainer.append(messageDiv);

  virtualImage.src = imageDataSet[virtualChoice];
  virtualImage.style.boxShadow = '0px 10px 50px rgba(255, 0, 0, 0.5)';
  imageContainer.append(virtualImage);
}
