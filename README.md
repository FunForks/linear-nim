# Linear Nim #

A demonstration of a game with a simple AI player, written in
HTML, CSS and JavaScript. If the human player makes a single mistake, the AI will definitely win.

[Demo](https://funforks.github.io/linear-nim)

Linear Nim is a [subtraction game](https://en.wikipedia.org/wiki/Nim#The_subtraction_game). The game starts with a given number of tokens in a heap (12 in this case). Players take turns to remove
between 1 and a certain maximum number (3 in this case). The
player who takes the last token is the winner.

The winning strategy is to always leave a multiple of the "maximum number plus one" (4 in this case). This is the strategy that the
AI uses. However, if the AI finds itself in a position where it
cannot legally take enough tokens to create a winning position for itself, it will take only one token.

You can therefore beat the AI if:
1. You force the AI to play first
2. You do not make a mistake in following the winning strategy