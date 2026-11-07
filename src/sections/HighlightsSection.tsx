import { ScrollRail, useIsRailClone } from "../components/ScrollRail";
import { LinkedinIcon } from "../components/BrandIcons";
import { mutedText } from "../styles";
import { highlights, linkedinPosts, profile, type LinkedInPost } from "../data/portfolio";

const AUTO_PLAY_MS = 2500;
const DEFAULT_POST_HEIGHT = 560;

const card = "rounded-3xl border border-black/10 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-white/5";

function LinkedInPostCard({ post }: { post: LinkedInPost }) {
  const clone = useIsRailClone();
  return (
    // LinkedIn's embed is a light card, so the frame stays light in both themes.
    <div className="w-[min(85vw,504px)] self-start rounded-3xl border border-black/10 bg-white p-2 dark:border-white/10">
      <iframe
        src={post.embedUrl}
        title={`LinkedIn post: ${post.title}`}
        height={post.height ?? DEFAULT_POST_HEIGHT}
        loading="lazy"
        tabIndex={clone ? -1 : undefined}
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        className="block w-full rounded-2xl"
      />
    </div>
  );
}

export function HighlightsSection() {
  const hasPosts = linkedinPosts.length > 0;

  return (
    <section id="highlights" className="scroll-mt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollRail
          title="Highlights"
          autoPlayMs={AUTO_PLAY_MS}
          description={
            <a
              href={`${profile.linkedin}recent-activity/all/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <LinkedinIcon className="h-4 w-4" /> {hasPosts ? "More posts on LinkedIn" : "Follow along on LinkedIn"}
            </a>
          }
        >
          {hasPosts
            ? linkedinPosts.map((post) => <LinkedInPostCard key={post.embedUrl} post={post} />)
            : highlights.map((h) => (
                <div key={h} className={`flex w-[min(80vw,18rem)] items-center p-6 text-lg leading-snug ${card} ${mutedText}`}>
                  {h}
                </div>
              ))}
        </ScrollRail>
      </div>
    </section>
  );
}
