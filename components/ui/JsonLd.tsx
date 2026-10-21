interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders a JSON-LD `<script>` tag with structured data.
 *
 * Server component → output lands in the initial HTML so search
 * engines (Google, Bing, Yandex) can read it without executing JS.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
