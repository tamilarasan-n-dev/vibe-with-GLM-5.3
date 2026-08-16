import type { MDXComponents } from "mdx/types";
import ContinentChart from "@/components/blogs/ContinentChart";
import CountryChart from "@/components/blogs/CountryChart";
import GenderChart from "@/components/blogs/GenderChart";
import GitObserverLink from "@/components/blogs/GitObserverLink";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ContinentChart,
    CountryChart,
    GenderChart,
    GitObserverLink,
  };
}
