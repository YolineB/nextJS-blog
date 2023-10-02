import { useRouter } from "next/router";
import Link from "next/link";
import { client, previewClient } from "@/lib/contentful";

import ImageCard from "@/components/ImageCard";
import Carddetail from "@/components/CardDetail";
import RichText from "@/components/RichText";


const BlogPost = ({ blogPost, preview }) => {
  const router = useRouter();
  const { title, media, author, date, blogBody } = blogPost.fields;
  return (
    <div className="min-h-screen flex justify-center items-center p-4 text-black">
      <article className="max-w-3xl w-full p-6 bg-white shadow-md rounded-lg">
        {preview && (
          <>
            You are previewing content:
            <Link href="/api/exit-preview">Exit preview</Link>
          </>
        )}
        {router.isFallback ? (
          <div className="text-center text-lg font-semibold">loading..</div>
        ) : (
          <Carddetail>
            <ImageCard
              alt={title}
              src={media.fields.file.url}
              width={media.fields.file.details.image.width}
              height={media.fields.file.details.image.height}
            />
            <div className="mt-4">
              <div className="flex items-center">
                <div>
                  <div className="text-lg font-semibold">Author:</div>
                  <div className="text-gray-600">{author}</div>
                </div>
              </div>
              <h1 className="text-3xl mt-4 font-bold">{title}</h1>
              <span className="block mt-2 text-gray-500">Date {date}</span>
              <div className="mt-4">
                <RichText content={blogBody} />
              </div>
            </div>
          </Carddetail>
        )}
      </article>
    </div>
  );
  
};

export const getStaticProps = async ({ params, preview = false }) => {
  const currentClient = preview ? previewClient : client

  const { slug } = params;
  const response = await currentClient.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
  });

  if (!response?.items?.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      blogPost: response?.items?.[0],
      revalidate: 60,
      preview,
    },
  };
};

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: "blogPost" });
  console.log('response', response)
  const paths = response.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default BlogPost;