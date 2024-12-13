import numpy as np
import matplotlib.pyplot as plt
import requests
from PIL import Image
from io import BytesIO
from tensorflow.keras.layers import Input, Dense, Conv2D, MaxPooling2D, UpSampling2D
from tensorflow.keras.models import Model

# Baixar a imagem da internet
url = 'https://www.pintarecolorir.com.br/imagem/modelos-gato-desenhar/desenho-simples-gato-sentado-sorrindo.png'
response = requests.get(url)
img = Image.open(BytesIO(response.content)).convert('L')  # Converte para escala de cinza

# Normalizar a imagem sem redimensionar
img = np.array(img).astype('float32') / 255.
original_shape = img.shape
img = np.expand_dims(img, axis=-1)  # Adicionar uma dimensão

# Adicionar ruído à imagem
def add_noise(image, noise_factor=0.5):
    noisy_image = image + noise_factor * np.random.normal(loc=0.0, scale=1.0, size=image.shape)
    noisy_image = np.clip(noisy_image, 0., 1.)
    return noisy_image

noisy_img = add_noise(img)

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
decoded = Conv2D(1, (3, 3), activation='sigmoid', padding='same')(x)

autoencoder = Model(input_img, decoded)
autoencoder.compile(optimizer='adam', loss='binary_crossentropy')

# Para fins de exemplo, usar um conjunto de dados pequeno para o treino
x_train_small = np.array([img])
x_train_noisy_small = np.array([noisy_img])

# Treinar o autoencoder (ajuste o número de epochs conforme necessário)
autoencoder.fit(x_train_noisy_small, x_train_small, epochs=300, batch_size=1, shuffle=True)

denoised_img = autoencoder.predict(np.expand_dims(noisy_img, axis=0))

# Visualizar os resultados
plt.figure(figsize=(15, 5))

# Imagem Ruidosa
plt.subplot(1, 3, 1)
plt.imshow(noisy_img.reshape(original_shape[0], original_shape[1]), cmap='gray')
plt.title("Noisy")
plt.axis('off')

# Imagem Original
plt.subplot(1, 3, 2)
plt.imshow(img.reshape(original_shape[0], original_shape[1]), cmap='gray')
plt.title("Original")
plt.axis('off')

# Imagem Limpa pelo Autoencoder
plt.subplot(1, 3, 3)
plt.imshow(denoised_img.reshape(original_shape[0], original_shape[1]), cmap='gray')
plt.title("Denoised")
plt.axis('off')

plt.show()
