

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
    
def verificar_empate(tabuleiro):
    return all(pos != ' ' for pos in tabuleiro)