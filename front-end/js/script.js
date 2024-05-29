const mock_list = [
    {
        "name": "tarefa 0",
        "status": "ready"
    },
    {
        "name": "tarefa 1",
        "status": "ready"
    },
    {
        "name": "tarefa 2",
        "status": "progress"
    },
    {
        "name": "tarefa 3",
        "status": "done"
    }
]

function FillList() {
    let list = document.getElementById("list");

    mock_list.forEach((item) => {
        let div = document.createElement("div");
        div.className = "to-do-element"
        let title = document.createElement("p");
        title.innerHTML = item.name
        title.className = "to-do-title"
        let status = document.createElement("p");
        status.innerHTML = item.status
        status.className = "to-do-status"

        div.appendChild(title)
        div.appendChild(status)
        list.appendChild(div);
    });
}

FillList()

