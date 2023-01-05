document.addEventListener('DOMContentLoaded', () => {

let score = 0;
let time = 15;


  
  $('#submitBtn').on('click', function(e){
    e.preventDefault();
    const $inputValue = $('#inputVal').val();
    getSubmittedWord($inputValue);
    $('#inputForm').trigger('reset');
  })

async function getSubmittedWord(word){
  const res = await axios.get('/check_word', {
    params: {
      guess: `${word}`
    }
  });

  const {result} = res.data;
  if (result === 'not-word'){
    $('.wordMsg').text(`${word} is not a valid word`)
  }else if (result === 'not-on-board'){
    $('.wordMsg').text(`${word} is not a valid word on this board`)
  }else {
    $('.wordMsg').text(`Yay! You found: ${word}`)
    score += word.length;
    $('.score').text(score)
  }
}


async function countDown(){
  time --
  $('.timer').text(time)
  
  if(time === 0){
    clearInterval(timerId)
    await sendScore()
    $('#inputForm').hide()
    $('.wordMsg').hide()
  }
}  

let timerId = setInterval(countDown, 1000)


async function sendScore(){
  const res = await axios.post('/post_stat', {
      'score': score
    
  })
  if (res.result){
    $('.resultMsg').text(`New high score: ${score}`)
  }else{
    $('.resultMsg').text(`Final score: ${score}`)
  }
  
}


})