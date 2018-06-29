const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', function (req, res) {
    res.send('GET request to the homepage');
  });

app.post('/', function (req, res) {

/*
Если в сессии нет данных -> вопрос №1
Если в сессии нет данных -> вопрос №1, но есть совпадение с городом -> записываем город и отправляем сообщение №2 (спрашиваем про скорость)
Если записан город, и в сообщении скорость -> записываем скорость и предлагаем тариф
Если записан город, и в сообщении скорость
*/

  if (req.body.request.command == "no text")
  {
    res.json({
      version: req.body.version,
      session: req.body.session,
      response: {
        text: "",
        end_session: false,
      },
    });
  }

  else if (req.body.request.command == "no version")
  {
    res.json({
      session: req.body.session,
      response: {
        text: req.body.request.command || 'Hello!',
        end_session: false,
      },
    });
  }

  else if (req.body.request.command == "no session")
  {
    res.json({
      version: req.body.version,
      response: {
        text: req.body.request.command || 'Hello!',
        end_session: false,
      },
    });
  }

  else if (req.body.request.command == "end session")
  {
    res.json({
      version: req.body.version,
      session: req.body.session,
      response: {
        text: req.body.request.command || 'Hello!',
        end_session: true,
      },
    });
  }

  else 
  {
    res.json({
      version: req.body.version,
      session: req.body.session,
      city: 'Perm',
        response: {
          text: req.body.request.command || 'Hello!',
          
          end_session: false,
        },
    })
  ;}
});

app.use('*', function (req, res) {
  res.sendStatus(404);
});

app.listen(port);