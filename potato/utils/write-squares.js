export function* writeSquares(commits) {
    for (const commit in commits) {
        yield `
            <div data-date="${commit}" data-count="${commits[commit]}"></div>
        `;
    }
}
