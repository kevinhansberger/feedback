import { NextSeo } from 'next-seo';
import type { NextSeoProps } from 'next-seo';
import { APP_NAME } from '~/constants';

interface PageProps extends NextSeoProps {
  children: any;
}

export default function Page(props: PageProps) {
  const { children, title, ...rest } = props;

  const pageTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;

  return (
    <>
      <NextSeo
        title={pageTitle}
        {...rest}
      />
      {children}
    </>
  )
}
