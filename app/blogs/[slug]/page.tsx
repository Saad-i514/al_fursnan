import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true }
  });

  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: `${post.title} | AL FURSAN Technologies Blog`,
    description: post.excerpt || post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { 
      slug: params.slug,
      published: true
    }
  });

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <div className="min-h-screen py-12 sm:py-20 px-4">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base text-foreground/60">
            <span className="font-medium text-foreground/80">{post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt?.toISOString()}>
              {formattedDate}
            </time>
          </div>
        </header>

        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-foreground prose-headings:font-bold
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-secondary prose-code:bg-card prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-card prose-pre:border prose-pre:border-border
            prose-ul:text-foreground/80 prose-ol:text-foreground/80
            prose-li:marker:text-primary
            prose-blockquote:border-l-primary prose-blockquote:text-foreground/70"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
