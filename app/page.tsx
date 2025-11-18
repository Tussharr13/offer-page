'use client'

import Image from 'next/image'
import { useState, useMemo, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
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
  image: {
    src: string
    alt: string
  }
}

const OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Special Deal Unlock',
    description: 'You unlocked a special deal! Use BURGER10 on any signature burger combo.',
    discount: '10% OFF',
    code: 'BURGER10',
    category: 'Burger Faves',
    expiresAt: '2025-12-31',
    savings: 'Save on every burger order',
    image: {
      src: '/Burger.png',
      alt: 'Signature burger combo with toppings',
    },
  },
  {
    id: '2',
    title: 'Exclusive QR Reward',
    description: 'Scan & apply QR50 to instantly grab ₹50 OFF your meal.',
    discount: '₹50 OFF',
    code: 'QR50',
    category: 'QR Reward',
    expiresAt: '2025-11-30',
    savings: 'Flat ₹50 savings',
    image: {
      src: '/Wraps.png',
      alt: 'Fresh wraps meal for QR reward',
    },
  },
  {
    id: '3',
    title: 'Crunch Time Flash',
    description: 'Copy CRUNCH15 for 15% OFF—valid today only, so hurry!',
    discount: '15% OFF',
    code: 'CRUNCH15',
    category: 'Flash Offer',
    expiresAt: '2025-11-18',
    savings: 'Limited-time 15% slash',
    image: {
      src: '/Nachos.png',
      alt: 'Crunchy nachos platter for flash deal',
    },
  },
  {
    id: '4',
    title: 'Meal Upgrade Access',
    description: 'You’re in! Apply MEALUPGRADE to get a FREE fries upgrade.',
    discount: 'Free Upgrade',
    code: 'MEALUPGRADE',
    category: 'Add-ons',
    expiresAt: '2025-12-15',
    savings: 'Complimentary fries',
    image: {
      src: '/Fries.png',
      alt: 'Basket of crispy fries upgrade',
    },
  },
  {
    id: '5',
    title: 'Combo Unlock',
    description: 'Special Combo Unlock—use DEALCOMBO for stacked savings.',
    discount: 'Combo Deal',
    code: 'DEALCOMBO',
    category: 'Combos',
    expiresAt: '2025-12-20',
    savings: 'Extra combo value',
    image: {
      src: '/Pizza.png',
      alt: 'Loaded pizza combo for stacked savings',
    },
  },
  {
    id: '6',
    title: 'Fast Track Flash',
    description: 'Flash Offer Activated—copy FAST20 for a lightning 20% OFF.',
    discount: '20% OFF',
    code: 'FAST20',
    category: 'Flash Offer',
    expiresAt: '2025-11-25',
    savings: 'Instant 20% discount',
    image: {
      src: '/Noodles.png',
      alt: 'Quick noodles bowl for flash savings',
    },
  },
  {
    id: '7',
    title: 'VIP QR Access',
    description: 'VIP QR Access—use MH99VIP for a free drink with any burger.',
    discount: 'Free Drink',
    code: 'MH99VIP',
    category: 'VIP Perk',
    expiresAt: '2025-12-31',
    savings: 'Complimentary beverage',
    image: {
      src: '/Mocktail.png',
      alt: 'Refreshing mocktail for VIP access',
    },
  },
  {
    id: '8',
    title: 'Mumbai Burger Saver',
    description: 'Save ₹20 on the Mumbai Burger – Use code: MUMBAIBURGER20.',
    discount: '₹20 OFF',
    code: 'MUMBAIBURGER20',
    category: 'City Special',
    expiresAt: '2025-12-31',
    savings: '₹20 off Mumbai Burger',
    image: {
      src: '/Burger.png',
      alt: 'Mumbai style masala burger',
    },
  },
  {
    id: '9',
    title: 'Double Decker Treat',
    description: 'Buy any Double Decker Burger, get fries free – Code: DDUPFREE.',
    discount: 'Free Fries',
    code: 'DDUPFREE',
    category: 'Combo',
    expiresAt: '2025-12-31',
    savings: 'Complimentary fries add-on',
    image: {
      src: '/Burger.png',
      alt: 'Double decker burger with fries',
    },
  },
  {
    id: '10',
    title: 'Tandoori Paneer Bonus',
    description: 'Get ₹30 off the Tandoori Paneer Burger – Code: TANDOORI30.',
    discount: '₹30 OFF',
    code: 'TANDOORI30',
    category: 'Veg Delight',
    expiresAt: '2025-12-31',
    savings: '₹30 off paneer burger',
    image: {
      src: '/Fried-Momos.png',
      alt: 'Tandoori-inspired street food bites',
    },
  },
  {
    id: '11',
    title: 'Peri Peri Nachos Slash',
    description: '15% off the Peri Peri Nachos Burger – Code: PERIPERI15.',
    discount: '15% OFF',
    code: 'PERIPERI15',
    category: 'Spicy Picks',
    expiresAt: '2025-11-30',
    savings: '15% off Peri Peri Nachos Burger',
    image: {
      src: '/Nachos.png',
      alt: 'Spicy peri peri nachos inspiration',
    },
  },
  {
    id: '12',
    title: 'Cheese Blast Deal',
    description: 'Cheese Blast Burger deal: Use CBLAST25 for ₹25 off.',
    discount: '₹25 OFF',
    code: 'CBLAST25',
    category: 'Cheesy',
    expiresAt: '2025-12-31',
    savings: '₹25 off Cheese Blast Burger',
    image: {
      src: '/Potato-Cheese-Shot.png',
      alt: 'Cheesy potato bites for cheese lovers',
    },
  },
  {
    id: '13',
    title: 'Jaw Breaker Special',
    description: 'Jaw Breaker (Double Patty) special – Code: JAW10 for ₹10 off.',
    discount: '₹10 OFF',
    code: 'JAW10',
    category: 'Double Patty',
    expiresAt: '2025-12-31',
    savings: '₹10 off Jaw Breaker',
    image: {
      src: '/Burger.png',
      alt: 'Double patty jaw breaker burger',
    },
  },
  {
    id: '14',
    title: 'Veg Add-on Cheese Bonus',
    description: 'Veg Burger add-on cheese free – Use FREECHEESE.',
    discount: 'Free Cheese',
    code: 'FREECHEESE',
    category: 'Veg Delight',
    expiresAt: '2025-12-31',
    savings: 'Complimentary cheese add-on',
    image: {
      src: '/Garlic-Bread.png',
      alt: 'Cheesy garlic bread sides',
    },
  },
  {
    id: '15',
    title: 'Premium Combo Slash',
    description: 'Any premium burger + drink combo at ₹49 off – Code: PREMIUM49.',
    discount: '₹49 OFF',
    code: 'PREMIUM49',
    category: 'Premium Combo',
    expiresAt: '2025-12-31',
    savings: '₹49 off premium combo',
    image: {
      src: '/Shakes.png',
      alt: 'Premium burger combo with thick shakes',
    },
  },
  {
    id: '16',
    title: 'Weekend 2x2 Treat',
    description: 'Weekend treat: 2 Burgers + 2 Shakes at special price – Code: WKND2X2.',
    discount: 'Bundle Deal',
    code: 'WKND2X2',
    category: 'Weekend Special',
    expiresAt: '2025-12-29',
    savings: 'Special price for 2 burgers & 2 shakes',
    image: {
      src: '/Fried-Rice.png',
      alt: 'Weekend spread of comfort food',
    },
  },
  {
    id: '17',
    title: 'Surprise Burger Bundle',
    description: 'Scan QR for surprise burger bundle – Use code: SURPRISEBUNDLE.',
    discount: 'Mystery Deal',
    code: 'SURPRISEBUNDLE',
    category: 'QR Reward',
    expiresAt: '2025-12-31',
    savings: 'Hidden bundle savings',
    image: {
      src: '/Fried-Momos.png',
      alt: 'Surprise bundle of street food favorites',
    },
  },
]

