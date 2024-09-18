import { Router } from "express";
import swaggerUi from 'swagger-ui-express';

// GENERATED FILES
import { RegisterRoutes } from './generated/routes';
import swagger from './generated/spec/swagger.json';

export function HttpRouter() {
  const router = Router();
  RegisterRoutes(router);
  router.use(
    '/api/v1/docs',
    swaggerUi.serve,
    swaggerUi.setup(swagger, {
      explorer: false,
      customSiteTitle: 'API V1 - Github.Talent.Analizer',
      customfavIcon: 'favicon.png',
      swaggerOptions: { defaultModelsExpandDepth: -1, layout: 'StandaloneLayout' },
    }),
  );
  return router;
}
