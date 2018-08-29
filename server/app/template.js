export default html =>
  `<!DOCTYPE html>
<html lang="en">  
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="Description" content="Paws is a community for pet lovers to share and view pictures of pets while serving as a platform to aid the adoption of animals in need. As you browse through thousands of pictures of pets, Paws will occasionally suggest pets near you available for adoption based on your preferences.">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Font+Name">
        <title>Forever Paws</title>
        <link rel="manifest" href="/manifest.json">
        <link rel="paw-touch-icon" href="../../src/Images/icons/paw-48.png" sizes="48x48">
    </head>
    <body>
        <div id="app">${html}</div>
        <script type="text/javascript" src="dist/bundle.js"></script>
        <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
          console.log('ServiceWorker registration failed: ', err);
        }).catch(function (err) {
          console.log(err)
        });
      });
    } else {
      console.log('service worker is not supported');
    }
  </script>
    </body>
</html>`;
