import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/tictacjs.html')
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
    await driver.sleep(1000);
    
});

test("Game 1", async () => {
    const cell0 = await driver.findElement(By.id('cell-0'))
    const cell4 = await driver.findElement(By.id('cell-4'))
    const cell8 = await driver.findElement(By.id('cell-8'))

    await cell0.click()
    await driver.sleep(1000);
    
    await cell4.click()
    await driver.sleep(1000);
    
    await cell8.click()
    await driver.sleep(1000);

    expect(await driver.findElement(By.xpath('//h1')).getText()).toContain("X lost")
    await driver.sleep(1000);
});

test("Placing X over O Bug", async () => {

    await driver.get('http://127.0.0.1:5500/tictacjs.html')
    await driver.sleep(1000);

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
    await driver.sleep(1000);

    await driver.findElement(By.id('cell-0')).click()
    await driver.sleep(1000);
    expect(await driver.findElement(By.id('cell-0')).getText()).toContain("X")
    expect(await driver.findElement(By.id('cell-1')).getText()).toContain("O")

    await driver.findElement(By.id('cell-1')).click()
    await driver.sleep(1000);
    expect(await driver.findElement(By.id('cell-1')).getText()).toContain("X")
    expect(await driver.findElement(By.id('cell-2')).getText()).toContain("O")

    await driver.findElement(By.id('cell-2')).click()
    await driver.sleep(1000);
    expect(await driver.findElement(By.id('cell-2')).getText()).toContain("X")

    expect(await driver.findElement(By.xpath('//h1')).getText()).toContain("X lost")
    await driver.sleep(1000);
});