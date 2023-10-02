import Link from 'next/link';
import ImageCard from '@/components/ImageCard'

const BlogPostCard= ({ blogPost }) => {
  const { title, blogBody, author, media, slug  } = blogPost.fields

  console.log(blogPost.fields)
  return (
    <div>
          <div className="flex flex-col justify-between p-4 leading-normal">
              {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {blogBody}
              </p> */}
          </div>

          <Link href={`/${slug}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <ImageCard
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={media.fields.file.url}
              width={media.fields.file.details.image.width}
              height={media.fields.file.details.image.height}
              quality="100"
              alt={title}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {title} </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {author} </p>
            </div>
          </Link>
    </div>
  )
};

export default BlogPostCard;
