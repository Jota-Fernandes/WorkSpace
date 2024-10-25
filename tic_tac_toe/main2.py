# inteligente
import random
import functions

historico = 0

jogador1 = 'X'
jogador2 = 'O'
tabuleiro = ['  '] * 9 
vitorias = 0
derrotas = 0
empates = 0

disponiveis = list(range(9))

while True:
    jogador1 = random.randint(0, 8)
    while True:  
        if tabuleiro[jogador1] == '  ': 
            tabuleiro[jogador1] = "X"  
            #visualiza_tabuleiro(tabuleiro)
            if functions.verifica_vitoria(tabuleiro):
                print("Jogador 1 ganhou")
                vitorias += 1
                tabuleiro = ['  '] * 9  
                break
        
            if functions.verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9  
                break
            break
        
    jogador2 = random.randint(0, 8)  
    while True:
        if tabuleiro[jogador2] == '  ':  
            tabuleiro[jogador2] = "O" 
            #visualiza_tabuleiro(tabuleiro)
            if functions.verifica_vitoria(tabuleiro):
                print("Jogador 2 ganhou")
                derrotas += 1
                tabuleiro = ['  '] * 9 
                break

            if functions.verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9 
                break  
            break
    
    