import type { GetStaticPropsContext } from "next";
import { useMemo } from "react";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import loadIntlMessages from "../helper/loadIntlMessages";
import Layout from "../components/Layout";

export async function getStaticProps({
  defaultLocale,
  locale,
}: GetStaticPropsContext) {
  return {
    props: {
      intlMessages: await loadIntlMessages(locale as string, defaultLocale),
    },
  };
}

export default function IndexPage() {
  const intl = useIntl();

  const anotherMessage = useMemo(
    () => (
      <FormattedMessage
        defaultMessage="Hello, World!"
        description="Index Page: Content"
      />
    ),
    []
  );
  return (
    <Layout
      title={intl.formatMessage({
        defaultMessage: "Home",
        description: "Index Page: document title",
      })}
      description={intl.formatMessage({
        defaultMessage: "An example app integrating React Intl with Next.js",
        description: "Index Page: Meta Description",
      })}
    >
      <p>
        <FormattedMessage
          defaultMessage="Hello, World!"
          description="Index Page: Content"
        />
      </p>
      {/* this is broken */}
      <p>{anotherMessage}</p>
      <div>
        {/* this is also broken */}
        {[...Array(10)].map((_, i) => (
          <FormattedMessage
            defaultMessage="Hello, World!"
            description="Index Page: Content"
          />
        ))}
      </div>
      <p>
        <FormattedNumber value={1000} />
      </p>
    </Layout>
  );
}
