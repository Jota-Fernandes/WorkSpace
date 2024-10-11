import random

def visualiza_tabuleiro(tabuleiro):
    # Substitui as posições vazias ('') por espaços
    tabuleiro_formatado = [pos if pos != '  ' else '\u00A0' for pos in tabuleiro]  # Use \u00A0 para representar o "espaço" visual
    print(f"""
    {tabuleiro_formatado[0]} | {tabuleiro_formatado[1]} | {tabuleiro_formatado[2]}
    ---------
    {tabuleiro_formatado[3]} | {tabuleiro_formatado[4]} | {tabuleiro_formatado[5]}
    ---------
    {tabuleiro_formatado[6]} | {tabuleiro_formatado[7]} | {tabuleiro_formatado[8]}
    """)


def verifica_vitoria(tabuleiro):
    vitorias = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  
        [0, 4, 8], [2, 4, 6]              
    ]
    for combinacao in vitorias:
        if tabuleiro[combinacao[0]] == tabuleiro[combinacao[1]] == tabuleiro[combinacao[2]] != '  ':
            return True
    return False


def verifica_empate(tabuleiro):
    return all(pos != '  ' for pos in tabuleiro)

def movimento_campeao(tabuleiro, jogador):
    vitorias = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  
        [0, 4, 8], [2, 4, 6]
    ]

    adversario = 'O' if jogador == 'X' else 'X'  
    for combinacao in vitorias:
        posicoes = [tabuleiro[i] for i in combinacao]
        if posicoes.count(jogador) == 2 and posicoes.count('  ') == 1:
            return combinacao[posicoes.index('  ')] 
    for combinacao in vitorias:
        posicoes = [tabuleiro[i] for i in combinacao]
        if posicoes.count(adversario) == 2 and posicoes.count('  ') == 1:
            return combinacao[posicoes.index('  ')] 

    cantos = [0, 2, 6, 8]
    lados = [1, 3, 5, 7]
    centro = 4

    if tabuleiro.count('X') == 0 and tabuleiro.count('O') == 0:
        return random.choice(cantos)

    if tabuleiro[centro] == adversario: 
        for canto in cantos:
            if tabuleiro[canto] == jogador:  
                return 8 - canto
        for c in cantos:
            if tabuleiro[c] == '  ':
                return c
    else: 
        for canto in cantos:
            if tabuleiro[canto] == jogador:
                canto_oposto = 8 - canto
                if tabuleiro[canto_oposto] == '  ':
                    return canto_oposto
                for c in cantos:
                    if tabuleiro[c] == '  ':
                        return c

    #Caso o adversário tenha colocado o O ao lado do centro, insira o segundo X em outro canto
    for posicao in lados + [centro]:
        if tabuleiro[posicao] == '  ':
            return posicao

    #Se nenhuma estratégia for aplicável, escolhe um movimento aleatório
    for posicao in lados:
        if tabuleiro[posicao] == '  ':
            return posicao


txt_entrada = """
    1 - aleatorio vs aleatorio
    2 - campeão vs aleatorio
    3 - campeão vs campeão
    4 - aleatorio vs campeao
    Escolha uma opcao: """

contador = 1
tabuleiro = ['  '] * 9 

tipo_jogador = int(input(txt_entrada))
qtd_partidas = int(input("Ponha a quantidade de partidas: "))
vitorias = 0
derrotas = 0
empates = 0

