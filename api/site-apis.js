import { Website } from '../api/schema';
import { dotify } from '../utils';

const siteApis = (server) => {

  server.get('/api/site/:id', (req, res) => {
    Website.find({ route: req.params.id })
      .then(data => {
        if (!data.length) {
          res.status(404).send({})
        } else {
          res.status(200).send(data[0])
        }
      })
  })

  server.get('/api/list', (req, res) => {
    Website.find()
      .then(data => res.status(200).send(data))
  })

  server.post('/api/create', (req, res) => {
    const body = req.body;
    const website = new Website({ ...body, active: true });
    website.save()
      .then(() => Website.find())
      .then((data) => {
        res.status(200).send(data);
      })
  })

  server.post('/api/archive', (req, res) => {
    const body = req.body;
    Website.findOneAndUpdate({ _id: body.id }, { active: false })
      .then(() => Website.find())
      .then((data) => {
        res.status(200).send(data);
      })
  })

  server.put('/api/edit', (req, res) => {
    const body = req.body;
    const { __v, _id, ...payload } = body.data;

    Website.findOneAndUpdate({ route: body.id }, dotify(payload))
      .then(() => Website.find({ route: body.id }))
      .then(data => res.status(200).send(data[0]))
  })

  return server
}

export default siteApis
