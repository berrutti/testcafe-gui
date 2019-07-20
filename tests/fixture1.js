import { Selector } from 'testcafe';

let searchBar = Selector('input[role="combobox"]');

fixture `Page load timeout`
    .page `http://www.google.com`;

test(`Page load timeout`, async t => {
    await t
        .typeText(searchBar,'Hola mundo')
        .pressKey('enter')
        .wait(30);
});