while contador <= qtd_partidas:
   
    print(f"Partida Nº{contador}")


    if tipo_jogador == 1:
        while True:
          
            while True:
                jogador1 = random.randint(0, 8)  
                if tabuleiro[jogador1] == '  ': 
                    tabuleiro[jogador1] = "X"  
                    #visualiza_tabuleiro(tabuleiro)
                    break 
           
            if verifica_vitoria(tabuleiro):
                print("Jogador 1 ganhou")
                vitorias += 1
                tabuleiro = ['  '] * 9  
                break
           
            if verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9  
                break
           
            while True:
                jogador2 = random.randint(0, 8)  
                if tabuleiro[jogador2] == '  ':  
                    tabuleiro[jogador2] = "O" 
                    #visualiza_tabuleiro(tabuleiro)
                    break  
           
            if verifica_vitoria(tabuleiro):
                print("Jogador 2 ganhou")
                derrotas += 1
                tabuleiro = ['  '] * 9 
                break
           
            if verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9 
                break

    elif tipo_jogador == 2:
        while True:
            while True:
                movimento = movimento_campeao(tabuleiro, 'X')
                tabuleiro[movimento] = "X"
                #visualiza_tabuleiro(tabuleiro)
                break

            if verifica_vitoria(tabuleiro):
                print("Jogador 1 ganhou")
                vitorias += 1
                tabuleiro = ['  '] * 9 
                break

            if verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9 
                break

            while True:
                jogador2 = random.randint(0, 8)
                if tabuleiro[jogador2] == '  ':
                    tabuleiro[jogador2] = "O"
                    #visualiza_tabuleiro(tabuleiro)
                    break

            if verifica_vitoria(tabuleiro):
                print("Jogador 2 ganhou")
                derrotas += 1
                tabuleiro = ['  '] * 9 
                break

            if verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9 
                break
        

    elif tipo_jogador == 3:
        while True:
            while True:
                movimento1 = movimento_campeao(tabuleiro, 'X')
                tabuleiro[movimento1] = "X"
                #visualiza_tabuleiro(tabuleiro)

                if verifica_vitoria(tabuleiro):
                    print("jogador 1 ganhou")
                    vitorias += 1
                    tabuleiro = ['  '] * 9 
                    break

                if verifica_empate(tabuleiro):
                    print("Deu velha! Empate!")
                    empates += 1
                    tabuleiro = ['  '] * 9  
                    break

                movimento2 = movimento_campeao(tabuleiro, 'O')
                tabuleiro[movimento2] = "O"
                #visualiza_tabuleiro(tabuleiro)

                if verifica_vitoria(tabuleiro):
                    print("Jogador 2 ganhou")
                    derrotas += 1
                    tabuleiro = ['  '] * 9  
                    break

                if verifica_empate(tabuleiro):
                    print("Deu velha! Empate!")
                    empates += 1
                    tabuleiro = ['  '] * 9
                    break
            break
        
    elif tipo_jogador == 4:
        while True:
            jogador1 = random.randint(0, 8)  
            if tabuleiro[jogador1] == '  ':  
                tabuleiro[jogador1] = "O"  
                #visualiza_tabuleiro(tabuleiro)

        
            if verifica_vitoria(tabuleiro):
                print("Jogador 1 ganhou")
                derrotas += 1
                tabuleiro = ['  '] * 9  
                break
        
            if verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9
                break
            
            movimento1 = movimento_campeao(tabuleiro, 'X')
            if movimento1 is not None:
                tabuleiro[movimento1] = "X"
            #visualiza_tabuleiro(tabuleiro)

            if verifica_vitoria(tabuleiro):
                print("jogador 2 ganhou")
                vitorias += 1
                tabuleiro = ['  '] * 9 
                break

            if verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9  
                break

    contador += 1
            
    
if qtd_partidas > 0:
    perc_vitoria = (vitorias / qtd_partidas) * 100 if vitorias > 0 else 0
    perc_empate = (empates / qtd_partidas) * 100 if empates > 0 else 0
    perc_derrota = (derrotas / qtd_partidas) * 100 if derrotas > 0 else 0
else:
    perc_vitoria = perc_empate = perc_derrota = 0

relatorio = f"""
{vitorias}V / {empates}E / {derrotas}D
---------------------------------------
{round(perc_vitoria, 1)}% / {round(perc_empate, 1)}% / {round(perc_derrota, 1)}%
"""

print(relatorio)
