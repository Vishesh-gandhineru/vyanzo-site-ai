const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL;

async function fetchGraphQL(query, variables = {}) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Error:', json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

// ─────────────────────────────────────────────
// SHARED FRAGMENT
// ─────────────────────────────────────────────

const PRODUCT_FIELDS = `
  id
  databaseId
  title
  slug
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails { width height }
    }
  }
  language { code name }
  translations {
    slug
    language { code }
  }
  productCategories {
    nodes { id databaseId name slug }
  }
  certifications {
    nodes { id databaseId name slug }
  }
  locations {
    nodes { id databaseId name slug }
  }
  productDescription
  productGallery
  specification {
    name
    url
  }
  cerification {
    name
    url
  }
  productDetails {
    name
    value
  }
`;

// ─────────────────────────────────────────────
// 1. GET ALL PRODUCTS (by language)
// ─────────────────────────────────────────────

const GET_ALL_PRODUCTS = `
  query GetAllProducts($language: LanguageCodeFilterEnum) {
    products(first: 100, where: { language: $language }) {
      nodes {
        ${PRODUCT_FIELDS}
      }
    }
  }
`;

export async function getAllProducts(language = 'EN') {
  const data = await fetchGraphQL(GET_ALL_PRODUCTS, { language });
  return data.products.nodes ?? [];
}

// ─────────────────────────────────────────────
// 2. GET PRODUCTS BY CATEGORY (by language + category slug)
// ─────────────────────────────────────────────

const GET_PRODUCTS_BY_CATEGORY = `
  query GetProductsByCategory(
    $language: LanguageCodeFilterEnum
    $categorySlug: String!
  ) {
    products(
      first: 100
      where: {
        language: $language
        taxQuery: {
          taxArray: [
            {
              taxonomy: PRODUCTCATEGORY
              field: SLUG
              terms: [$categorySlug]
              operator: IN
            }
          ]
        }
      }
    ) {
      nodes {
        ${PRODUCT_FIELDS}
      }
    }
  }
`;

export async function getProductsByCategory(categorySlug, language = 'EN') {
  const data = await fetchGraphQL(GET_PRODUCTS_BY_CATEGORY, {
    language,
    categorySlug,
  });
  return data.products.nodes ?? [];
}

// ─────────────────────────────────────────────
// 3. GET PRODUCTS BY CERTIFICATION (by language + certification slug)
// ─────────────────────────────────────────────

const GET_PRODUCTS_BY_CERTIFICATION = `
  query GetProductsByCertification(
    $language: LanguageCodeFilterEnum
    $certSlug: String!
  ) {
    products(
      first: 100
      where: {
        language: $language
        taxQuery: {
          taxArray: [
            {
              taxonomy: CERTIFICATION
              field: SLUG
              terms: [$certSlug]
              operator: IN
            }
          ]
        }
      }
    ) {
      nodes {
        ${PRODUCT_FIELDS}
      }
    }
  }
`;

export async function getProductsByCertification(certSlug, language = 'EN') {
  const data = await fetchGraphQL(GET_PRODUCTS_BY_CERTIFICATION, {
    language,
    certSlug,
  });
  return data.products.nodes ?? [];
}

// ─────────────────────────────────────────────
// 4. GET PRODUCTS BY CATEGORY + CERTIFICATION
// ─────────────────────────────────────────────

const GET_PRODUCTS_FILTERED = `
  query GetProductsFiltered(
    $language: LanguageCodeFilterEnum
    $categorySlug: String
    $certSlug: String
  ) {
    products(
      first: 100
      where: {
        language: $language
        taxQuery: {
          relation: AND
          taxArray: [
            {
              taxonomy: PRODUCTCATEGORY
              field: SLUG
              terms: [$categorySlug]
              operator: IN
            }
            {
              taxonomy: CERTIFICATION
              field: SLUG
              terms: [$certSlug]
              operator: IN
            }
          ]
        }
      }
    ) {
      nodes {
        ${PRODUCT_FIELDS}
      }
    }
  }
`;

export async function getProductsFiltered({ language = 'EN', categorySlug, certSlug }) {
  const data = await fetchGraphQL(GET_PRODUCTS_FILTERED, {
    language,
    categorySlug: categorySlug ?? null,
    certSlug: certSlug ?? null,
  });
  return data.products.nodes ?? [];
}

// ─────────────────────────────────────────────
// 5. GET SINGLE PRODUCT BY SLUG
// ─────────────────────────────────────────────

const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ${PRODUCT_FIELDS}
    }
  }
`;

export async function getProductBySlug(slug) {
  const data = await fetchGraphQL(GET_PRODUCT_BY_SLUG, { slug });
  return data.product ?? null;
}

// ─────────────────────────────────────────────
// 6. GET ALL PRODUCT SLUGS (for generateStaticParams)
// ─────────────────────────────────────────────

const GET_ALL_PRODUCT_SLUGS = `
  query GetAllProductSlugs($language: LanguageCodeFilterEnum) {
    products(first: 100, where: { language: $language }) {
      nodes {
        slug
        language { code }
      }
    }
  }
`;

export async function getAllProductSlugs(language = 'EN') {
  const data = await fetchGraphQL(GET_ALL_PRODUCT_SLUGS, { language });
  return data.products.nodes ?? [];
}

// ─────────────────────────────────────────────
// 7. GET ALL PRODUCT CATEGORIES
// ─────────────────────────────────────────────

const GET_ALL_PRODUCT_CATEGORIES = `
  query GetAllProductCategories {
    productCategories(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        count
      }
    }
  }
`;

export async function getAllProductCategories() {
  const data = await fetchGraphQL(GET_ALL_PRODUCT_CATEGORIES);
  return data.productCategories.nodes ?? [];
}

// ─────────────────────────────────────────────
// 8. GET ALL CERTIFICATIONS
// ─────────────────────────────────────────────

const GET_ALL_CERTIFICATIONS = `
  query GetAllCertifications {
    certifications(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        count
      }
    }
  }
`;

export async function getAllCertifications() {
  const data = await fetchGraphQL(GET_ALL_CERTIFICATIONS);
  return data.certifications.nodes ?? [];
}

// ─────────────────────────────────────────────
// 8.5 GET ALL LOCATIONS
// ─────────────────────────────────────────────

const GET_ALL_LOCATIONS = `
  query GetAllLocations {
    locations(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        count
      }
    }
  }
`;

export async function getAllLocations() {
  const data = await fetchGraphQL(GET_ALL_LOCATIONS);
  return data.locations.nodes ?? [];
}

// ─────────────────────────────────────────────
// 9. GET SINGLE CATEGORY BY SLUG
// ─────────────────────────────────────────────

const GET_CATEGORY_BY_SLUG = `
  query GetCategoryBySlug($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      count
    }
  }
`;

export async function getCategoryBySlug(slug) {
  const data = await fetchGraphQL(GET_CATEGORY_BY_SLUG, { slug });
  return data.productCategory ?? null;
}

// ─────────────────────────────────────────────
// 10. HELPER: parse specification / cerification meta
// ─────────────────────────────────────────────

export function parseMetaItems(raw) {
  if (!raw) return [];
  try {
    const obj = JSON.parse(raw);
    // Handles both array and object (item-0, item-1 structure)
    if (Array.isArray(obj)) return obj.filter(Boolean);
    return Object.values(obj).filter(
      (item) => item && typeof item === 'object' && item.name
    );
  } catch {
    return [];
  }
}
