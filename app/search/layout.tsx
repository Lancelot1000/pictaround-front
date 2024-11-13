import { findCategories } from '@/atom/fetch';

import PageComponent from './page';

export default async function Layout() {
  const categories = await findCategories();

  return (
    <PageComponent categories={categories} />
  )
}