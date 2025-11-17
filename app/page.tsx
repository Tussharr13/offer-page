'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, Tag, TrendingUp } from 'lucide-react'

interface Offer {
  id: string
  title: string
  description: string
  discount: string
  code: string
  category: string
  expiresAt: string
  savings: string
}

const OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Premium Subscription',
    description: 'Get 50% off your first 3 months',
    discount: '50% OFF',
    code: 'SAVE50',
    category: 'Subscription',
    expiresAt: '2025-12-31',
    savings: 'Save up to $45',
  },
  {
    id: '2',
    title: 'Free Shipping Sitewide',
    description: 'No minimum purchase required',
    discount: 'FREE',
    code: 'SHIP50',
    category: 'Shipping',
    expiresAt: '2025-12-25',
    savings: 'Save on every order',
  },
  {
    id: '3',
    title: 'Bundle Deal',
    description: 'Buy 2, Get 1 Free on selected items',
    discount: '33% OFF',
    code: 'BUNDLE1',
    category: 'Products',
    expiresAt: '2025-12-20',
    savings: 'Save over $60',
  },
  {
    id: '4',
    title: 'Student Discount',
    description: 'Exclusive offer for students and educators',
    discount: '25% OFF',
    code: 'STUDENT25',
    category: 'Special',
    expiresAt: '2025-12-31',
    savings: 'Year-round savings',
  },
  {
    id: '5',
    title: 'Black Friday Extended',
    description: 'Limited time flash sale pricing',
    discount: '40% OFF',
    code: 'BF40',
    category: 'Sale',
    expiresAt: '2025-12-15',
    savings: 'Save $100+',
  },
  {
    id: '6',
    title: 'Loyalty Rewards',
    description: 'Extra 20% off for returning customers',
    discount: '20% OFF',
    code: 'LOYAL20',
    category: 'Rewards',
    expiresAt: '2025-12-31',
    savings: 'Recurring benefits',
  },
]

export default function OffersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const categories = ['All', ...Array.from(new Set(OFFERS.map(o => o.category)))]

  const filteredOffers = useMemo(() => {
    return OFFERS.filter(offer => {
      const matchesSearch =
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.code.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'All' || offer.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-5 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground sm:text-3xl">Exclusive Offers</h1>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Discover amazing deals and save with promo codes
              </p>
            </div>
            <div className="flex justify-center sm:block">
              <TrendingUp className="h-5 w-5 text-primary sm:h-8 sm:w-8" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <Input
            placeholder="Search offers, codes, or categories..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="h-11 w-full rounded-full border border-border/70 bg-card text-sm shadow-sm transition focus-visible:ring-1 focus-visible:ring-primary/20 sm:h-12 sm:text-base"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2" aria-label="Filter by category">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className={`rounded-full px-3 text-xs tracking-wide sm:px-4 sm:text-sm ${
                  selectedCategory === category
                    ? 'shadow-[0_10px_25px_rgba(15,23,42,0.12)]'
                    : 'border-border/60 text-muted-foreground'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Offers List */}
        {filteredOffers.length > 0 ? (
          <div className="space-y-4 sm:space-y-5">
            {filteredOffers.map(offer => (
              <div
                key={offer.id}
                className="grid grid-cols-[auto,1fr,auto] items-center gap-4 rounded-3xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all sm:gap-6 sm:p-6 hover:-translate-y-0.5 lg:flex lg:items-center lg:gap-6"
              >
                {/* Discount Badge */}
                <div className="flex flex-shrink-0 items-center justify-center rounded-2xl bg-[#0b0d21] px-6 py-4 text-center sm:flex-col">
                  <div className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {offer.discount}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {offer.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {offer.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                    <Badge variant="secondary" className="rounded-full bg-muted px-3 py-1 text-xs text-foreground">
                      {offer.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Expires: {new Date(offer.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Copy Button Section */}
                <div className="flex flex-col items-end gap-2 text-right lg:ml-4">
                  <div className="text-sm font-semibold tracking-wide text-foreground">
                    <p className="font-mono text-sm">
                      {offer.code}
                    </p>
                    <p className="text-xs text-accent">{offer.savings}</p>
                  </div>
                  <Button
                    onClick={() => handleCopyCode(offer.code)}
                    size="sm"
                    variant={copiedCode === offer.code ? 'secondary' : 'default'}
                    className={`w-auto whitespace-nowrap rounded-full border border-transparent px-5 ${
                      copiedCode === offer.code
                        ? 'bg-muted text-foreground'
                        : 'bg-[#0b0d21] text-white hover:bg-[#05060f]'
                    }`}
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
            <Tag className="mb-3 h-8 w-8 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">No offers found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Summary */}
        <div className="mt-8 sm:mt-12 rounded-lg bg-primary p-4 sm:p-6 text-primary-foreground">
          <h3 className="text-base sm:text-lg font-semibold">How to Redeem</h3>
          <ol className="mt-3 space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li className="flex items-start">
              <span className="mr-3 font-bold">1.</span>
              <span>Find an offer that interests you and click "Copy Code"</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold">2.</span>
              <span>Go to the merchant's website or store</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold">3.</span>
              <span>Paste the code at checkout to apply your discount</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 font-bold">4.</span>
              <span>Enjoy your savings!</span>
            </li>
          </ol>
        </div>
      </main>
    </div>
  )
}
