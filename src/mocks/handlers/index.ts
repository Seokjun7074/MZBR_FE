import { restaurantDetailHandler } from '@/mocks/handlers/restaurantDetailHandler';
import { restaurantHandler } from '@/mocks/handlers/restaurantHandler';
import { shortFormHandler } from '@/mocks/handlers/shortFormHandler';

export const handlers = [...restaurantHandler, ...shortFormHandler, ...restaurantDetailHandler];
