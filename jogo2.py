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
    # Se não houver mais espaços vazios no tabuleiro, é empate
    return all(pos != '  ' for pos in tabuleiro)

def movimento_campeao(tabuleiro, jogador):
    # Combinações de vitória
    vitorias = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  
        [0, 4, 8], [2, 4, 6]
    ]
    
    adversario = 'O' if jogador == 'X' else 'X'  # Define o adversário

    # 1. Verifica se há uma jogada que completa uma linha de vitória
    for combinacao in vitorias:
        # Verifica se há duas posições marcadas pelo jogador e uma vazia
        posicoes = [tabuleiro[i] for i in combinacao]
        if posicoes.count(jogador) == 2 and posicoes.count('  ') == 1:
            return combinacao[posicoes.index('  ')]  # Retorna a posição vazia

    # 2. Verifica se há uma jogada onde o adversário pode ganhar e bloqueia
    for combinacao in vitorias:
        # Verifica se o adversário tem duas posições marcadas e uma vazia
        posicoes = [tabuleiro[i] for i in combinacao]
        if posicoes.count(adversario) == 2 and posicoes.count('  ') == 1:
            return combinacao[posicoes.index('  ')]  # Bloqueia a vitória do adversário

    # Se não há vitória imediata ou perigo, continua com a estratégia padrão
    cantos = [0, 2, 6, 8]
    lados = [1, 3, 5, 7]
    centro = 4

    # 3. Se o Campeão for o primeiro, ele escolhe um dos cantos
    if tabuleiro.count('X') == 0 and tabuleiro.count('O') == 0:
        return random.choice(cantos)

    # 4. Verifica o movimento do adversário e responde de acordo com a estratégia
    if tabuleiro[centro] == adversario:  # Se o adversário marcar o centro
        for canto in cantos:
            if tabuleiro[canto] == jogador:  # Marca o canto oposto ao primeiro movimento
                return 8 - canto
        # Se não puder marcar o canto oposto, tenta marcar outro canto livre
        for c in cantos:
            if tabuleiro[c] == '  ':
                return c
    else:  # Se o adversário marcar um dos lados ou outro canto
        for canto in cantos:
            if tabuleiro[canto] == jogador:
                # Tenta marcar o canto oposto ao dele
                canto_oposto = 8 - canto
                if tabuleiro[canto_oposto] == '  ':
                    return canto_oposto
                # Se não puder, marca outro canto livre
                for c in cantos:
                    if tabuleiro[c] == '  ':
                        return c

    # 5. Caso o adversário tenha colocado o O ao lado do centro, insira o segundo X em outro canto
    for posicao in lados + [centro]:
        if tabuleiro[posicao] == '  ':
            return posicao

    # Se nenhuma estratégia for aplicável, escolhe um movimento aleatório
    for posicao in lados:
        if tabuleiro[posicao] == '  ':
            return posicao

txt_entrada = """
    1 - aleatorio vs aleatorio
    2 - campeão vs aleatorio
    3 - campeão vs campeão
"""

contador = 1
tabuleiro = ['  '] * 9  # Tabuleiro inicial vazio

tipo_jogador = int(input(txt_entrada))
qtd_partidas = int(input("Ponha a quantidade de partidas: "))
vitorias = 0
derrotas = 0
empates = 0

while contador <= qtd_partidas:
   
    print(f"Partida Nº{contador}")


    if tipo_jogador == 1:
        while True:
            # Jogador 1 escolhe uma posição
            while True:
                jogador1 = random.randint(0, 8)  # Escolhe uma posição aleatória
                if tabuleiro[jogador1] == '  ':  # Verifica se a posição está vazia
                    tabuleiro[jogador1] = "X"  # Marca com 'X'
                    visualiza_tabuleiro(tabuleiro)
                    break  # Sai do loop se a posição for válida
           
            if verifica_vitoria(tabuleiro):
                print("Jogador 1 ganhou")
                vitorias += 1
                tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                break
           
            if verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                break
           
            # Jogador 2 escolhe uma posição
            while True:
                jogador2 = random.randint(0, 8)  # Escolhe uma posição aleatória
                if tabuleiro[jogador2] == '  ':  # Verifica se a posição está vazia
                    tabuleiro[jogador2] = "O"  # Marca com 'O'
                    visualiza_tabuleiro(tabuleiro)
                    break  # Sai do loop se a posição for válida
           
            if verifica_vitoria(tabuleiro):
                print("Jogador 2 ganhou")
                derrotas += 1
                tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                break
           
            if verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                break

    elif tipo_jogador == 2:
        while True:
            while True:
                # Jogador 1 (Campeão) faz sua jogada seguindo o esquema predefinido
                movimento = movimento_campeao(tabuleiro, 'X')
                tabuleiro[movimento] = "X"
                visualiza_tabuleiro(tabuleiro)
                break

            if verifica_vitoria(tabuleiro):
                print("Jogador 1 ganhou")
                vitorias += 1
                tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                break

            if verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                break


                # Jogador 2 (aleatório) faz sua jogada
            while True:
                jogador2 = random.randint(0, 8)  # Escolhe uma posição aleatória
                if tabuleiro[jogador2] == '  ':
                    tabuleiro[jogador2] = "O"
                    visualiza_tabuleiro(tabuleiro)
                    break

            if verifica_vitoria(tabuleiro):
                print("Jogador 2 ganhou")
                derrotas += 1
                tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                break

            if verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                break
        
    elif tipo_jogador == 3:
        while True:
            while True:
                # Jogador 1 (Campeão 1) faz sua jogada
                movimento1 = movimento_campeao(tabuleiro, 'X')
                tabuleiro[movimento1] = "X"
                visualiza_tabuleiro(tabuleiro)

                if verifica_vitoria(tabuleiro):
                    print("jogador 1 ganhou")
                    vitorias += 1
                    tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                    break

                if verifica_empate(tabuleiro):
                    print("Deu velha! Empate!")
                    empates += 1
                    tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                    break

                # Jogador 2 (Campeão 2) faz sua jogada
                movimento2 = movimento_campeao(tabuleiro, 'O')
                tabuleiro[movimento2] = "O"
                visualiza_tabuleiro(tabuleiro)

                if verifica_vitoria(tabuleiro):
                    print("Jogador 2 ganhou")
                    derrotas += 1
                    tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                    break

                if verifica_empate(tabuleiro):
                    print("Deu velha! Empate!")
                    empates += 1
                    tabuleiro = ['  '] * 9  # Reseta o tabuleiro para a próxima partida
                    break
            break

    relatorio = f"{vitorias}V / {empates}E / {derrotas}D"
    print(relatorio)
    contador += 1