export default function OffersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [pendingCode, setPendingCode] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [hasUnlockedAll, setHasUnlockedAll] = useState(false)

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

  const openFormForCode = (code: string) => {
    setPendingCode(code)
    setIsFormOpen(true)
  }

  const completeCopy = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!pendingCode) return

    await completeCopy(pendingCode)
    setHasUnlockedAll(true)
    setIsFormOpen(false)
    setPendingCode(null)
    setFormData({ name: '', phone: '', email: '' })
  }

  const handleDialogOpenChange = (open: boolean) => {
    setIsFormOpen(open)
    if (!open) {
      setPendingCode(null)
      setFormData({ name: '', phone: '', email: '' })
    }
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
          <div className="space-y-3.5 sm:space-y-4">
            {filteredOffers.map(offer => {
              const displayCode = hasUnlockedAll ? offer.code : 'Unlock to view'
              const handleCopyClick = () => {
                if (hasUnlockedAll) {
                  void completeCopy(offer.code)
                  return
                }
                openFormForCode(offer.code)
              }

              return (
                <div
                  key={offer.id}
                  className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                >
                {/* Offer Image (desktop only) */}
                <div className="hidden sm:block">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/60 to-primary/30">
                    <Image
                      src={offer.image.src}
                      alt={offer.image.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Mobile hero image */}
                  <div className="relative h-36 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/60 to-primary/30 sm:hidden">
                    <Image
                      src={offer.image.src}
                      alt={offer.image.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Discount Badge */}
                  <div className="flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 text-primary-foreground shadow-[inset_0_-4px_0_rgba(0,0,0,0.08)] sm:w-auto sm:flex-col sm:px-6 sm:py-4">
                    <div className="text-lg font-bold tracking-tight sm:text-2xl">{offer.discount}</div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
                    <h3 className="text-base font-semibold text-foreground sm:text-lg">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground sm:text-sm">{offer.description}</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3">
                      <Badge variant="secondary" className="rounded-full bg-muted px-3 py-1 text-[11px] text-foreground">
                        {offer.category}
                      </Badge>
                      <span className="text-[12px] text-muted-foreground">
                        Expires: {new Date(offer.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Copy Button Section */}
                <div className="flex flex-col gap-1.5 text-center sm:w-40 sm:text-right">
                  <div className="text-xs font-semibold tracking-wide text-foreground sm:text-sm">
                    <p className="font-mono text-sm sm:text-sm">{displayCode}</p>
                    <p className="text-[11px] text-accent sm:text-xs">{offer.savings}</p>
                  </div>
                  <Button
                    onClick={handleCopyClick}
                    size="sm"
                    variant={copiedCode === offer.code ? 'secondary' : 'default'}
                    className={`mx-auto whitespace-nowrap rounded-full border border-transparent px-6 py-2 text-xs shadow-sm sm:mx-0 sm:px-5 sm:py-2 ${
                      copiedCode === offer.code
                        ? 'bg-muted text-foreground'
                        : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
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
                        {hasUnlockedAll ? 'Copy' : 'Unlock'}
                      </>
                    )}
                  </Button>
                </div>
                </div>
              )
            })}
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
      <Dialog open={isFormOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unlock your code</DialogTitle>
            <DialogDescription>
              Share your details to copy <span className="font-semibold">{pendingCode}</span>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={event => setFormData(prev => ({ ...prev, name: event.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={event => setFormData(prev => ({ ...prev, phone: event.target.value }))}
                placeholder="Enter your phone number"
                type="tel"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
                type="email"
                value={formData.email}
                onChange={event => setFormData(prev => ({ ...prev, email: event.target.value }))}
                placeholder="Enter your email address"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => handleDialogOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Copy code
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
