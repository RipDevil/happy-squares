const hover = document.querySelector('.hover');
let timeout;
document.querySelectorAll('.squares > *').forEach((s) => {
    if (s.dataset?.count > 0) {
        s.style.backgroundColor = `hsl([[COLOR]], 100%, ${100 - s.dataset.count * 5
            }%)`;
    }

    s.addEventListener('click', (e) => {
        console.log('Day: ', e.target.dataset?.date, ' Commits: ', e.target.dataset?.count);
    });

    s.addEventListener('mouseover', (e) => {
        if (timeout) {
            timeout = clearTimeout(timeout);
        }

        if (e.target.dataset?.count !== '0') {
            hover.style.display = 'block';
            hover.innerHTML = 'on ' + e.target.dataset?.date + ' you made ' + e.target.dataset?.count + ' commits!';
        }
    });

    s.addEventListener('mouseleave', (e) => {
        timeout = setTimeout(() => {
            hover.style.display = 'none';
        }, 1000);
    })
});
