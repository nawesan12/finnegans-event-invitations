export function confirmationEmailTemplate(name: string) {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmación de registro</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 24px;
      }
      .header {
        text-align: center;
        background-color: #222222;
        color: #ffffff;
        padding: 12px 0;
        font-size: 20px;
        font-weight: bold;
      }
      .footer {
        text-align: center;
        color: #888888;
        font-size: 12px;
        padding-top: 24px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Confirmación de registro</div>
      <p>Hola ${name}, tu registro al evento ha sido recibido. ¡Gracias por unirte!</p>
      <p>Esperamos verte pronto.</p>
      <div class="footer">&copy; ${new Date().getFullYear()} Finnegans. Todos los derechos reservados.</div>
    </div>
  </body>
</html>`;
}
