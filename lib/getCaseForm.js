export async function getCaseForm(word, caseValue) {
    const url = new URL('https://ws3.morpher.ru/russian/declension');
    url.searchParams.append('s', word);

    const headers = new Headers();
    headers.append('Accept', 'application/json');

    const config = {
        method: 'GET',
        headers: headers,
    }
    try {
        const response = await fetch(url, config)
        const result = await response.json();

        return result[caseValue];
    }
    catch(error) {
        console.log('ERROR', error)

        return word;
    }
}

getCaseForm('жизнь');