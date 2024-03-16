import { PlaywrightCrawler } from "crawlee";

const timeOfLoadWaiting = 5000; // 5 seconds

async function exrtactFilmInformation(film) {
  const img = await film.locator(".afisha-event-img-container img").first();
  const link = await film.locator("a").first();
  const name = await img.getAttribute("alt");

  return {
    imageUrl: await img.getAttribute("src"),
    name,
    url: `https://zaotdih.ru${await link.getAttribute("href")}`,
  };
}

export async function crawlCurrentFilms() {
  const result = {};

  const crawler = new PlaywrightCrawler({
    async requestHandler({ page }) {
      async function loadMore() {
        const loadMoreButton = await page.locator("#next_button").first();

        if (!await loadMoreButton.isVisible()) { return; }

        await loadMoreButton.click();

        // it's too hard to track finishing of load-more button loading,
        // so just waiting
        await page.waitForTimeout(timeOfLoadWaiting);
        await loadMore();
      }

      await loadMore();

      const filmLocators = await page.locator("#afisha_container > .row > .col-12").all()

      const films = await Promise.all(filmLocators.map((filmLocator) => exrtactFilmInformation(filmLocator)))

      films.forEach((film) => { result[film.name] = film })
    },
  });

  await crawler.run(["https://zaotdih.ru/voronezh/afisha/kino/"]);

  return result;
}
