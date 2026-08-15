import { getCollection, type CollectionEntry } from 'astro:content';

export type ServiceEntry = CollectionEntry<'services'>;

export async function getPublishedServices(): Promise<ServiceEntry[]> {
  const services = await getCollection('services', ({ data }) => !data.draft);

  return services.sort((first, second) => first.data.order - second.data.order);
}
