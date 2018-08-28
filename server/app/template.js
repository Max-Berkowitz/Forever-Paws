export default html =>
  `<!DOCTYPE html>
<html lang="en">  
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="Description" content="Paws is a community for pet lovers to share and view pictures of pets while serving as a platform to aid the adoption of animals in need. As you browse through thousands of pictures of pets, Paws will occasionally suggest pets near you available for adoption based on your preferences.">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Font+Name">
        <title>Forever Paws</title>
    </head>
    <body>
        <div id="app">${html}</div>
        <script type="text/javascript" src="dist/bundle.js"></script>
    </body>
</html>`;
