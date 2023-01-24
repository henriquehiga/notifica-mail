# Notifica
A aplicação de mala direta permite que os usuários notifiquem seus clientes sobre novidades através de e-mails e armazede os emails enviados. Construído usando Node.js, TypeScript, arquitetura limpa e RabbitMQ como gerenciador de filas.

## Características
- Envio de e-mails em massa para clientes através de uma fila de envio usando RabbitMQ
- Personalização de e-mails com dados do cliente
- Gerenciamento de listas de contatos

# Observações
O projeto utiliza a implementação de RabbitMQ para gerenciamento da fila e Nodemailer para o envio de e-mails. É importante haver um gerenciador de fila sendo executado para que a aplicação funcione corretamente.