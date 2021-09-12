const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

let Contact = require('../contactModel.js');
const { expect } = require('chai');

chai.use(chaiHttp);
chai.should();

describe('Contacts', () => {
    beforeEach((done) => {
        Contact.remove({}, (err) => {
            done();
        });
    });
});

describe('Test connection', () => {
    it("it should return status 200", (done) => {
        chai.request(app)
            .get('/api')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe('GET /api/contacts', () => {
    before((done) => {
        Contact.create({
            name: "tester",
            email: "t@t.com",
            phone: "123",
            gender: "Male"
        }).then(() => done());
    });

    it("it should GET all the contacts", (done) => {
        chai.request(app)
            .get('/api/contacts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });
});

describe('POST /api/contacts', () => {
    it("it should create a new contact", (done) => {
        let new_contact = {
            name: 'Anto',
            email: 'anto@gmail.com',
            phone: '4128273',
            gender: 'Male'
        };

        chai.request(app)
            .post('/api/contacts')
            .send(new_contact)
            .then((res) => {
                const data = res.body.data;
                chai.expect(data).to.contain.property('_id');
                chai.expect(data).to.contain.property('name', 'Anto');
                chai.expect(data).to.contain.property('email', 'anto@gmail.com');
                chai.expect(data).to.contain.property('phone', '4128273');
                chai.expect(data).to.contain.property('gender', 'Male');
                done();
            })
            .catch((err) => done(err));
    });

    // TODO for error case
    // it("it should not create a new contact", (done) => {
    //     let new_contact = {
    //         abc: 'def',
    //         phone: '1234'
    //     };

    //     chai.request(app)
    //         .post('/api/contacts')
    //         .send(new_contact)
    //         .end((err, res) => {
    //             expect(err).to.throw();
    //             done();
    //         })
    //         .catch((err) => done(err));
    // });
});

describe('PUT /api/contacts', () => {
    before((done) => {
        Contact.create({
            name: "tester",
            email: "t@t.com",
            phone: "123",
            gender: "Male"
        }).then(() => done());
    });

    it("it should update a contact", (done) => {
        chai.request(app)
            .get('/api/contacts')
            .then((res) => {
                var length_before_deletion = res.body.length;
                var contact_id = Object.values(res.body).
                    filter(contact => contact['name'] == 'tester')[0]['_id'];

                let new_contact = {
                    name: 'tester_updated',
                    email: 'tester@updated.com',
                    phone: '1010101',
                    gender: 'Female'
                };

                chai.request(app)
                    .put(`/api/contacts/${contact_id}`)
                    .send(new_contact)
                    .then((res) => {

                        chai.request(app)
                            .get('/api/contacts')
                            .then((res) => {
                                let contact = Object.values(res.body)
                                    .filter(contact => contact['_id'] == contact_id)[0];
                                chai.expect(contact['name']).to.be.equal('tester_updated');
                                chai.expect(contact['email']).to.be.equal('tester@updated.com');
                                chai.expect(contact['phone']).to.be.equal('1010101');
                                chai.expect(contact['gender']).to.be.equal('Female');
                                done();
                            });
                    });
            })
            .catch((err) => done(err));
    });
});

describe('DELETE /api/contacts', () => {
    before((done) => {
        Contact.create({
            name: "tester",
            email: "t@t.com",
            phone: "123"
        }).then(() => done());
    });

    it("it should delete a contact", (done) => {
        chai.request(app)
            .get('/api/contacts')
            .then((res) => {
                var length_before_deletion = res.body.length;
                var contact_id = Object.values(res.body).
                    filter(contact => contact['name'] == 'tester')[0]['_id'];

                chai.request(app)
                    .delete(`/api/contacts/${contact_id}`)
                    .then((res) => {

                        chai.request(app)
                            .get('/api/contacts')
                            .then((res) => {
                                var length_after_deletion = res.body.length;
                                let found = Object.values(res.body).filter(contact => {
                                    contact['_id'] == contact_id
                                }).includes(contact_id);
                                chai.expect(found).to.equal(false);
                                chai.expect(length_before_deletion - 1).to.equal(length_after_deletion);
                                done();
                            });
                    });
            })
            .catch((err) => done(err));
    });
});