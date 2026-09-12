import { test, expect, type Page } from '@playwright/test'

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/cars',
  '/contact',
  '/services',
]

const ADMIN_ROUTES = [
  '/admin',
  '/admin/cars',
]

function isDesktop(page: Page) {
  return page.viewportSize()!.width >= 1000
}

async function collectPageErrors(page: Page) {
  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  const failedRequests: string[] = []

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    }
  })

  page.on('pageerror', (error) => {
    pageErrors.push(error.message)
  })

  page.on('response', (response) => {
    const url = response.url()

    if (
      url.startsWith('http://localhost:3000') &&
      response.status() >= 400
    ) {
      failedRequests.push(`${response.status()} ${url}`)
    }
  })

  return {
    consoleErrors,
    pageErrors,
    failedRequests,
  }
}

/*
|--------------------------------------------------------------------------
| ROUTE TESTS
|--------------------------------------------------------------------------
*/

test.describe('Luxe Motors — Route Health', () => {
  for (const route of PUBLIC_ROUTES) {
    test(`public route works: ${route}`, async ({ page }) => {
      const errors = await collectPageErrors(page)

      const response = await page.goto(route, {
        waitUntil: 'networkidle',
      })

      expect(response, `No response for ${route}`).not.toBeNull()

      expect(
        response!.status(),
        `${route} returned ${response!.status()}`
      ).toBeLessThan(400)

      await expect(page.locator('body')).toBeVisible()

      expect(errors.consoleErrors).toEqual([])
      expect(errors.pageErrors).toEqual([])
      expect(errors.failedRequests).toEqual([])
    })
  }
})

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
|
| Admin pages may eventually require authentication.
| We therefore verify they don't crash with a 5xx error.
|--------------------------------------------------------------------------
*/

test.describe('Luxe Motors — Admin Health', () => {
  for (const route of ADMIN_ROUTES) {
    test(`admin route does not crash: ${route}`, async ({ page }) => {
      const response = await page.goto(route, {
        waitUntil: 'domcontentloaded',
      })

      expect(response).not.toBeNull()

      expect(
        response!.status(),
        `${route} returned server error ${response!.status()}`
      ).toBeLessThan(500)

      await expect(page.locator('body')).toBeVisible()
    })
  }
})

/*
|--------------------------------------------------------------------------
| HOMEPAGE
|--------------------------------------------------------------------------
*/

test.describe('Luxe Motors — Homepage', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'networkidle',
    })

    await expect(page.locator('body')).toBeVisible()

    expect(await page.title()).toBeTruthy()
  })

  test('homepage has no horizontal overflow', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'networkidle',
    })

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2
    })

    expect(hasOverflow).toBe(false)
  })

  test('homepage contains navigation', async ({ page }) => {
    await page.goto('/')

    const links = page.locator('a[href]')

    await expect(links.first()).toBeVisible()

    expect(await links.count()).toBeGreaterThan(0)
  })

  test('homepage images load', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'networkidle',
    })

    const brokenImages = await page.locator('img').evaluateAll((images) =>
      images
        .filter((img) => {
          const image = img as HTMLImageElement
          return image.complete && image.naturalWidth === 0
        })
        .map((img) => ({
          src: (img as HTMLImageElement).src,
          alt: img.getAttribute('alt'),
        }))
    )

    expect(
      brokenImages,
      `Broken images: ${JSON.stringify(brokenImages, null, 2)}`
    ).toEqual([])
  })
})

/*
|--------------------------------------------------------------------------
| INTERNAL LINK CRAWLER
|--------------------------------------------------------------------------
|
| Starts from the homepage and automatically discovers internal pages.
|--------------------------------------------------------------------------
*/

