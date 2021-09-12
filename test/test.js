const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

chai.use(chaiHttp);
chai.should();

describe('Restful API tests', () => {

    it("GET /api/contacts", (done) => {
        chai.request(app)
            .get('/api/contacts')
            .end((err, res) => {
                res.should.have.status(200);
                // res.body.should.have.lengthOf(2);
                done();
            });
    });

    it("POST /api/contacts : create a new contact", (done) => {
        chai.request(app)
            .post('/api/contacts')
            .send({ name: 'Anto', email: 'anto@gmail.com', phone: '4128273', gender: 'Male' })
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

    it("DELETE /api/contacts : create a new contact and delete it", (done) => {
        // chai.request(app)
        //     .get('/api/contacts')
        //     .then((res) => {
        //         let length = res.body.length;
        //         console.log('initial:' + length);
        //         let contact = Object.values(res.body)[0];

        //         chai.request(app)
        //             .delete(`/api/contacts/${contact['_id']}`)
        //             .then((res) => {

        //                 chai.request(app)
        //                     .get('/api/contacts')
        //                     .then((res) => {
        //                         let length_deleted = res.body.length;

        //                         console.log('after:' + length_deleted);
        //                         chai.expect(length - 1).to.equal(length_deleted);
        //                         done();
        //                     });
        //             });
        //     });

        chai.request(app)
            .post('/api/contacts')
            .send({ name: 'Benny', email: 'benny@gmail.com', phone: '555', gender: 'Male' })
            .then((res) => {
                const data = res.body.data;
                chai.expect(data).to.contain.property('_id');

                chai.request(app)
                    .delete(`/api/contacts/${data['_id']}`)
                    .then((res) => {

                        chai.request(app)
                            .get('/api/contacts')
                            .then((res) => {
                                let found = Object.values(res.body).filter(contact => {
                                    contact['_id'] == data['_id']
                                }).includes(data['_id']);
                                chai.expect(found).to.equal(false);
                                done();
                            });

                    });
            })
            .catch((err) => done(err));
    });
})