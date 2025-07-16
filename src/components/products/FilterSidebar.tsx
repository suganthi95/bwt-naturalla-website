import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDownIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "../ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion2";
import { useDispatch, useSelector } from "react-redux";
import {
  addKeyword,
  addKeywords,
  clearFilters,
  removeKeyword,
  setCategories,
  setPriceRanges,
  setSortByPrice,
  setSortDate,
  toggleCategory,
} from "@/redux/slices/filterSlice";
import type { FilterData } from "@/types/type";
import type { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
interface Props {
  filterValues: FilterData;
}
const sortOptions = [
  { label: "Low to High", value: "price-asc" },
  { label: "High to Low", value: "price-desc" },
];
const sortOptions2 = [
  { label: "New to Old", value: "date-desc" },
  { label: "Old to New", value: "date-asc" },
];

export default function FilterSidebar({ filterValues }: Props) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, keywords, maxPrice, minPrice, sortByDate, sortByPrice } =
    useSelector((state: RootState) => state.filter);
  const [badges, setBadges] = useState<string[]>(keywords);
  const defaultMin = filterValues?.price_range[0]?.min_price ?? 164;
  const defaultMax = filterValues?.price_range[0]?.max_price ?? 5000;
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [open, setOpen] = useState(false);
  const [min, max] = priceRange;
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(categories);
  const [sortBy, setSortBy] = useState(sortByPrice);
  const [sortDate, setSortByDate] = useState(sortByDate);

  const toggleCategoryby = (category: string) => {
    dispatch(toggleCategory(category));
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceInput = (value: number, type: "min" | "max") => {
    if (type === "min") {
      if (value <= priceRange[1]) {
        setPriceRange([value, priceRange[1]]);
      }
    } else {
      if (value >= priceRange[0]) {
        setPriceRange([priceRange[0], value]);
      }
    }
  };

  const clearAll = () => {
    setSearchTerm("");
    setBadges([]);
    dispatch(clearFilters());
    setPriceRange([100, 1000]);
    setSelectedCategories([]);
    setSortBy("");
    setSortByDate("");
  };

  const applyFilters = () => {
    dispatch(addKeywords(badges));
    dispatch(setCategories(selectedCategories));
    dispatch(setSortByPrice(sortBy));
    dispatch(setSortDate(sortDate));
    dispatch(setPriceRanges({ min, max }));
  };

  return (
    <div className="w-full  space-y-6 overflow-hidden">
      <div className="flex items-end lg:items-center justify-end lg:justify-between">
        <h2 className="text-xl hidden lg:block font-semibold">Filters</h2>

        <Button className="" variant="ghost" size="sm" onClick={clearAll}>
          Clear All
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Benefits</label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between text-sm w-full"
            >
              {searchTerm
                ? filterValues?.benefits.find(
                    (benefit) => benefit === searchTerm
                  )
                : "Search by keyword..."}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="p-0 w-full">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                {filterValues?.benefits
                  .filter(
                    (tag) =>
                      tag.toLowerCase().includes(searchTerm.toLowerCase()) &&
                      !badges.includes(tag)
                  )
                  .map((tag, idx) => (
                    <CommandItem
                      key={idx}
                      value={tag}
                      onSelect={() => {
                        setBadges((prev) => [...prev, tag]);
                        setSearchTerm("");
                        setOpen(false);
                        dispatch(addKeyword(tag));
                      }}
                    >
                      {tag}
                    </CommandItem>
                  ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex gap-2 flex-wrap mt-2">
          {badges.map((badge, i) => (
            <Badge
              key={i}
              variant="outline"
              className="px-2 py-1 line-clamp-1  text-sm flex items-center gap-1"
            >
              {badge}
              <div
                onClick={() => {
                  setBadges((prev) => prev.filter((item) => item !== badge));
                  // applyFilters();
                  // dispatch(addKeywords(badges));
                  // dispatch(removeKeyword(badge));
                  dispatch(removeKeyword(badge));
                }}
              >
                <X className="w-4 h-4 cursor-pointer ml-1" />
              </div>
            </Badge>
          ))}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm  font-medium">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-4">
              <Slider
                value={priceRange}
                onValueChange={(val) => {
                  // applyFilters();

                  setPriceRange([val[0], val[1]]);
                  dispatch(setPriceRanges({ min, max }));
                }}
                min={defaultMin}
                max={defaultMax}
                step={1}
                className="mb-4"
              />
              <div className="flex gap-4">
                <Input
                  type="number"
                  value={min}
                  onChange={(e) => {
                    applyFilters();

                    handlePriceInput(+e.target.value, "min");
                  }}
                  min={defaultMin}
                  max={priceRange[1]}
                />
                <Input
                  type="number"
                  value={max}
                  onChange={(e) => {
                    handlePriceInput(+e.target.value, "max");
                    applyFilters();
                  }}
                  min={priceRange[0]}
                  max={defaultMax}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {[
        "/products/today-offer",
        "/products/all",
        "/products/best-sellers",
        "/products/trending-now",
      ].includes(pathname) && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="category">
            <AccordionTrigger className="text-sm font-medium underline-none">
              Categories
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-2 space-y-2">
                {filterValues?.category?.map((cat, index) => {
                  const checkboxId = `cat-${index}`;
                  return (
                    <div
                      key={cat.category_id}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={checkboxId}
                        checked={selectedCategories.includes(
                          cat.category_title
                        )}
                        onCheckedChange={() => {
                          toggleCategoryby(cat.category_title);
                          // applyFilters();
                        }}
                      />
                      <label htmlFor={checkboxId} className="text-sm">
                        {cat.category_title}
                      </label>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <h2 className="font-semibold text-xl text-title">Sort By</h2>

      <div>
        <Accordion collapsible type="single">
          <AccordionItem value="price" className="underline-none">
            <AccordionTrigger className="underline-none cursor-pointer">
              <label className="text-sm text-textPrimary font-medium">
                Price
              </label>
            </AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                value={sortBy}
                onValueChange={(val) => {
                  setSortBy(val);
                  // applyFilters();
                  dispatch(setSortByPrice(val));
                }}
                className="space-y-2 mt-2"
              >
                {sortOptions.map((opt) => (
                  <div key={opt.value} className="flex items-center gap-2">
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <label htmlFor={opt.value}>{opt.label}</label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Accordion collapsible type="single">
          <AccordionItem value="date" className="underline-none">
            <AccordionTrigger className="underline-none cursor-pointer">
              <label className="text-sm text-textPrimary font-medium">
                Launched Date
              </label>
            </AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                value={sortDate}
                onValueChange={(val) => {
                  dispatch(setSortDate(val));
                  setSortByDate(val);
                  // applyFilters();
                }}
                className="space-y-2 mt-2"
              >
                {sortOptions2.map((opt) => (
                  <div key={opt.value} className="flex items-center gap-2">
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <label htmlFor={opt.value}>{opt.label}</label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* <Button className="w-full hidden xl:block mt-4" onClick={applyFilters}>
        Apply Filters
      </Button> */}
    </div>
  );
}
