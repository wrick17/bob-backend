import { Website } from '../api/schema';
import { dotify } from '../utils';
import fetch from 'node-fetch';
import superagent from 'superagent'

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

  server.get('/api/poop', (req, res) => {
    const getVenueData = (siteId, venueId) => {
      fetch(`https://sandbox.tn-apis.com/catalog/v1/venues/${venueId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer 8c24d5ac-0337-349c-a3b0-17cedb44f455',
          'x-listing-context': `website-config-id=${siteId}`,
        }
      })
        .then(res => res.text())
        .then(data => console.log(data))
        .catch(err => err)

      // superagent.get(`https://sandbox.tn-apis.com/catalog/v1/venues/${venueId}`)
      //   .set({'Authorization': 'Bearer 8c24d5ac-0337-349c-a3b0-17cedb44f455'})
      //   .set({'x-listing-context': `website-config-id=${siteId}`})
      //   .set({'content-type': 'application/json'})
      //   .then(data => console.log(data.text))
    }

    getVenueData(237, 7928);
  })

  return server
}

export default siteApis
