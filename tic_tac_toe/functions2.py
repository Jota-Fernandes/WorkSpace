import random

#função para imprimir o tabuleiro
def imprimir_tabuleiro(tabuleiro): 
    for i in range(0, 9, 3): 
        print('|'.join(tabuleiro[i:i+3])) 
        print('-' * 5)

#função para o jogador
def maquina_jogar(tabuleiro):
    posicoes_vazias = [i for i in range(9) if tabuleiro[i] == '']
    if posicoes_vazias:
        posicao = random.choice(posicoes_vazias)
        tabuleiro[posicao] = 'o'

#função para verificar se há um vencedor
def verificar_vencedor(jogador, tabuleiro):
    combinacoes_vencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]                
    ]

    for combinacao in combinacoes_vencedoras:
        if all(tabuleiro[i] == jogador for i in combinacao):
            return True
        return False