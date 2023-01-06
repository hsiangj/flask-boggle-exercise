document.addEventListener('DOMContentLoaded', () => {

class BoggleGame {
  constructor(time=60){
    this.time = time;
    this.score = 0;
    this.showTimer();
    this.words = new Set();
    this.timerId = setInterval(this.countDown.bind(this), 1000)
    $('#submitBtn').on('click', this.getSubmittedWord.bind(this))
  }
    
  showTimer(){
    $('.timer').text(this.time)
  }

  // Handle time countdown and update timer in DOM
  async countDown(){
    this.time --
    $('.timer').text(this.time)
    
    if(this.time === 0){
      clearInterval(this.timerId)
      await this.sendScore()
      $('#inputForm').hide()
      $('.wordMsg').hide()
    }
  }  
  

  // At end of game, send score to server and update result message.
  async sendScore(){
    const res = await axios.post('/post_stat', {
        'score': this.score
    })
    if (res.result){
      $('.resultMsg').text(`New high score: ${this.score}`)
    }else{
      $('.resultMsg').text(`Final score: ${this.score}`)
    }
  }

  // Retrieve word submitted. If valid, update score. 
  async getSubmittedWord(e){
    e.preventDefault();
    const $inputValue = $('#inputVal').val();
    const res = await axios.get('/check_word', {
      params: {
        guess: `${$inputValue}`
      }
    });
  
    const {result} = res.data;
    if (result === 'not-word'){
      $('.wordMsg').text(`${$inputValue} is not a valid word`)
    }else if (result === 'not-on-board'){
      $('.wordMsg').text(`${$inputValue} is not a valid word on this board`)
    }else if((result === 'ok' && this.words.has($inputValue))){
      $('.wordMsg').text(`You've already found: ${$inputValue}!`)
    }else {
      $('.wordMsg').text(`Yay! You found: ${$inputValue}`)
      this.score += $inputValue.length;
      this.words.add($inputValue)
      $('.score').text(this.score)
    }
  
    $('#inputForm').trigger('reset');
  }
}
let game = new BoggleGame(60) 

})