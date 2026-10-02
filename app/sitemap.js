import { profile } from "@/content/portfolio";
export const dynamic = "force-static";

export default function sitemap() {
  return [{ url: `${profile.siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
