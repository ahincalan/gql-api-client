import express = require("express");
import graphqlHTTP = require("express-graphql");
import {schema} from "./schema";
import {resolvers} from "./resolvers";

export class GqlApplication {

    private express: express.Application;
    private server: any;
    private schema = schema;

    constructor() {

        this.express = express();
        /*
        this.express.use('/graphql',
            graphqlHTTP((request, response, graphQLParams) => ({
                schema: this.schema,
                rootValue: resolvers,
                graphiql: true,
                context: {
                    request: request,
                    response: response
                }
            })));
        */
        this.express.use('/graphql', graphqlHTTP((req, res) => {
            res.set('Access-Control-Allow-Origin', '*');
            if (req.headers['authorization']) {
                let header = req.headers['authorization'];
                res.setHeader('authorization', header);
            }
            return {
                schema: this.schema,
                rootValue: resolvers,
                graphiql: true,
                context: {
                    request: req,
                    response: res
                }
            }
        }));
    }

    start(port?: number) {
        this.server = this.express.listen(port || 4000)
    }

    stop() {
        this.server.close();
    }
}