test.describe('Luxe Motors — Internal Link Audit', () => {
  test('all discovered internal links work', async ({ page, request }) => {
    const visited = new Set<string>()
    const queue = ['/']

    const MAX_PAGES = 100

    const failures: string[] = []

    while (queue.length > 0 && visited.size < MAX_PAGES) {
      const currentRoute = queue.shift()!

      if (visited.has(currentRoute)) {
        continue
      }

      visited.add(currentRoute)

      const response = await request.get(currentRoute)

      if (response.status() >= 400) {
        failures.push(
          `${currentRoute} -> HTTP ${response.status()}`
        )
        continue
      }

      await page.goto(currentRoute, {
        waitUntil: 'domcontentloaded',
      })

      const links = await page.locator('a[href]').evaluateAll(
        (anchors) =>
          anchors
            .map((a) => (a as HTMLAnchorElement).href)
            .filter((href) => href.startsWith(window.location.origin))
            .map((href) => {
              const url = new URL(href)
              return url.pathname + url.search
            })
      )

      for (const link of links) {
        const cleanPath = link.split('#')[0]

        if (
          !cleanPath.startsWith('/api/') &&
          !cleanPath.startsWith('/_next/') &&
          !visited.has(cleanPath) &&
          !queue.includes(cleanPath)
        ) {
          queue.push(cleanPath)
        }
      }
    }

    expect(
      failures,
      `Broken internal routes:\n${failures.join('\n')}`
    ).toEqual([])
  })
})

/*
|--------------------------------------------------------------------------
| CARS / INVENTORY
|--------------------------------------------------------------------------
*/

test.describe('Luxe Motors — Inventory', () => {
  test('cars page loads', async ({ page }) => {
    await page.goto('/cars', {
      waitUntil: 'networkidle',
    })

    await expect(page.locator('body')).toBeVisible()

    expect(await page.locator('a[href*="/cars/"]').count())
      .toBeGreaterThan(0)
  })

  test('car detail link opens correctly', async ({ page }) => {
    await page.goto('/cars', {
      waitUntil: 'networkidle',
    })

    const carLink = page.locator('a[href*="/cars/"]').first()

    await expect(carLink).toBeVisible()

    const href = await carLink.getAttribute('href')

    expect(href).toBeTruthy()

    await page.goto(href!, {
      waitUntil: 'networkidle',
    })

    expect(page.url()).toContain('/cars/')

    await expect(page.locator('body')).toBeVisible()
  })

  test('car detail page contains an enquiry area', async ({ page }) => {
    await page.goto('/cars', {
      waitUntil: 'networkidle',
    })

    const carLink = page.locator('a[href*="/cars/"]').first()

    const href = await carLink.getAttribute('href')

    expect(href).toBeTruthy()

    await page.goto(href!, {
      waitUntil: 'networkidle',
    })

    const form = page.locator('form')

    await expect(form.first()).toBeVisible()
  })

  test('inventory search works', async ({ page }) => {
    await page.goto('/cars', {
      waitUntil: 'networkidle',
    })

    const search = page.locator(
      'input[placeholder*="Search make, model"]'
    )

    await expect(search).toBeVisible()

    await search.fill('BMW')

    await page.waitForTimeout(500)

    const bodyText = await page.locator('body').innerText()

    expect(bodyText.toLowerCase()).toContain('bmw')
  })

  test('inventory brand filter works', async ({ page }) => {
    test.skip(!isDesktop(page), 'Desktop filter layout')

    await page.goto('/cars', {
      waitUntil: 'networkidle',
    })

    const bmwButton = page.getByRole('button', {
      name: 'BMW',
      exact: true,
    })

    if (await bmwButton.count() === 0) {
      test.skip(true, 'BMW filter is not available')
    }

    await bmwButton.click()

    await page.waitForTimeout(300)

    const bodyText = await page.locator('body').innerText()

    expect(bodyText.toLowerCase()).toContain('bmw')
  })

  test('inventory reset control works', async ({ page }) => {
    test.skip(!isDesktop(page), 'Desktop filter layout')

    await page.goto('/cars', {
      waitUntil: 'networkidle',
    })

    const bmwButton = page.getByRole('button', {
      name: 'BMW',
      exact: true,
    })

    if (await bmwButton.count() === 0) {
      test.skip(true, 'BMW filter is not available')
    }

    await bmwButton.click()

    const reset = page.getByRole('button', {
      name: /reset/i,
    })

    await expect(reset).toBeVisible()

    await reset.click()

    await expect(
      page.getByRole('button', {
        name: 'BMW',
        exact: true,
      })
    ).toBeVisible()
  })
})

