import Page from "./schema";

const pageApis = (server) => {

  server.get('/api/page/:id', (req, res) => {
    console.log(req.params);
    res.send('hello');
  })

  server.post('/api/create-page', (req, res) => {
    const { body } = req;
    const page = new Page(body);
    page.save()
      .then(() => Page.find())
      .then((data) => {
        res.status(200).send(data);
      })
  })

  return server;
}

export default pageApis;