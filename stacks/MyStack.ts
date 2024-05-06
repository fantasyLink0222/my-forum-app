import { StackContext, Api, EventBus, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {

  const api = new Api(stack, "api", {
    defaults: {
        function : {
          environment: {
            DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
          },
        },
    },  
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /threads": "packages/functions/src/thread.handler",
      "POST /threads": "packages/functions/src/thread.handler",
      "GET /threads/{id}": "packages/functions/src/thread.handler",
      "PUT /threads/{id}": "packages/functions/src/thread.handler",
      "DELETE /threads/{id}": "packages/functions/src/thread.handler",

      
      
    },
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteUrl: web.url,
  });
}