/*
|--------------------------------------------------------------------------
| CONTACT / ENQUIRY FORM
|--------------------------------------------------------------------------
*/

test.describe('Luxe Motors — Contact & Enquiry', () => {
  test('contact page loads', async ({ page }) => {
    await page.goto('/contact', {
      waitUntil: 'networkidle',
    })

    await expect(page.locator('form')).toBeVisible()
  })

  test('required fields prevent empty submission', async ({ page }) => {
    await page.goto('/contact', {
      waitUntil: 'networkidle',
    })

    // Keep the production smooth-scroll experience intact while preventing
    // Playwright's automatic scroll-to-target from waiting on the CSS animation.
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto'
    })

    const form = page.locator('form')

    await form.locator('button[type="submit"]').click()

    const invalidFields = await form.locator(':invalid').count()

    expect(invalidFields).toBeGreaterThan(0)
  })

  test('enquiry form can submit successfully', async ({ page }) => {
    await page.route('**/api/enquiries', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          id: 'TEST-001',
        }),
      })
    })

    await page.goto('/contact', {
      waitUntil: 'networkidle',
    })

    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto'
    })

    const form = page.locator('form')

    await form.locator('input[type="text"]').first().fill(
      'Playwright Test User'
    )

    await form.locator('input[type="tel"]').fill(
      '+91 99999 99999'
    )

    const email = form.locator('input[type="email"]')

    if (await email.count()) {
      await email.fill('playwright@test.local')
    }

    await form.locator('textarea').fill(
      'Automated Luxe Motors test enquiry.'
    )

    await form.locator('button[type="submit"]').click()

    await expect(
      page.getByText(/Inquiry confirmed/i)
    ).toBeVisible()
  })
})

/*
|--------------------------------------------------------------------------
| RESPONSIVE TESTING
|--------------------------------------------------------------------------
*/

test.describe('Luxe Motors — Responsive Layout', () => {
  test('page fits viewport without horizontal overflow', async ({
    page,
  }) => {
    await page.goto('/', {
      waitUntil: 'networkidle',
    })

    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
    }))

    expect(
      dimensions.documentWidth,
      `Horizontal overflow detected: ${JSON.stringify(dimensions)}`
    ).toBeLessThanOrEqual(dimensions.viewport + 2)

    expect(
      dimensions.bodyWidth,
      `Body overflow detected: ${JSON.stringify(dimensions)}`
    ).toBeLessThanOrEqual(dimensions.viewport + 2)
  })

  test('contact page fits viewport', async ({ page }) => {
    await page.goto('/contact', {
      waitUntil: 'networkidle',
    })

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2
    })

    expect(hasOverflow).toBe(false)
  })

  test('cars page fits viewport', async ({ page }) => {
    await page.goto('/cars', {
      waitUntil: 'networkidle',
    })

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2
    })

    expect(hasOverflow).toBe(false)
  })
})

/*
|--------------------------------------------------------------------------
| 404 HANDLING
|--------------------------------------------------------------------------
*/

test.describe('Luxe Motors — Error Handling', () => {
  test('non-existent page returns proper 404', async ({
    page,
  }) => {
    const response = await page.goto(
      '/this-page-definitely-does-not-exist-123456'
    )

    expect(response).not.toBeNull()

    expect(response!.status()).toBe(404)
  })
})
