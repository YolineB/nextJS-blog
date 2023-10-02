import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import ImageCard from '@/components/ImageCard'

// https://www.contentful.com/developers/docs/tutorials/general/getting-started-with-rich-text-field-type/
const options = {
  renderMark: {
    [MARKS.CODE]: text => {
      return (
        <pre>
          <code>{text}</code>
        </pre>
      )
    }
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (
        node.content.find(item =>
          item.marks?.find(mark => mark.type === 'code')
        )
      ) {
        return (
          <div className="m-4">
            <pre>
              <code>{children}</code>
            </pre>
          </div>
        )
      }

      return <p>{children}</p>
    },

    [INLINES.ENTRY_HYPERLINK]: node => {
      if (node.data.target.sys.contentType.sys.id === 'post') {
        return (
          <Link href={`/posts/${node.data.target.fields.slug}`}>
            {node.data.target.fields.title}
          </Link>
        )
      }
    },

    [INLINES.HYPERLINK]: node => {
      const text = node.content.find(item => item.nodeType === 'text')?.value
      return (
        <a href={node.data.uri} target='_blank' rel='noopener noreferrer'>
          {text}
        </a>
      )
    },

    [BLOCKS.EMBEDDED_ENTRY]: node => {
      if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
        return (
          <iframe
            height='400'
            width='100%'
            src={node.data.target.fields.embedUrl}
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        )
      }
    },

    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      if (node.data.target.sys.contentType.sys.id === "imageWithText") {
        const { image, text, imageAlignment } = node.data.target.fields;

        if (imageAlignment === "Left") {
          return (
            <div className="flex py-10 items-center">
              <ImageCard src={image.fields.file.url} alt={image.fields.title} width={image.fields.file.details.image.width} height={image.fields.file.details.image.height} />
              <p className="ml-4">{text}</p>
            </div>
          );
        } else if (imageAlignment === "Right") {
          return (
            <div className="flex py-10 items-center">
              <p className="mr-4">{text}</p>
              <ImageCard src={image.fields.file.url} alt={image.fields.title} width={image.fields.file.details.image.width} height={image.fields.file.details.image.height} />
            </div>
          );
        }
      }
    },
  

    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <ImageCard
          src={node.data.target.fields.file.url}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.title}
          className='h-30 w-30 m-4'
        />
      )
    }
  }
}

const RichText = ({ content }) => {
  return <>{documentToReactComponents(content, options)}</>
}

export default RichText