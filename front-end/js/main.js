let listaItens = [];
let itemAEditar;
let backendAlive = false;

let form = document.getElementById("form-itens");
const itensInput = document.querySelector("#receber-item");
const ulItens = document.querySelector("#lista-de-itens");
const ulItensComprados = document.querySelector("#itens-comprados");
const listaRecuperada = localStorage.getItem('listaItens');

let itensChecados = [];
let itensNaoChecados = [];

function atualiazaLocalStorage() {
  localStorage.setItem("listaItens", JSON.stringify(listaItens));
}

function start() {
  checkBackendAlive().then(() => {
    if (backendAlive) {
      backEndUpdateLists();
    }
    else {
      if (listaRecuperada) {
        listaItens = JSON.parse(listaRecuperada);
        atualizarListas();
        mostrarItem();
      } else {
        listaItens = [];
      }
    }
  });
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    salvarItem();
    atualizarListas();
    mostrarItem();
    itensInput.focus();
  });
}

function salvarItem() {
  const comprasItem = itensInput.value;
  if (backendAlive) {
    backEndCreateEntry(comprasItem);
  }
  else {
    const checarDuplicado = listaItens.some(
      (elemento) => elemento.item.toUpperCase() === comprasItem.toUpperCase()
    );
  
    if (checarDuplicado) {
      alert("Você já adicionou esse item");
    } else {
      listaItens.push({
        item: comprasItem,
        checar: false,
      });
    }
  }
}

function mostrarItem() {
  ulItens.innerHTML = "";
  ulItensComprados.innerHTML = "";
  
  listaItens.forEach((elemento, index) => {
    realIndex = backendAlive ? elemento.id : index;
    if (elemento.checar) {
      ulItensComprados.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${realIndex}">
          <div>
            <input type="checkbox" checked class="is-clickable" />
            <span class="itens-comprados is-size-5">${elemento.item}</span>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
        `;
      } else {
        ulItens.innerHTML += `
          <li class="item-compra is-flex is-justify-content-space-between" data-value="${realIndex}">
          <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${
              elemento.item
            }" ${
        realIndex !== Number(itemAEditar) ? "disabled" : ""
      }></input>
      </div>
      <div>
      ${
        realIndex === Number(itemAEditar)
          ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>'
          : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'
        }
        <i class="fa-solid fa-trash is-clickable deletar"></i>
      </div>
    </li>
    `;
    }
    itensInput.value = "";
    atualiazaLocalStorage();
  });


  const inputCheck = document.querySelectorAll('input[type="checkbox"]');

  inputCheck.forEach((i) => {
    i.addEventListener("click", (event) => {
      valorDoElemento = event.target.parentElement.parentElement.getAttribute("data-value");
      if (backendAlive) {
        backEndToggle(valorDoElemento);
      } else {
        listaItens[valorDoElemento].checar = event.target.checked;
      }
      atualizarListas();
      mostrarItem();
    });
  });

  const deletarObjetos = document.querySelectorAll(".deletar");
  deletarObjetos.forEach((i) => {
    i.addEventListener("click", (event) => {
      valorDoElemento = event.target.parentElement.parentElement.getAttribute("data-value");

      if (backendAlive) {
        backEndDelete(valorDoElemento);
      } else {
        listaItens.splice(valorDoElemento, 1);
      }
      atualizarListas();
      mostrarItem();
    });
  });

  const editarItens = document.querySelectorAll(".editar");
  editarItens.forEach((i) => {
    i.addEventListener("click", (event) => {
      itemAEditar =
        event.target.parentElement.parentElement.getAttribute("data-value");
      atualizarListas();
      mostrarItem();
    });
  });
}

function salvarEdicao() {
  const itemEditado = document.querySelector(
    `[data-value="${itemAEditar}"] input[type="text"]`
  );

  if (backendAlive) {
    backEndEdit(itemAEditar, itemEditado.value);
  }
  else {
      listaItens[itemAEditar].item = itemEditado.value;
  }
  itemAEditar = -1;
  atualizarListas();
  mostrarItem();
}

function atualizarListas() {
  if (backendAlive) {
    backEndUpdateLists();
  }
}

function checkBackendAlive() {
  return fetch("http://localhost:8080/health")
    .then((response) => {
      if (response.ok) {
        console.log("Backend está funcionando");
        backendAlive = true;
      } else {
        console.log("Backend não está funcionando");
      }
    })
    .catch((error) => {
      console.log("Backend não está funcionando");
    });
}

function backEndCreateEntry(comprasItem) {
  return fetch("http://localhost:8080/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "text": comprasItem
    }),
  }).then(() => {
      atualizarListas();
      mostrarItem();
  })
  .catch((error) => {
    console.log("Backend não está funcionando");
  });
}

function backEndDelete(id) {
  return fetch(`http://localhost:8080/${id}/delete`, {
    method: "PUT",
  }).then(() => {
    atualizarListas();
    mostrarItem();
  })
  .catch((error) => {
    console.log("Backend não está funcionando");
  });
}

function backEndToggle(id) {
  return fetch(`http://localhost:8080/${id}/toggle`, {
    method: "PUT",
  }).then(() => {
    atualizarListas();
    mostrarItem();
  })
  .catch((error) => {
    console.log("Backend não está funcionando");
  });
}

function backEndEdit(id, text) {
  return fetch(`http://localhost:8080/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "text": text
    }),
  }).then(() => {
    atualizarListas();
    mostrarItem();
  })
  .catch((error) => {
    console.log("Backend não está funcionando");
  });
}

function backEndUpdateLists() {
  return fetch("http://localhost:8080/list")
  .then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        listaItens = data.map((d) => {
          return {
            item: d.text, 
            checar: d.completed, 
            id: d.id
          }
        });
      mostrarItem();
    })}
  });
}

start();
