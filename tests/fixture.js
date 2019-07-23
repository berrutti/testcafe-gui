import { Selector } from 'testcafe';

let searchBar = Selector('input[role="combobox"]');

fixture `Fixture 1`
    .page `http://www.google.com`;

test(`Google Hello World`, async t => {
    await t
        .typeText(searchBar,'Hello World')
        .pressKey('enter')
        .wait(30);
});