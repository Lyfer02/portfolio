import { Router } from 'express';
import { postContact } from '../controllers/contactController';
import { getHealth } from '../controllers/healthController';
import { rateLimit } from '../middleware/rateLimit';
import { validateBody } from '../middleware/validate';
import { contactSchema } from '../schemas/contact';

const router = Router();

router.get('/health', getHealth);
router.post('/contact', rateLimit, validateBody(contactSchema), postContact);

export default router;
