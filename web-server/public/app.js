document.addEventListener('click', event => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
    if (event.target.dataset.type === "edit") {
        const newTitle = prompt("Введите новое название", event.target.dataset.title)

        if(newTitle) {
            const id = event.target.dataset.id
            update(id, newTitle).then(() => window.location.reload())
        }
    }
})

async function remove(id){
    await fetch(`/${id}`, {method: 'DELETE' })
}

async function update(id, newTitle){
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({title: newTitle})
    })
}