import { useRouter } from "next/router";
import Head from "next/head";
import { imageUrl, twoDecimals, API_URL } from "../../helpers";

const Product = ({ product }) => {
  let router = useRouter();
  //   console.log(router.query);
  // console.log(slug,produc);
  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <h3>{product.name}</h3>
      <img src={imageUrl(product.image)} alt="" />
      <p>${twoDecimals(product.price)} </p>
      <p>{product.content} </p>
    </div>
  );
};

export default Product;

export const getStaticPaths = async () => {
  const products_resp = await fetch(`${API_URL}/products`);
  const products = await products_resp.json();

  const paths = products.map((product) => {
    return { params: { slug: `${product.slug}` } };
  });

  return { paths: paths, fallback: false };
};
export const getStaticProps = async ({ params: { slug } }) => {
  const product_resp = await fetch(`${API_URL}/products/?slug=${slug}`);
  const product = await product_resp.json();

  return { props: { product: product[0] } };
};
