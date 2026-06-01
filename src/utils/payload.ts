import configPromise from '@payload-config';
import { getPayload as getPayloadClient } from 'payload';

export async function getPayload() {
  return getPayloadClient({ config: configPromise });
}
