import { html, fixture, expect } from '@open-wc/testing';
import "../count-app.js";

describe("CountApp test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <count-app
        title="title"
      ></count-app>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
