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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Exclusive Offers</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Discover amazing deals and save with promo codes
              </p>
            </div>
            <div className="hidden sm:block">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <Input
            placeholder="Search offers, codes, or categories..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="h-12 text-base"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Offers List */}
        {filteredOffers.length > 0 ? (
          <div className="space-y-4">
            {filteredOffers.map(offer => (
              <div
                key={offer.id}
                className="flex items-center gap-6 rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/50"
              >
                {/* Discount Badge */}
                <div className="flex flex-shrink-0 flex-col items-center justify-center rounded-lg bg-primary px-6 py-4 text-center">
                  <div className="text-3xl font-bold text-primary-foreground">
                    {offer.discount}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {offer.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {offer.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <Badge variant="secondary">{offer.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Expires: {new Date(offer.expiresAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Copy Button Section */}
                <div className="flex flex-shrink-0 flex-col items-end gap-2">
                  <div className="mb-2 text-right">
                    <p className="font-mono text-sm font-bold text-foreground">
                      {offer.code}
                    </p>
                    <p className="text-xs text-accent">{offer.savings}</p>
                  </div>
                  <Button
                    onClick={() => handleCopyCode(offer.code)}
                    size="sm"
                    variant={copiedCode === offer.code ? 'secondary' : 'default'}
                    className="whitespace-nowrap"
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
        <div className="mt-12 rounded-lg bg-primary p-6 text-primary-foreground">
          <h3 className="text-lg font-semibold">How to Redeem</h3>
          <ol className="mt-3 space-y-2 text-sm">
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
