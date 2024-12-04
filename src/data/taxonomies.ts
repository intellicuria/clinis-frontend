import { Route } from "@/routers/types";
import __taxonomies from "./jsons/__taxonomies.json";
import __taxonomies_calculators from "./jsons/__taxonomies _calculators.json";
import { TaxonomyType } from "./types";
import { ModuleCategory } from "@/types/module.types";
const DEMO_CATEGORIES: TaxonomyType[] = __taxonomies_calculators.map(
  (item) => ({
    ...item,
    taxonomy: "category",
    href: item.href as Route,
  })
);

const DEMO_TAGS: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "tag",
  href: item.href as Route,
}));

export { DEMO_CATEGORIES, DEMO_TAGS };
