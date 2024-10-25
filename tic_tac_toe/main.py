import random
import functions

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
           
            while True:
                jogador2 = random.randint(0, 8)  
                if tabuleiro[jogador2] == '  ':  
                    tabuleiro[jogador2] = "O" 
                    #visualiza_tabuleiro(tabuleiro)
                    break  
           
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

    elif tipo_jogador == 2:
        while True:
            while True:
                movimento = functions.movimento_campeao(tabuleiro, 'X')
                tabuleiro[movimento] = "X"
                #visualiza_tabuleiro(tabuleiro)
                break

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

            while True:
                jogador2 = random.randint(0, 8)
                if tabuleiro[jogador2] == '  ':
                    tabuleiro[jogador2] = "O"
                    #visualiza_tabuleiro(tabuleiro)
                    break

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
        

    elif tipo_jogador == 3:
        while True:
            while True:
                movimento1 = functions.movimento_campeao(tabuleiro, 'X')
                tabuleiro[movimento1] = "X"
                #visualiza_tabuleiro(tabuleiro)

                if functions.verifica_vitoria(tabuleiro):
                    print("jogador 1 ganhou")
                    vitorias += 1
                    tabuleiro = ['  '] * 9 
                    break

                if functions.verifica_empate(tabuleiro):
                    print("Deu velha! Empate!")
                    empates += 1
                    tabuleiro = ['  '] * 9  
                    break

                movimento2 = functions.movimento_campeao(tabuleiro, 'O')
                tabuleiro[movimento2] = "O"
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
        
    elif tipo_jogador == 4:
        while True:
            jogador1 = random.randint(0, 8)  
            if tabuleiro[jogador1] == '  ':  
                tabuleiro[jogador1] = "O"  
                #visualiza_tabuleiro(tabuleiro)
        
            if functions.verifica_vitoria(tabuleiro):
                print("Jogador 1 ganhou")
                derrotas += 1
                tabuleiro = ['  '] * 9  
                break
        
            if functions.verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9
                break
            
            movimento1 = functions.movimento_campeao(tabuleiro, 'X')
            if movimento1 is not None:
                tabuleiro[movimento1] = "X"
            #visualiza_tabuleiro(tabuleiro)

            if functions.verifica_vitoria(tabuleiro):
                print("jogador 2 ganhou")
                vitorias += 1
                tabuleiro = ['  '] * 9 
                break

            if functions.verifica_empate(tabuleiro):
                print("Deu velha! Empate!")
                empates += 1
                tabuleiro = ['  '] * 9  
                break
    elif tipo_jogador == 5:
        print('começou')

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
