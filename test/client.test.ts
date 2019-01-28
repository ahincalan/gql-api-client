import {GqlClient} from "../src";
import {GqlApplication} from "./helpers/app";
import {expect} from "chai";

describe('GqlClient Test Suite', () => {

    let app: GqlApplication;
    const port = 4000;

    before(() => {
        app = new GqlApplication();
        app.start(port);
    });

    it('Should be created client 1', (done) => {
        const client = new GqlClient({
            url: 'http://localhost:' + port + '/graphql',
            query: `{                                   
                        user(id:1) {
                            id 
                            name
                            email                                                                          
                        }                      
                    }`
        });

        client.send().then(response => {
            expect(response.status).equal(200);
            expect(response.data.user.id).equal(1);
            done();
            return response;
        }).catch((err) => {
            expect(err).equal(false);
        });

    });

    it('Should be created client 2', (done) => {
        const client = new GqlClient({
            url: 'http://localhost:' + port + '/graphql',
            query: `{                                   
                        user(id:1) {
                            id 
                            name
                            email                                                                          
                        }                      
                    }`
        });
        client.send().then((response) => {
            expect(response['data'].user['id']).equal(1);
            done();
        });
    });

    it('Should be request with parameters usage', (done) => {
        const client = new GqlClient({
            url: 'http://localhost:' + port + '/graphql',
            query: `query ($id: Int!) {                                   
                        user(id:$id) {
                            id 
                            name
                            email                                                                          
                        }                      
                    }`
        });
        client.send({id: 1}).then((response) => {
            expect(response['data'].user['id']).equal(1);
            done();
        });
    });

    it('Should be request with token usage', (done) => {
        const client = new GqlClient({
            url: 'http://localhost:' + port + '/graphql',
            query: `query ($id: Int!) {                                   
                        user(id:$id) {
                            id 
                            name
                            email                                                                          
                        }                      
                    }`
        });
        client.token = 'Test Token';
        client.send({id: 1}).then((response) => {
            expect(response['data'].user['id']).equal(1);
            done();
        });
    });

    it('Should be request with header usage', (done) => {
        const client = new GqlClient({
            url: 'http://localhost:' + port + '/graphql',
            query: `query ($id: Int!) {                                   
                        user(id:$id) {
                            id 
                            name
                            email                                                                          
                        }                      
                    }`
        });
        client.headers = {'authorization': 'Bearer TestToken'};
        client.send({id: 1}).then((response) => {
            expect(response['headers'].get('authorization')).equal('Bearer TestToken');
            done();
        });
    });

    describe('Exception Test Suite', () => {

        it('Should be validate url property', (done) => {

            const client = new GqlClient({
                query: `query ($id: Int!) {                                   
                        user(id:$id) {
                            id 
                            name
                            email                                                                          
                        }                      
                    }`
            });
            try {
                client.send({id: 1}).then((response) => {
                    //console.log(response);
                });
            } catch (err) {
                expect(err).equal('url not found');
                done();
            }

        });

        it('Should be bad request', (done) => {
            const client = new GqlClient({
                url: 'http://localhost:' + port + '/graphql',
                query: `{                                   
                        user(id:$id) {
                            id 
                            name
                            email                                                                          
                        }                      
                    }`
            });
            client.send({id: 1}).then((response) => {
                expect(response.status).equal(400);
                done();
            });
        });

    });


    after(() => {
        app.stop();
    });

});
