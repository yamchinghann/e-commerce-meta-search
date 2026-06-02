import { Search, ShoppingBag, Store, ExternalLink } from 'lucide-react'

import { useMemo, useState } from 'react'

const platforms = [
  {
    id: 'shopee',
    name: 'Shopee',
    accent: 'bg-orange-500',
    url: (query) => `https://shopee.com.my/search?keyword=${query}`,
  },
  {
    id: 'lazada',
    name: 'Lazada',
    accent: 'bg-blue-600',
    url: (query) => `https://www.lazada.com.my/catalog/?q=${query}`,
  },
  {
    id: 'taobao',
    name: 'Taobao',
    accent: 'bg-red-500',
    url: (query) => `https://s.taobao.com/search?q=${query}`,
  },
]

function App() {
  const [query, setQuery] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState(() =>
    platforms.map((platform) => platform.id),
  )

  const isAllSelected = selectedPlatforms.length === platforms.length
  const trimmedQuery = query.trim()
  const canSearch = trimmedQuery.length > 0 && selectedPlatforms.length > 0

  const selectedNames = useMemo(
    () =>
      platforms
        .filter((platform) => selectedPlatforms.includes(platform.id))
        .map((platform) => platform.name)
        .join(' + '),
    [selectedPlatforms],
  )

  const toggleAll = () => {
    setSelectedPlatforms(isAllSelected ? [] : platforms.map((platform) => platform.id))
  }

  const togglePlatform = (platformId) => {
    setSelectedPlatforms((current) =>
      current.includes(platformId)
        ? current.filter((id) => id !== platformId)
        : [...current, platformId],
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!canSearch) return

    const encodedQuery = encodeURIComponent(trimmedQuery)

    platforms
      .filter((platform) => selectedPlatforms.includes(platform.id))
      .forEach((platform) => {
        window.open(platform.url(encodedQuery), '_blank')
      })
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
          <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="flex flex-col justify-between gap-8 border-b border-slate-200 bg-slate-950 p-6 text-white sm:p-8 lg:border-b-0 lg:border-r">
              <div>
                <div className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-md bg-emerald-400 text-slate-950">
                  <ShoppingBag aria-hidden="true" size={24} />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Malaysia Meta-Search
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                  Compare marketplace results in one search.
                </h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                  Search Shopee and Lazada Malaysia together, then continue comparing products in their own marketplace tabs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="rounded-md border border-white/10 bg-white/5 p-4"
                  >
                    <span className={`mb-3 block h-2 w-10 rounded-full ${platform.accent}`} />
                    <span className="font-semibold">{platform.name}</span>
                    <p className="mt-1 text-xs text-slate-400">Malaysia catalog</p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="search" className="block text-sm font-semibold text-slate-700">
                    Item keyword
                  </label>
                  <div className="relative mt-3">
                    <Search
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={22}
                    />
                    <input
                      id="search"
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="portable aircond"
                      className="h-14 w-full rounded-md border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold text-slate-700">
                    Marketplaces
                  </legend>
                  <div className="mt-3 space-y-3">
                    <label className="flex cursor-pointer items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-emerald-300 hover:bg-emerald-50">
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={toggleAll}
                          className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="font-semibold text-slate-900">Select All</span>
                      </span>
                      <span className="text-sm text-slate-500">{platforms.length} platforms</span>
                    </label>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {platforms.map((platform) => {
                        const isSelected = selectedPlatforms.includes(platform.id)

                        return (
                          <label
                            key={platform.id}
                            className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-4 transition ${
                              isSelected
                                ? 'border-emerald-300 bg-emerald-50'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => togglePlatform(platform.id)}
                              className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className={`h-9 w-9 rounded-md ${platform.accent}`} />
                            <span>
                              <span className="block font-semibold text-slate-950">
                                {platform.name}
                              </span>
                              <span className="text-sm text-slate-500">Open search tab</span>
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={!canSearch}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 text-base font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                >
                  <Store aria-hidden="true" size={20} />
                  Search {selectedNames || 'marketplaces'}
                  <ExternalLink aria-hidden="true" size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
