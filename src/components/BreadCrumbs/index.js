import { Breadcrumbs} from '@mantine/core';

export function BreadcrumbsArrow( {items}) {
  return (
    <>
      <Breadcrumbs separator="→">{items}</Breadcrumbs>
    </>
  );
}

export function BreadcrumbsSlash( {items}) {
  return (
    <>
            <Breadcrumbs>{items}</Breadcrumbs>
    </>
  );
}