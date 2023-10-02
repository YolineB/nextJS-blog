import Image from 'next/image'
import { Inter } from 'next/font/google'
import { client } from '@/lib/contentful'
import { GetStaticProps } from 'next';
import BlogPostCard from '@/components/post'

const inter = Inter({ subsets: ['latin'] })

export default function Home( {blogPosts} ) {
  console.log(blogPosts)
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full flex-col items-center justify-between font-mono text-sm lg:flex">
        <h1>Test Website Luskin</h1>
        {
          blogPosts.map((blogPost) => (
            <BlogPostCard key={blogPost.sys.id} blogPost={blogPost} />
          ))
        }
      </div>

    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.getEntries({ content_type: "blogPost" });

  return {
    props: {
      blogPosts: data.items,
      revalidate: 70,
    },
  };
}
