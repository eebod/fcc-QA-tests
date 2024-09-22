const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
test('Translation with text and locale fields: POST request to /api/translate', (done) => {
  chai.request(server)
  .keepOpen()
  .post("/api/translate")
  .send({
    text: 'We watched the footie match for a while.',
    locale: 'british-to-american'
  })
  .end((err, res) => {
    assert.equal(res.status, 200);
    assert.equal(res.body.translation, 'We watched the <span class="highlight">soccer</span> match for a while.')
  });
  done();
});
  test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
    chai.request(server)
    .keepOpen()
    .post("/api/translate")
    .send({
      text: 'Lunch is at 12.15 today.',
      locale: 'british-to-yoruba'
    })
    .end((err, res) => {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Invalid value for locale field')
      done();
    });
  });
  test('Translation with missing text field: POST request to /api/translate', (done) => {
     chai.request(server)
    .keepOpen()
    .post("/api/translate")
    .send({
      locale: 'british-to-american'
    })
    .end((err, res) => {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Required field(s) missing')
      done();
    });
  });
    test('Translation with missing locale field: POST request to /api/translate', (done) => {
      chai.request(server)
      .keepOpen()
      .post("/api/translate/")
      .send({
        text: 'Dr. Grosh will see you now.'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Required field(s) missing')
        done();
      });
    });
  test('Translation with empty text: POST request to /api/translate', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/translate')
    .send({
      text: '',
      locale: 'british-to-american'
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'No text to translate')
      done();
    });
  });
  test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
    chai.request(server)
    .keepOpen()
    .post('/api/translate')
    .send({
      text: 'Paracetamol takes up to an hour to work.',
      locale: 'american-to-british'
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.translation, 'Everything looks good to me!');
      done()
    })
  })
});