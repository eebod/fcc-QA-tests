const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("View issues on a project: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitest")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitest?_id=_zg0i5uj")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitest?_id=_zg0i5uj&open=true")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send({
        issue_title: "eebod",
        issue_text: "youKnowWho",
        created_by: "Davos",
        assigned_to: "Jean",
        status_text: "We are all here",
      })
      .end(function (err, res) {
        const expected = {
          open: true,
          issue_title: "eebod",
          issue_text: "youKnowWho",
          created_by: "Davos",
          assigned_to: "Jean",
          status_text: "We are all here",
        };
        const resultObject = {
          open: res.body.open,
          issue_title: res.body.issue_title,
          issue_text: res.body.issue_text,
          created_by: res.body.created_by,
          assigned_to: res.body.assigned_to,
          status_text: res.body.status_text,
        };
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send({
        issue_title: "Spongebob",
        issue_text: "Krabbypatties",
        created_by: "Mr. Crabs",
      })
      .end(function (err, res) {
        const expected = {
          open: true,
          issue_title: "Spongebob",
          issue_text: "Krabbypatties",
          created_by: "Mr. Crabs",
          assigned_to: "",
          status_text: "",
        };
        const resultObject = {
          open: res.body.open,
          issue_title: res.body.issue_title,
          issue_text: res.body.issue_text,
          created_by: res.body.created_by,
          assigned_to: res.body.assigned_to,
          status_text: res.body.status_text,
        };
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send({
        issue_text: "djWiki",
        created_by: "Marshmallo",
      })
      .end(function (err, res) {
        const expected = { error: "required field(s) missing" };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Update one field on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "foi9svt",
        issue_title: "We update in the trinity",
      })
      .end(function (err, res) {
        const expected = {
          result: "successfully updated",
          _id: "foi9svt",
        };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "p67yag4",
        issue_title: "A multimatrix update",
        issue_text: "2077",
      })
      .end(function (err, res) {
        const expected = {
          result: "successfully updated",
          _id: "p67yag4",
        };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        issue_title: "Missing update",
        issue_text: "2077",
      })
      .end(function (err, res) {
        const expected = { error: "missing _id" };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "p67yag4",
      })
      .end(function (err, res) {
        const expected = {
          error: "no update field(s) sent",
          _id: "p67yag4",
        };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "bxqwodqxbi",
        issue_text: "shhhhh",
      })
      .end(function (err, res) {
        const expected = { error: "could not update", _id: "bxqwodqxbi" };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Delete an issue: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/apitest")
      .send({
        _id: "uif2fd",
      })
      .end(function (err, res) {
        const expected = {
          result: "successfully deleted",
          _id: "uif2fd",
        };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/apitest")
      .send({
        _id: "w3matehey",
      })
      .end(function (err, res) {
        const expected = { error: "could not delete", _id: "w3matehey" };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/apitest")
      .send({})
      .end(function (err, res) {
        const expected = { error: "missing _id" };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });
});