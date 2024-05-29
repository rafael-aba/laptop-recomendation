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
        let title = document.createElement("p");
        title.innerHTML = item.name
        let status = document.createElement("p");
        status.innerHTML = item.status

        if (item.status === "ready") {
            div.className = "to-do-element to-do-element-ready"
            title.className = "to-do-title"
            status.className = "to-do-status to-do-status-ready"
        }
        else if (item.status === "progress") {
            div.className = "to-do-element to-do-element-progress"
            title.className = "to-do-title"
            status.className = "to-do-status to-do-status-progress"
        }
        else if (item.status === "done") {
            div.className = "to-do-element to-do-element-done"
            title.className = "to-do-title"
            status.className = "to-do-status to-do-status-done"
        }

        div.appendChild(title)
        div.appendChild(status)
        list.appendChild(div);
    });
}

FillList()

