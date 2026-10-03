# Gerador de QR

Site estático para colar um link e baixar o QR code em PNG. O código é gerado no navegador; o link não é enviado a nenhum servidor.

## Publicar no GitHub Pages

1. Crie um repositório público no GitHub, por exemplo `gerador-qr`.
2. Envie este projeto para a branch `main`.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, depois salve.
6. Alguns minutos depois o site fica em `https://SEU-USUARIO.github.io/gerador-qr/`.

Mande esse endereço para quem for usar. Funciona no celular.

A geração usa a biblioteca [qrcode](https://github.com/soldair/node-qrcode) (MIT), incluída em `qrcode.js`.
