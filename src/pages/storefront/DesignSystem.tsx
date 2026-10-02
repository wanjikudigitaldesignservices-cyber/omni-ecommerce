import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { Rating } from "@/components/ui/rating";
import { PriceDisplay } from "@/components/storefront/PriceDisplay";
import { QuantityStepper } from "@/components/storefront/QuantityStepper";
import { VariantSelector } from "@/components/storefront/VariantSelector";
import { Gallery } from "@/components/storefront/Gallery";
import { FilterPanel } from "@/components/storefront/FilterPanel";
import { SortMenu } from "@/components/storefront/SortMenu";
import { EmptyState } from "@/components/storefront/EmptyState";
import { ErrorState } from "@/components/storefront/ErrorState";
import { SectionHeader } from "@/components/storefront/SectionHeader";

export default function DesignSystem() {
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState("v1");

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 space-y-24 max-w-7xl mx-auto">
      <header className="mb-12 border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Omni Hardware Design System</h1>
        <p className="text-slate-400 max-w-2xl">
          Component library for the hardware store storefront.
          All components are WCAG AA compliant with proper focus states and ARIA attributes.
        </p>
      </header>

      <section>
        <SectionHeader title="Core UI (Shadcn customized)" description="Base components styled with Omni tokens." />
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 p-8 glass-card rounded-2xl">
            <h3 className="text-lg font-medium text-slate-300 border-b border-slate-800 pb-2">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
          
          <div className="space-y-8 p-8 glass-card rounded-2xl">
            <h3 className="text-lg font-medium text-slate-300 border-b border-slate-800 pb-2">Inputs & Toggles</h3>
            <div className="space-y-4 max-w-sm">
              <Input placeholder="Enter your email" className="bg-slate-900 border-slate-700 text-white" />
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox id="terms" className="border-slate-700 data-[state=checked]:bg-primary-500" />
                <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Accept terms and conditions
                </label>
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <Switch id="airplane-mode" className="data-[state=checked]:bg-primary-500" />
                <label htmlFor="airplane-mode" className="text-sm font-medium leading-none">
                  Enable notifications
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-8 p-8 glass-card rounded-2xl">
            <h3 className="text-lg font-medium text-slate-300 border-b border-slate-800 pb-2">Feedback & States</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Badge className="bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 border-primary-500/50">New Arrival</Badge>
              <Badge variant="destructive">Out of Stock</Badge>
              <Badge variant="outline" className="border-slate-700 text-slate-300">Refurbished</Badge>
            </div>
            <div className="pt-4 space-y-2">
              <Skeleton className="h-4 w-[250px] bg-slate-800" />
              <Skeleton className="h-4 w-[200px] bg-slate-800" />
            </div>
          </div>
          
          <div className="space-y-8 p-8 glass-card rounded-2xl">
            <h3 className="text-lg font-medium text-slate-300 border-b border-slate-800 pb-2">Accordion</h3>
            <Accordion type="single" collapsible className="w-full border-slate-800">
              <AccordionItem value="item-1" className="border-slate-800">
                <AccordionTrigger className="hover:text-primary-400 hover:no-underline">Is it accessible?</AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="Storefront Components" description="Domain-specific UI pieces for the e-commerce flow." />
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 p-8 glass-card rounded-2xl">
            <h3 className="text-lg font-medium text-slate-300 border-b border-slate-800 pb-2">Product Interactions</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500 mb-2">Price Display</p>
                <PriceDisplay priceInCents={29900} originalPriceInCents={34900} size="lg" />
              </div>
              
              <div>
                <p className="text-sm text-slate-500 mb-2">Rating</p>
                <Rating value={4.5} size={20} />
              </div>
              
              <div>
                <p className="text-sm text-slate-500 mb-2">Quantity Stepper</p>
                <QuantityStepper value={qty} onChange={setQty} />
              </div>
              
              <div>
                <p className="text-sm text-slate-500 mb-2">Variant Selector</p>
                <VariantSelector 
                  selectedId={variant} 
                  onSelect={setVariant} 
                  variants={[
                    { id: "v1", name: "Standard Kit", inStock: true },
                    { id: "v2", name: "Pro Kit", inStock: true },
                    { id: "v3", name: "Contractor Bundle", inStock: false },
                  ]} 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-8 p-8 glass-card rounded-2xl">
            <h3 className="text-lg font-medium text-slate-300 border-b border-slate-800 pb-2">Filtering & Sorting</h3>
            <SortMenu />
            <div className="pt-4">
              <FilterPanel />
            </div>
          </div>
          
          <div className="space-y-8 p-8 glass-card rounded-2xl md:col-span-2">
            <h3 className="text-lg font-medium text-slate-300 border-b border-slate-800 pb-2">Gallery Motif</h3>
            <div className="max-w-sm">
              <Gallery 
                altText="Power Drill" 
                images={["/images/power-drill.jpg", "/images/hand-tools.jpg"]} 
              />
            </div>
          </div>
          
          <div className="space-y-8 p-8 glass-card rounded-2xl md:col-span-2">
            <h3 className="text-lg font-medium text-slate-300 border-b border-slate-800 pb-2">States</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <EmptyState 
                title="Your cart is empty" 
                description="Looks like you haven't added any tools or supplies yet." 
                action={<Button>Browse Tools</Button>}
              />
              <ErrorState 
                message="Failed to load product pricing. Please try again later." 
                onRetry={() => {}} 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
