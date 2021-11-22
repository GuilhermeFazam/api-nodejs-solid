import { Request, Response, Router } from 'express';
import { createUserController } from './useCases/CreateUser';

const router = Router();

router.post('/users', (request: Request, response: Response) => createUserController.execute(request, response));

export default router;
