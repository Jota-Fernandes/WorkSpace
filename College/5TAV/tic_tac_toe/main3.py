import random
import matplotlib.pyplot as plt

Q = {}
epsilon = 0.9
epsilon_decay = 0.995 
learning_rate = 0.1
discount_factor = 0.9

def atualizar_q_table(estado, acao, recompensa, novo_estado):
    if estado not in Q:
        Q[estado] = [0] * 9
    if novo_estado not in Q:
        Q[novo_estado] = [0] * 9
    Q[estado][acao] += learning_rate * (recompensa + discount_factor * max(Q[novo_estado]) - Q[estado][acao])

def imprimir_tabuleiro(tabuleiro): 
    for i in range(0, 9, 3): 
        print('|'.join(tabuleiro[i:i+3]))
        print()

def maquina_jogar(jogador, tabuleiro, random_player=False):
    estado = tuple(tabuleiro)
    posicoes_vazias = [i for i in range(9) if tabuleiro[i] == ' ']

    global epsilon
    if random_player or random.random() < epsilon:  # Taxa de exploração
        posicao = random.choice(posicoes_vazias)
    else:  
        posicoes_q = [Q.get(estado, [0] * 9)[i] for i in posicoes_vazias]
        posicao = posicoes_vazias[posicoes_q.index(max(posicoes_q))]
    
    tabuleiro[posicao] = jogador
    return tabuleiro, posicao

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

tabuleiro = [' ' for _ in range(9)]
jogador1 = 'X'
jogador2 = 'O'
vitoria = 0
derrota = 0
empate = 0

qtdPartida = int(input("Quantas partidas? "))

resultados = []
vitorias_acumuladas = []
derrotas_acumuladas = []
empates_acumulados = []

for i in range(qtdPartida):
    estado_anterior = None
    acao_anterior = None
    while True:
        tabuleiro, posicao2 = maquina_jogar(jogador2, tabuleiro, random_player=True)
        
        #imprimir_tabuleiro(tabuleiro)
        
        if verificar_vencedor(jogador1, tabuleiro):
            vitoria += 1
            resultados.append('Vitória')
            if estado_anterior is not None:
                atualizar_q_table(estado_anterior, acao_anterior, 1, tuple(tabuleiro)) 
            tabuleiro = [' ' for _ in range(9)]
            break
        elif verificar_empate(tabuleiro):
            empate += 1
            resultados.append('Empate')
            if estado_anterior is not None:
                atualizar_q_table(estado_anterior, acao_anterior, 0.5, tuple(tabuleiro))
            tabuleiro = [' ' for _ in range(9)]
            break
        
        if estado_anterior is not None:
            atualizar_q_table(estado_anterior, acao_anterior, 0, tuple(tabuleiro)) 
        estado_anterior = tuple(tabuleiro)
        acao_anterior = posicao2

        #posicao do primeiro
        tabuleiro, posicao1 = maquina_jogar(jogador1, tabuleiro)
        #imprimir_tabuleiro(tabuleiro)

        if verificar_vencedor(jogador2, tabuleiro):
            derrota += 1
            resultados.append('Derrota')
            atualizar_q_table(estado_anterior, acao_anterior, -5, tuple(tabuleiro))  # Recompensa negativa para derrota
            tabuleiro = [' ' for _ in range(9)]
            break
        elif verificar_empate(tabuleiro):
            empate += 1
            resultados.append('Empate')
            atualizar_q_table(estado_anterior, acao_anterior, 0.5, tuple(tabuleiro))  # Recompensa neutra para empate
            tabuleiro = [' ' for _ in range(9)]
            break
        
        atualizar_q_table(estado_anterior, acao_anterior, 0, tuple(tabuleiro))
        estado_anterior = tuple(tabuleiro)
        acao_anterior = posicao1

    vitorias_acumuladas.append(vitoria)
    derrotas_acumuladas.append(derrota)
    empates_acumulados.append(empate)
    
    # Decay the exploration rate
    epsilon = max(0.1, epsilon * epsilon_decay)

# Cálculo das porcentagens
porcentagem_vitoria = (vitoria / qtdPartida) * 100
porcentagem_empate = (empate / qtdPartida) * 100
porcentagem_derrota = (derrota / qtdPartida) * 100

relatorio_partidas = "\n".join([f"Partida {i+1}: {resultado}" for i, resultado in enumerate(resultados)])

print(f"Relatório de Resultados por Partida:\n{relatorio_partidas}")

partidas = list(range(1, qtdPartida + 1))

plt.figure(figsize=(10, 5))
plt.plot(partidas, vitorias_acumuladas, label='Vitórias Acumuladas', color='green')
plt.plot(partidas, derrotas_acumuladas, label='Derrotas Acumuladas', color='red')
plt.plot(partidas, empates_acumulados, label='Empates Acumulados', color='blue')
plt.xlabel('Partidas')
plt.ylabel('Resultados Acumulados')
plt.title('Resultados Acumulados das Partidas')
plt.legend()
plt.grid(True)
plt.savefig('resultados_partidas.png')
plt.show()
