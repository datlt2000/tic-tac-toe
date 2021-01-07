# tic-tac-toe
language: react native
tic tac toe 3x3
2 mode: 1 player
        2 player
with 1 player use scoring algorithm:
  X: player
  O: computer
  
  score: X: -3 point
         O: 1 point
         null: 0 point
  in every 3-linear cell (3lc) caculate score:
  find max score and min score (in which max score different from -1 and -5) and save index of max and min:
  if(max == 3) => O won;
  else if(max == 2) => next hop is null cell which in max 3lc
  else if(min == -6) => next hop is null cell which in min 3lc
  else if(max == 1 or max == 0) random null cell which in max 3lc
