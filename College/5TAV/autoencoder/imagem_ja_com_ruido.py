import numpy as np
import matplotlib.pyplot as plt
import requests
from PIL import Image
from io import BytesIO
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, UpSampling2D, Cropping2D, ZeroPadding2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# Baixar a imagem ruidosa da internet
url = 'https://media.geeksforgeeks.org/wp-content/uploads/20190510181033/Screenshot-1841.png'
response = requests.get(url)
img_noisy = Image.open(BytesIO(response.content)).convert('L')  # Converte para escala de cinza

# Normalizar a imagem sem redimensionar
img_noisy = np.array(img_noisy).astype('float32') / 255.
original_shape = img_noisy.shape
img_noisy = np.expand_dims(img_noisy, axis=-1)  # Adicionar uma dimensão

# Definir a arquitetura do autoencoder
input_img = Input(shape=(original_shape[0], original_shape[1], 1))  # Ajuste conforme a forma das suas imagens

# Encoder
x = Conv2D(32, (3, 3), activation='relu', padding='same')(input_img)
x = MaxPooling2D((2, 2), padding='same')(x)
x = Conv2D(64, (3, 3), activation='relu', padding='same')(x)
encoded = MaxPooling2D((2, 2), padding='same')(x)

# Decoder
x = Conv2D(64, (3, 3), activation='relu', padding='same')(encoded)
x = UpSampling2D((2, 2))(x)
x = Conv2D(32, (3, 3), activation='relu', padding='same')(x)
x = UpSampling2D((2, 2))(x)

# Ajustar o número de canais para corresponder ao da entrada
decoded = Conv2D(1, (3, 3), activation='sigmoid', padding='same')(x)

# Ajuste final para garantir que a saída tenha o mesmo tamanho que a entrada
if decoded.shape[1] != original_shape[0] or decoded.shape[2] != original_shape[1]:
    crop_height = decoded.shape[1] - original_shape[0]
    crop_width = decoded.shape[2] - original_shape[1]
    decoded = Cropping2D(cropping=((0, crop_height), (0, crop_width)))(decoded)

autoencoder = Model(input_img, decoded)
autoencoder.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy')

# Para fins de exemplo, usar um conjunto de dados pequeno para o treino
x_train_small = np.array([img_noisy])
x_train_noisy_small = np.array([img_noisy])

# Treinar o autoencoder (ajuste o número de epochs conforme necessário)
autoencoder.fit(x_train_noisy_small, x_train_small, epochs=3000, batch_size=1, shuffle=True)

# Use o autoencoder para remover o ruído da imagem
denoised_img = autoencoder.predict(np.expand_dims(img_noisy, axis=0))

# Visualizar os resultados
plt.figure(figsize=(15, 5))

# Imagem Original
plt.subplot(1, 3, 2)
plt.imshow(img_noisy.reshape(original_shape[0], original_shape[1]), cmap='gray')
plt.title("Original")
plt.axis('off')

# Imagem Limpa pelo Autoencoder
plt.subplot(1, 3, 3)
plt.imshow(denoised_img.reshape(original_shape[0], original_shape[1]), cmap='gray')
plt.title("Denoised")
plt.axis('off')

plt.show()
