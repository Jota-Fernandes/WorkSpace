import random
import matplotlib.pyplot as plt

# Inicializando Q-table
Q = {}

# Função para atualizar a Q-table
def atualizar_q_table(estado, acao, recompensa, novo_estado):
    if estado not in Q:
        Q[estado] = [0] * 9
    if novo_estado not in Q:
        Q[novo_estado] = [0] * 9
    Q[estado][acao] += 0.1 * (recompensa + 0.9 * max(Q[novo_estado]) - Q[estado][acao])

# Função para imprimir o tabuleiro
def imprimir_tabuleiro(tabuleiro): 
    for i in range(0, 9, 3): 
        print('|'.join(tabuleiro[i:i+3]))
        print()  # Adiciona uma linha em branco entre as impressões

# Função para o jogador (máquina) jogar utilizando Q-learning
def maquina_jogar(jogador, tabuleiro):
    estado = tuple(tabuleiro)
    posicoes_vazias = [i for i in range(9) if tabuleiro[i] == ' ']

    if random.random() < 0.1:  # Taxa de exploração
        posicao = random.choice(posicoes_vazias)
    else:  # Exploração da Q-table
        posicoes_q = [Q.get(estado, [0] * 9)[i] for i in posicoes_vazias]
        posicao = posicoes_vazias[posicoes_q.index(max(posicoes_q))]
    
    tabuleiro[posicao] = jogador
    return tabuleiro, posicao

# Função para verificar se há um vencedor
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

# Função para verificar se há um empate
def verificar_empate(tabuleiro):
    return all(pos != ' ' for pos in tabuleiro)

# Main
tabuleiro = [' ' for _ in range(9)]
jogador1 = 'X'
jogador2 = 'O'
vitoria = 0
derrota = 0
empate = 0

qtdPartida = int(input("Quantas partidas? "))

# Armazenar os resultados de cada partida
vitorias = []
empates = []
derrotas = []

for i in range(qtdPartida):
    estado_anterior = None
    acao_anterior = None
    while True:
        tabuleiro, posicao1 = maquina_jogar(jogador1, tabuleiro)
        #imprimir_tabuleiro(tabuleiro)
        
        if verificar_vencedor(jogador1, tabuleiro):
            vitoria += 1
            vitorias.append(vitoria)
            empates.append(empate)
            derrotas.append(derrota)
            if estado_anterior is not None:
                atualizar_q_table(estado_anterior, acao_anterior, 1, tuple(tabuleiro))  # Recompensa positiva para vitória
            tabuleiro = [' ' for _ in range(9)]
            break
        elif verificar_empate(tabuleiro):
            empate += 1
            empates.append(empate)
            vitorias.append(vitoria)
            derrotas.append(derrota)
            if estado_anterior is not None:
                atualizar_q_table(estado_anterior, acao_anterior, 0.5, tuple(tabuleiro))  # Recompensa neutra para empate
            tabuleiro = [' ' for _ in range(9)]
            break
        
        if estado_anterior is not None:
            atualizar_q_table(estado_anterior, acao_anterior, 0, tuple(tabuleiro))  # Recompensa neutra para continuar o jogo
        estado_anterior = tuple(tabuleiro)
        acao_anterior = posicao1

        tabuleiro, posicao2 = maquina_jogar(jogador2, tabuleiro)
        #imprimir_tabuleiro(tabuleiro)

        if verificar_vencedor(jogador2, tabuleiro):
            derrota += 1
            derrotas.append(derrota)
            vitorias.append(vitoria)
            empates.append(empate)
            atualizar_q_table(estado_anterior, acao_anterior, -1, tuple(tabuleiro))  # Recompensa negativa para derrota
            tabuleiro = [' ' for _ in range(9)]
            break
        elif verificar_empate(tabuleiro):
            empate += 1
            empates.append(empate)
            vitorias.append(vitoria)
            derrotas.append(derrota)
            atualizar_q_table(estado_anterior, acao_anterior, 0.5, tuple(tabuleiro))  # Recompensa neutra para empate
            tabuleiro = [' ' for _ in range(9)]
            break
        
        atualizar_q_table(estado_anterior, acao_anterior, 0, tuple(tabuleiro))
        estado_anterior = tuple(tabuleiro)
        acao_anterior = posicao2

# Cálculo das porcentagens
porcentagem_vitoria = (vitoria / qtdPartida) * 100
porcentagem_empate = (empate / qtdPartida) * 100
porcentagem_derrota = (derrota / qtdPartida) * 100

# Relatório de resultados
relatorio = f"""
Resultados após {qtdPartida} partidas:
    {vitoria} Vitórias ({porcentagem_vitoria:.2f}%)
    {empate} Empates ({porcentagem_empate:.2f}%)
    {derrota} Derrotas ({porcentagem_derrota:.2f}%)
"""
print(relatorio)

# Gerar gráfico dos resultados
partidas = list(range(1, qtdPartida + 1))
plt.figure(figsize=(10, 5))
plt.plot(partidas, vitorias, marker='o', linestyle='-', color='green', label='Vitórias acumuladas')
plt.plot(partidas, empates, marker='o', linestyle='-', color='blue', label='Empates acumulados')
plt.plot(partidas, derrotas, marker='o', linestyle='-', color='red', label='Derrotas acumuladas')
plt.xlabel('Partidas')
plt.ylabel('Número Acumulado')
plt.title('Relação Partida x Resultados')
plt.legend()
plt.grid(True)
plt.savefig('relacao_partida_resultados.png')  # Salvar o gráfico como um arquivo PNG
plt.show()
