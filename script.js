/**
 * script.js
 * 
 * Controls a game of Linear Nim with a simple AI player.
 */


// Create variables that refer to each of the HTML Elements that
// the player will interact with
const counter   = document.getElementById("tokens-left")
const take      = document.getElementById("take")
const ai        = document.getElementById("ai")
const status    = document.getElementById("status")
const playAgain = document.getElementById("play-again")

// Define the strings that will be used for feedback
const winner    = [ "You win!", "The AI wins!" ]
const ordinals  = [ "first", "second", "third" ]
const DELAY     = 1000

// Activate the playAgain button (which isn't in fact visible yet)
playAgain.addEventListener("click", playGame, false)



function playGame() {
  /* SET UP THE INTERFACE */
  // Hide the play again button (if it's was previously shown)
  playAgain.classList.remove("show")

  // (Re-)activate the take and ai buttons
  take.addEventListener("click", takeOne, false)
  ai.addEventListener("click", makeAIPlay, false)
  take.disabled = ai.disabled = false

  status.textContent = "Start the game. Take a token or let the AI play first."

  /* SET UP THE GAME */
  let tokensLeft  = 12
  let canTake     = 3
  let player  // initially undefined
  let aiTotal // will contain number of tokens AI plans to take

  counter.textContent = tokensLeft



  function makeAIPlay() {
    switchPlayer(1)
  }


  function takeOne() {
    if (player === undefined) {
      // The player clicked on "Take a token" to start the game
      player = 0 // you
    }

    // Reduce the number of tokens available
    canTake -= 1
    tokensLeft -=1
    counter.textContent = tokensLeft

    if (!tokensLeft) {
      // Game over
      const finalDelay = player ? DELAY : 0
      return setTimeout(showWinner, finalDelay)
    }

    if (!player) { // player is "you"
      // Explain what happens next
      showYourMove()
    }

    if (!canTake) {
      // Play switches automatically to the other player
      setTimeout(switchPlayer)
    }
  }


  function switchPlayer(makeAIPlay) {
    if (makeAIPlay) {
      // The user clicked on the Let the AI Play button
      player = 1

    } else {  
      // The current player has taken all the tokens that they are
      // allowed, or the AI has taken all the tokens it wants.
      player = (player + 1) % 2
    }

    // 
    take.disabled = player // disabled if it's the AI's turn
    ai.disabled = true   // the player must take at least 1 token

    if (player) {
      // The AI will try to take enough tokens to leave a multiple
      // of four, but the rules force the AI to take at least one
      aiTotal = tokensLeft % 4 || 1
      canTake = aiTotal

      const message = makeAIPlay
        ? '\u00a0' // "&nbsp;" might be shown as that exact string
        : "Now it's the AI's turn to play."
      status.textContent = message
    
      // Wait a little before making the AI's move, to give 
      // humans the time to follow the action
      setTimeout(playAIMove, DELAY)

    } else {
      canTake = 3
    }
  }


  function playAIMove() {
    // Determine how to describe the token that the AI is about
    // to take
    const taken = aiTotal - canTake // 0, 1 or 2
    const nth = ordinals[taken]

    // If the AI is not about to win, it might be the player's
    // turn next
    const yourTurn = canTake === 1 && tokensLeft > 1
      ? " It's your turn now."
      : ""

    // Be precise about the AI's first token, if it only plans
    // to take 1.
    const taking = aiTotal === 1
      ? "The AI takes just one token."
      : `The AI takes a ${nth} token.`

    const message = `${taking}${yourTurn}`
    status.textContent = message

    // Only actually take a token after displaying information
    // about what the AI plans to do
    takeOne()

    if (canTake) { // prepare to take again
      setTimeout(playAIMove, DELAY)
    } // else takeOne() will have passed the turn to the player
  }


  function showYourMove() {
    // Explain what the player can do now
    const quantifier = canTake === 1 ? "token" : "tokens"
    const canStop = canTake === 3
    const stop = canStop ? "." : " or let the AI play."
    const message = `You can take ${canTake} more ${quantifier}${stop}`
    status.textContent = message

    // Force the player to take at least one token by disabling
    // the ai button on the player's first move
    ai.disabled = canStop
  }


  function showWinner() {
    // Announce the winner
    status.textContent =  winner[player]

    // Deactivate the take and ai buttons
    take.disabled = ai.disabled = true
    take.removeEventListener("click", takeOne, false)
    ai.removeEventListener("click", makeAIPlay, false)

    // Show the playAgain button
    playAgain.classList.add("show")
  }
}


playGame()